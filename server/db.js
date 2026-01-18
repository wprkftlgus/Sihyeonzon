import dotenv from "dotenv"
dotenv.config();
import mysql from "mysql2/promise"

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
});
await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);
try {
  const [rows] = await db.execute('SELECT 1 AS test');
  console.log('DB 연결 OK:', rows);
} catch(err) {
  console.error('DB 연결 실패:', err);
}

export default db