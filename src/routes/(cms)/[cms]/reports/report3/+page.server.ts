import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT *
        FROM Applicant
        WHERE Birthplace LIKE '%Pasig%' AND CivilStatus = 'S';
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
