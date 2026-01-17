import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';

const loginRouter = express.Router();

loginRouter.post("/login", async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message : "Missing Field"});
    }  
    try{
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE username = ?", 
        [username]
      );

      if(rows.length === 0){
        return res.status(401).json({ message: "Invalid credentials"})
      }
      const user = rows[0]

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(401).json({ message: "Invalid credentials"})
      }
       res.cookie("userId", user.id, {
      httpOnly: true, 
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    });
      res.json({ message: "Login successful"})
    } catch(err){
        res.status(500).json({ message : "Server Error"})
    }
})

export default loginRouter