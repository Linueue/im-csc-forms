import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"
import { type Actions, json } from "@sveltejs/kit";
import { addPostDetails } from "$lib/server/db"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT A.ApplicantNo, ApplicantName, Age, Sex, CSCRegionalOffice, Examinationplace, VerifiedAgainst
        FROM Applicant A
        LEFT JOIN Payment P ON A.ApplicantNo = P.ApplicantNo
        WHERE P.ApplicantNo IS NULL;
    `);
    const [collectingOfficers] = await locals.db.execute<RowDataPacket[]>(`
        SELECT *
        FROM CollectingOfficer;
    `);
    const [processors] = await locals.db.execute<RowDataPacket[]>(`
        SELECT ProcessorID, ProcessorName
        FROM Processor;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name), collectingOfficers, processors };
}

export const actions: Actions = {
    submit: async ({ locals, request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        await addPostDetails(locals.db, payload);

        console.log("Post details added.");

        return { ok: true };
    },
};
