import { type RowDataPacket } from "mysql2/promise";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const [collectingOfficers] = await locals.db.query<RowDataPacket[]>(`
        SELECT *
        FROM CollectingOfficer;
    `);

    return json({
        collectingOfficers,
    });
}
