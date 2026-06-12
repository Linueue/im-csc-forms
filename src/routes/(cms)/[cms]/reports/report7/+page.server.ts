import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT ApplicantName, HighestEducLevel, TitleOfDegree, e.EmploymentPosition
        FROM Applicant a
        JOIN Employment e
            ON a.ApplicantNo = e.ApplicantNo
        WHERE HighestEducLevel = 'Postgraduate';
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
