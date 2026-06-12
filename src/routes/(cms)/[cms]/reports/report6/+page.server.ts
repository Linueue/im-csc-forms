import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT CSCRegionalOffice, COUNT(*) AS Total_Applicants
        FROM Applicant
        GROUP BY CSCRegionalOffice
        HAVING Total_Applicants > 2;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
