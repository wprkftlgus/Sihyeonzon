import express from 'express';

const loginRouter = express.Router();

loginRouter.get('/login', async(req,res) => {
    res.json({message : "hello"});
})

export default loginRouter