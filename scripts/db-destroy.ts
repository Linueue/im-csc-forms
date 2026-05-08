import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

async function destroyDatabase()
{
    const DB_DATABASE = process.env.DB_DATABASE ?? "ApplicationsDB";
    await pool.execute(`DROP DATABASE ${DB_DATABASE};`);

    console.log(`Database '${DB_DATABASE}' destroyed successfully.`);

    await pool.end();
}

destroyDatabase().catch((err) => {
    console.error(err);
    pool.end();
});
