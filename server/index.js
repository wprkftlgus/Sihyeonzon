import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import postRouter from './routes/posts.js'
import meRouter from './routes/me.js'
import loginRouter from './routes/login.js'
import RegisterRouter from './routes/register.js'
import db from "./db.js"
import cookieParser from 'cookie-parser';

dotenv.config() 
const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'https://www.sihyeonzon.online',
    'https://api.sihyeonzon.online',
    'https://subtle-hummingbird-788d7e.netlify.app',
    'http://localhost:5173',
    'http://localhost:4173',
    'https://sihyeonzon.online', 
    'sihyeonzon.online'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(cookieParser());

app.use('/api/posts' ,postRouter);
app.use('/api' ,meRouter);
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