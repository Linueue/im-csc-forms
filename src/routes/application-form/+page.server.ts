import { type Actions } from "@sveltejs/kit";
import { addApplicant } from "$lib/server/db";
import { upload } from "$lib/server/storage";

export const actions: Actions = {
    submit: async ({ request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const applicantPhoto = data.get("applicantPhoto") as File;

        if(payload.existingExaminations)
        {
            for(const examination of payload.existingExaminations)
            {
                console.log(examination);
            }
        }

        console.log(payload);

        const applicantPhotoURL = await upload(applicantPhoto, "applicant-photo");
        payload["applicantPhoto"] = applicantPhotoURL;
        // await addApplicant(payload);

        console.log(applicantPhotoURL);
        console.log("Uploaded!");

        return { ok: true };
    },
};
