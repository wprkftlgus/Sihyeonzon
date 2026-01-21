import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const meRouter = express.Router();

meRouter.get('/me', async(req, res) => {
    const token = req.cookies.token; 
        if(!token) return res.json(null);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const [rows] = await db.query('SELECT username FROM users WHERE id = ?', [userId]);
        if (!rows.length) return res.json({});
        res.json({ username : rows[0].username })
    } 
       catch(err){
        res.status(401).json({ message: 'Invalid Token'})
    }
})

export default meRouter