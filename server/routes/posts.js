import express from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/middleware.js';
import upload from '../middleware/upload.js'

const postRouter = express.Router();

postRouter.post('/createpost', authMiddleware, upload.single('image'), async (req,res) => {
    try {
        const {title, content} = req.body; 
        const userId = req.user.id;
        const imageKey = req.file?.key || null;

        await db.execute(
            "INSERT INTO posts (user_id ,title, content, image_url) VALUES (?, ? ,? ,?)",
        [userId ,title, content, imageKey])
        

    } catch(err){
        res.status(500).json({ message: 'Server Error' })
    }
})

postRouter.get('/getposts', async (req, res) => {
    try{
    const [rows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC')
    res.json(rows);
    } catch(err){
    res.status(500).json({ message: 'Server Error'});
    }
})

export default postRouter