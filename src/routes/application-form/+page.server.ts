import { type Actions } from "@sveltejs/kit";
import { addApplicant } from "$lib/server/db";
import { upload } from "$lib/server/storage";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
    submit: async ({ request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const applicantPhoto = data.get("applicantPhoto") as File;
        const signaturePhoto = data.get("signaturePhoto") as File;

        const applicantPhotoPromise = upload(applicantPhoto, "applicant-photo");
        const signaturePhotoPromise = upload(signaturePhoto, "signature-photo");
        const urls = await Promise.all([applicantPhotoPromise, signaturePhotoPromise])
            .catch(() => null);

        if(urls === null)
            return fail(500, { message: "Failed to upload files." });

        payload["applicantPhoto"] = urls[0];
        payload["signaturePhoto"] = urls[1];
        await addApplicant(payload);

        console.log("Applicant added.");

        return { ok: true };
    },
};
