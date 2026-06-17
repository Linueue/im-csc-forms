import { type RequestHandler, json } from "@sveltejs/kit";
import { type RowDataPacket } from "mysql2/promise"

export const GET: RequestHandler = async ({ url, locals }) => {
    const applicantNo = url.searchParams.get("filter");

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
