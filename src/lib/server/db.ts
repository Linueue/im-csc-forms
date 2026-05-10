import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "$env/static/private";

export const pool = mysql.createPool({
    host: DB_HOST,
    // ?? means if DB_PORT is undefined, then use "3306"
    port: parseInt(DB_PORT ?? "3306"),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

export async function addApplicant(forms: Record<string, string>)
{
    const name = `${forms.applicantLastName}, ${forms.applicantFirstName} ${forms.applicantMiddleName}`;
    // TODO: ApplicantPhoto is uploaded to an object storage, retrieve the URL, then put it to the database

    await pool.execute(
        `INSERT INTO APPLICANT (
            Name, Age, Sex, Birthdate, Birthplace, Citizenship, Photo
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?
        )`,
        [
            name,
            forms.applicantAge,
            forms.applicantSex,
            forms.applicantBirthdate,
            forms.applicantBirthplace,
            forms.applicantCitizenship,
            "https://google.com"
        ]
    );
}
