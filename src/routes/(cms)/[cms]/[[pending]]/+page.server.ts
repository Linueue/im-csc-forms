import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"
import { type Actions, fail } from "@sveltejs/kit";
import { addPostDetails } from "$lib/server/db"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [applicants, fields] = await locals.db.query<RowDataPacket[]>(`
        SELECT A.ApplicantNo, ApplicantName, Age, Sex, Citizenship
        FROM Applicant A
        LEFT JOIN Payment P ON A.ApplicantNo = P.ApplicantNo
        WHERE P.ApplicantNo IS NULL;
    `);

    return { applicants: applicants, fields: fields.map(f => f.name) };
}

export const actions: Actions = {
    submit: async ({ locals, request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const details = await addPostDetails(locals.db, payload)
            .catch((e) => { console.error(e); return null });

        if(details === null)
            return fail(500, "Couldn't add the post details.");

        console.log("Post details added.");

        return { ok: true };
    },
};
