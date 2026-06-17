import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT ApplicantName, ROUND(AVG(ExistingExaminationRating), 2) AS Average_Rating
        FROM Applicant a
        JOIN ExistingExamination ee
            ON a.ApplicantNo = ee.ApplicantNo
        GROUP BY a.ApplicantNo, a.ApplicantName;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
