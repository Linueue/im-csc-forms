import { type RequestHandler, json } from "@sveltejs/kit";
import { type RowDataPacket } from "mysql2/promise"

export const POST: RequestHandler = async ({ request, locals }) => {
    const filters = await request.json()
        .catch(() => null) as
    {
        collectingOfficer: number | null,
    } | null;

    let applicants: Record<string, any>[] = [];

    let where = [];
    let params = []

    if(filters?.collectingOfficer != null)
    {
        where.push("c.CollectingOfficerID = ?");
        params.push(filters.collectingOfficer);
    }

    [applicants] = await locals.db.execute<RowDataPacket[]>(`
        SELECT a.ApplicantNo, ApplicantName, ProcessingORNumber, ProcessingAmount
        FROM Applicant a
        JOIN Payment p
            ON a.ApplicantNo = p.ApplicantNo
        JOIN CollectingOfficer c
            ON p.CollectingOfficerID = c.CollectingOfficerID
        ${where.length ? `WHERE ${where.join(" AND ")};` : ";"}
    `, params);

    return json({ applicants: applicants });
}
