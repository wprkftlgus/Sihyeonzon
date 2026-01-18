import cors from 'cors'
import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import loginRouter from './routes/login.js'
import RegisterRouter from './routes/register.js'
import db from "./db.js"
import cookieParser from 'cookie-parser';

dotenv.config() 

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api' ,loginRouter);
app.use('/api' ,RegisterRouter);

async function main(){
app.get('/', async (req,res) => {
    const [rows] = await db.execute('SELECT NOW() AS now')
    res.send(rows)
})

app.listen(process.env.PORT, '0.0.0.0',() => {
    console.log(`Express running on the ${process.env.PORT}`);
})
}


main()