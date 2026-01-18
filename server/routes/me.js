import express from 'express';

const meRouter = express.Router();

meRouter.get('/me', async(req,res) => {
    try{
        const { userId } = req.cookies; 
        if(!userId) return res.json({});
        const user = await db.query('SELECT username FROM users WHERE id = ?', [userId]);
        if (!user.length) return res.json({});
        res.json({ username : user[0].username })
    } 
       catch(err){
        res.status(401).json({ message: 'Invalid Token'})
    }
})

export default meRouter