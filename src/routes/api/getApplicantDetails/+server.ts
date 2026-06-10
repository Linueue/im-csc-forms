import { type RowDataPacket } from "mysql2/promise";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const applicantNo = url.searchParams.get("applicantNo");
    const [applicant] = await locals.db.execute<RowDataPacket[]>(`
        SELECT *
        FROM Applicant
        WHERE ApplicantNo = ?;
    `, [
        applicantNo,
    ]);

    return json({ applicant: applicant.length == 1 ? applicant[0] : null});
}
