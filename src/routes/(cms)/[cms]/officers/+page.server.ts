import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"
import { type Actions, fail } from "@sveltejs/kit"
import { addCollectingOfficer, addProcessor } from "$lib/server/db"
import { upload } from "$lib/server/storage"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [collectingOfficers, coFields] = await locals.db.query<RowDataPacket[]>(`
        SELECT *
        FROM CollectingOfficer;
    `);
    const [processors, pFields] = await locals.db.query<RowDataPacket[]>(`
        SELECT ProcessorID, ProcessorName, ProcessorPosition
        FROM Processor;
    `);

    return { collectingOfficers, coFields: coFields.map(f => f.name), processors, pFields: pFields.map(f => f.name) };
}

export const actions: Actions = {
    submitCollectingOfficer: async ({ locals, request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        await addCollectingOfficer(locals.db, payload);

        return { ok: true };
    },
    submitProcessor: async ({ locals, request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        const signature = data.get("processorSignature") as File;

        const signatureURL = await upload(locals.storage, signature, "processor-signature")
            .catch(() => null);

        if(signatureURL === null)
            return fail(500, { message: "Failed to upload files." });

        payload["processorSignatureURL"] = signatureURL;
        await addProcessor(locals.db, payload);

        return { ok: true };
    },
};
