import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT CivilStatus, AVG(Age) AS Average_Age
        FROM Applicant
        GROUP BY CivilStatus
        HAVING Average_Age >= 25;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
