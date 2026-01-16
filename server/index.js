import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import loginRouter from './routes/login.js'
import RegisterRouter from './routes/register.js'

dotenv.config() 

const app = express();
app.use('/api' ,loginRouter);
app.use('/api' ,RegisterRouter);

async function main(){
    const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
console.log(`Database ${process.env.DB_NAME} is ready.`);
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
app.get('/', async (req,res) => {
    const [rows] = await db.execute('SELECT NOW() AS now')
    res.send(rows)
})

app.listen(process.env.PORT, () => {
    console.log(`Express running on the ${process.env.PORT}`);
})
}


main()