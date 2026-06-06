import { type Handle } from "@sveltejs/kit"
import { getConnection, getStorage } from "$lib/server"

export const handle: Handle = async ({ event, resolve }) => {
    if(event.platform?.env)
        event.locals.db = await getConnection(event.platform?.env?.HYPERDRIVE.connectionString);
    if(event.platform?.env)
        event.locals.storage = await getStorage(event.platform?.env!);

    return await resolve(event);
};
