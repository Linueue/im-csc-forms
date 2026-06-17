import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT EmploymentType, COUNT(*) as No_of_Applicants
        FROM Applicant
        GROUP BY EmploymentType
        HAVING No_of_Applicants > 2;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
