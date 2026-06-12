import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT a.ApplicantNo, ApplicantName, ProcessingORNumber, ProcessingAmount
        FROM Applicant a
        JOIN Payment p
            ON a.ApplicantNo = p.ApplicantNo
        JOIN CollectingOfficer c
            ON p.CollectingOfficerID = c.CollectingOfficerID
        WHERE CollectingOfficerName = 'Santos, Jose M.';
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}
