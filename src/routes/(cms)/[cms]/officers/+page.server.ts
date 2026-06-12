import type { PageServerLoad } from "./$types";
import type { RowDataPacket } from "mysql2/promise"
import { type Actions } from "@sveltejs/kit"
import { addCollectingOfficer } from "$lib/server/db"

export const load: PageServerLoad = async ({ locals, request }) => {
    const [collectingOfficers, coFields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT *
        FROM CollectingOfficer;
    `);
    const [processors, pFields] = await locals.db.execute<RowDataPacket[]>(`
        SELECT ProcessorID, ProcessorName
        FROM Processor;
    `);

    return { collectingOfficers, coFields: coFields.map(f => f.name), processors, pFields: pFields.map(f => f.name) };
}

export const actions: Actions = {
    submitCollectingOfficer: async ({ locals, request }) => {
        const data = await request.formData();
        const payload = JSON.parse(data.get("payload") as string);
        await addCollectingOfficer(locals.db, payload);

        console.log("Collecting Officer added.");

        return { ok: true };
    },
};
