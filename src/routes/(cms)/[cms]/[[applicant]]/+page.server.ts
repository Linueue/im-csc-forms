import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"
import { type Actions, json } from "@sveltejs/kit";
import { upload } from "$lib/server/storage";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT A.ApplicantNo, ApplicantName, Age, Sex, CSCRegionalOffice, Examinationplace, VerifiedAgainst
        FROM Applicant A
        LEFT JOIN Payment P ON A.ApplicantNo = P.ApplicantNo
        WHERE P.ApplicantNo IS NULL;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}

export const actions: Actions = {
    getApplicantDetails: async ({ locals, request }) => {
        const data = await request.formData();
        const applicantNo = data.get("applicantNo");

        const [applicant] = await locals.db.execute<RowDataPacket[]>(`
            SELECT *
            FROM Applicant
            WHERE ApplicantNo = ?;
        `, [
            applicantNo,
        ]);

        return json({ applicant: applicant.length == 1 ? applicant[0].rows : null });
    },
};
