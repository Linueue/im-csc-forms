import { type RowDataPacket } from "mysql2/promise";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const applicantNo = url.searchParams.get("applicantNo");

    if(applicantNo === null || applicantNo === undefined)
        return new Response("Missing params.", { status: 400 });

    const [applicant] = await locals.db.execute<RowDataPacket[]>(`
        SELECT A.*, S.*, E.EmploymentPosition, E.EmploymentYears, E.EmploymentStatus, AG.AgencyName, AG.AgencyAddress
        FROM Applicant A
        LEFT JOIN School S ON A.SchoolID = S.SchoolID
        LEFT JOIN Employment E ON A.ApplicantNo = E.ApplicantNo
        LEFT JOIN Agency AG ON E.AgencyID = AG.AgencyID
        WHERE A.ApplicantNo = ?;
    `, [
        applicantNo,
    ]);

    const [existingExaminations] = await locals.db.execute<RowDataPacket[]>(`
        SELECT EE.*
        FROM Applicant A
        JOIN ExistingExamination EE ON A.ApplicantNo = EE.ApplicantNo
        WHERE A.ApplicantNo = ?;
    `, [
        applicantNo,
    ]);

    return json({
        applicant: applicant.length == 1 ? applicant[0] : null,
        existingExaminations,
    });
}
