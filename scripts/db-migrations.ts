import mysql from "mysql2/promise"
import fs from "fs/promises"
import path from "path"
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    // ?? means if DB_PORT is undefined, then use "3306"
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

console.log(process.env.DB_PASSWORD);

const MIGRATIONS_DIR = "src/database/migrations/"

async function migrate()
{
    const files = await fs.readdir(MIGRATIONS_DIR);

    for(const file of files.sort())
    {
        console.log(`Running ${file}`);
        const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), "utf-8");

        await pool.execute(sql);

        console.log(`Done ${file}`);
    }

    pool.end();
}

migrate().catch((err) => {
    console.error(err);
    pool.end();
});
