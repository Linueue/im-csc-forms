import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT ApplicantName, Birthdate, CivilStatus
        FROM Applicant
        WHERE Sex = 'F' AND CivilStatus = 'M';
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
