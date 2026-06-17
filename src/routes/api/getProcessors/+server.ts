import { type RowDataPacket } from "mysql2/promise";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const [processors] = await locals.db.execute<RowDataPacket[]>(`
        SELECT ProcessorID, ProcessorName
        FROM Processor;
    `);

    return json({
        processors,
    });
}
