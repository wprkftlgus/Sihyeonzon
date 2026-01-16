import express from 'express';

const RegisterRouter = express.Router();

RegisterRouter.get('/login', async(req,res) => {
    res.json({message : "hello"});
})

export default RegisterRouter