import { type RequestHandler, json } from "@sveltejs/kit";

type DeleteRequest = {
    ids: number[];
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
    const { ids } = await request.json() as DeleteRequest;

    if(!Array.isArray(ids) || ids.length === 0)
        return new Response("Missing params.", { status: 400 });

    try
    {
        await locals.db.query(`
            DELETE FROM CollectingOfficer
            WHERE CollectingOfficerID IN (?);
        `, [
            ids.map(Number),
        ]);
    } catch(err)
    {
        return new Response("Cannot remove a collecting officer used by some Applicants.", { status: 409 });
    }

    return json({ ok: true});
}
