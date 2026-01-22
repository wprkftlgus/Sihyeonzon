import express from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/middleware.js';
import upload from '../middleware/upload.js'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const postRouter = express.Router();
const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

postRouter.post('/createpost', upload.single('image'), authMiddleware, async (req,res) => {
    try {
        const {title, content, category, price} = req.body; 
        const userId = req.user.id;
        const imageKey = req.file?.key || null;
        const imageUrl = req.file?.location || null;

        if(!db){
            return res.status(401).json({ message: 'DB is missing'});
        }
        await db.execute(
            "INSERT INTO posts (user_id ,title, content, category, price, image_url, image_key) VALUES (?, ? ,? ,?, ?, ?, ?)",
        [userId ,title, content, category, price, imageUrl , imageKey])
        res.json({ message: 'Post Uploaded!'})

    } catch(err){
        console.log(err);
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

postRouter.get('/postdetail/:id', async (req, res) => {
    const { id } = req.params;
    try{
    const [rows] = await db.execute('SELECT id, title, content, image_url, price, category, created_at FROM posts WHERE id = ?', [id]);
    res.json(rows);
    } catch(err){
    res.status(500).json({ message: 'Server Error'});
    }
})

postRouter.delete('/deletepost/:id', authMiddleware, async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const [rows] = await db.execute('SELECT user_id, image_key FROM posts WHERE id = ?',[id])
    if(rows.length === 0 ){
        return res.status(404).json({ message: 'Post not found!'});
    }
    const postOwnerId = rows[0].user_id;
    if(userId !== postOwnerId ){
        return res.status(403).json({ message: 'You are not allowed to delete other person post!'});
    }
    const imagekey = rows[0].image_key;

    try{
    if(imagekey){
    await s3.send(new DeleteObjectCommand({
           Bucket: process.env.S3_BUCKET_NAME,
           Key: imagekey
    }))
    }
    await db.execute('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ message: "Post deleted successfully!"});
    } catch(err){
    res.status(500).json({ message: "Server Error"});
    }
})

export default postRouter