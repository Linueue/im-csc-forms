import { type RequestHandler } from "@sveltejs/kit";
import { getImage } from "$lib/server/storage";

export const GET: RequestHandler = async ({ url, locals }) => {
    const imageURL = url.searchParams.get("url");

    if(!imageURL)
        return new Response("Missing URL param.", { status: 400 });

    const image = await getImage(locals.storage, imageURL);

    return new Response(image.body, {
        status: image.status,
        headers: {
            "Content-Type": image.headers.get("Content-Type") ?? "application/octet-stream"
        },
    });
}
