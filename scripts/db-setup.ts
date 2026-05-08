import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

async function createDatabase()
{
    const DB_DATABASE = process.env.DB_DATABASE ?? "ApplicationsDB";
    await pool.execute(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};`);

    console.log(`Database '${DB_DATABASE}' created successfully.`);

    await pool.end();
}

createDatabase().catch((err) => {
    console.error(err);
    pool.end();
});
