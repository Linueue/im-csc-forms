import { type Actions } from "@sveltejs/kit";
import { addApplicant } from "$lib/server/db";

export const actions: Actions = {
    submit: async ({ request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const applicantPhoto = data.get("applicantPhoto") as File;

        payload["applicantPhoto"] = applicantPhoto;
        console.log(payload);
        await addApplicant(payload);
        console.log("Uploaded!");

        return { ok: true };
    },
};
