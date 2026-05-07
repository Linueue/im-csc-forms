import { type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    submit: async ({ request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const applicantPhoto = data.get("applicantPhoto") as File;
        console.log(payload);
        console.log(applicantPhoto.arrayBuffer, applicantPhoto.type, applicantPhoto.size);

        return { ok: true };
    },
};
