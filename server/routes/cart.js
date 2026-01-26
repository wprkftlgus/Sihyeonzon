import db from '../db.js'
import express from 'express'
import { authMiddleware } from '../middleware/middleware.js';

const cartRouter = express.Router();

cartRouter.post('/createcart', authMiddleware, async (req, res) => {
    const user_id = req.user.id
    const {post_id} = req.body
    console.log('req.body', req.body);

    if(!post_id){
        return res.status(400).json({ message: 'No post exist'});
    }
    try {
        await db.execute(
            "INSERT INTO cart (user_id, post_id, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity= quantity + 1", [user_id, post_id]
        )
        res.json({ message: 'Item is added!'});
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server Error'});
    }
})

cartRouter.get('/getcart', authMiddleware, async (req, res) => {
    const user_id = req.user.id;
    try{
        const [rows] = await db.execute(
            "SELECT c.post_id, c.quantity, p.title, p.price, p.image_url FROM cart c JOIN posts p ON c.post_id = p.id WHERE c.user_id = ?", [user_id]
        )
        res.json(rows);
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server Error'});
    }
})

export default cartRouter
