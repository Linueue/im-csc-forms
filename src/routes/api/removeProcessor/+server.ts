import { type RequestHandler, json } from "@sveltejs/kit";
import { type RowDataPacket } from "mysql2/promise"

type DeleteRequest = {
    ids: number[];
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
    const { ids } = await request.json() as DeleteRequest;

    if(!Array.isArray(ids) || ids.length === 0)
        return new Response("Missing params.", { status: 400 });

    await locals.db.query(`
        DELETE FROM Processor
        WHERE ProcessorID IN (?);
    `, [
        ids.map(Number),
    ]);

    return json({ ok: true});
}
