import { type RequestHandler, json } from "@sveltejs/kit";
import { type RowDataPacket } from "mysql2/promise"

export const POST: RequestHandler = async ({ request, locals }) => {
    const filters = await request.json()
        .catch(() => null) as
    {
        action: string | null,
        sex: string | null,
    } | null;

    let applicants: Record<string, any>[] = [];

    if(filters === null)
    {
        [applicants] = await locals.db.query<RowDataPacket[]>(`
            SELECT A.ApplicantNo, P.ProcessingActionTaken AS 'Action', P.ProcessingDate, ApplicantName, Age, Sex, CSCRegionalOffice, Examinationplace, ExaminationDate, VerifiedAgainst
            FROM Applicant A
            JOIN Payment P ON A.ApplicantNo = P.ApplicantNo;
        `);
        return json({ applicants: applicants });
    }

    let where = [];
    let params = []

    if(filters.action != null)
    {
        where.push("P.ProcessingActionTaken = ?");
        params.push(filters.action);
    }
    if(filters.sex != null)
    {
        where.push("A.Sex = ?");
        params.push(filters.sex);
    }

    [applicants] = await locals.db.query<RowDataPacket[]>(`
        SELECT A.ApplicantNo, P.ProcessingActionTaken AS 'Action', P.ProcessingDate, ApplicantName, Age, Sex, CSCRegionalOffice, Examinationplace, ExaminationDate, VerifiedAgainst
        FROM Applicant A
        JOIN Payment P ON A.ApplicantNo = P.ApplicantNo
        ${where.length ? `WHERE ${where.join(" AND ")};` : ";"}
    `, params);

    return json({ applicants: applicants });
}
