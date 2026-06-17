import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT ApplicantName, ExaminationDate, EmploymentType, SchoolName
        FROM Applicant a
        JOIN School s 
            ON a.SchoolID = s.SchoolID
        WHERE YEAR(a.ExaminationDate) < 2023 AND a.EmploymentType = 'P' AND s.SchoolName LIKE '%University%';
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
