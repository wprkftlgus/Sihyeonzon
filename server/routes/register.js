import express from 'express';
import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const RegisterRouter = express.Router();

RegisterRouter.post('/register', async (req,res) => {
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({ message : "Missing fields"});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        const userId = result.insertId;
        const token = jwt.sign(
            {id : userId},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message : "User registered successfully"})
    } catch(err){
        if(err.code === "ER_DUP_ENTRY"){
            res.status(400).json({ message : "Username already exists"})
        } else {
            res.status(500).json({ message : "Server error"});
        }
    }
})

export default RegisterRouter