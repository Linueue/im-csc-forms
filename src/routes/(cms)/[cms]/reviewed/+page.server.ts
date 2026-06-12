import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT P.ProcessingActionTaken AS 'Action', ApplicantName, Age, Sex, CSCRegionalOffice, Examinationplace, ExaminationDate, VerifiedAgainst
        FROM Applicant A
        JOIN Payment P ON A.ApplicantNo = P.ApplicantNo;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
