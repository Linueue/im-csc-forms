import { type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    submit: async ({ request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        console.log(payload);

        return { ok: true };
    },
};
