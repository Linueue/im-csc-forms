import { type Handle } from "@sveltejs/kit"
import { getConnection, getStorage, type DBClient, type StorageClient } from "$lib/server"
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    STORAGE_REGION,
    STORAGE_ACCESS_KEY_ID,
    STORAGE_ACCESS_KEY_SECRET,
    STORAGE_ENDPOINT
} from "$env/static/private"

let dbConnection: DBClient | null = null;
let storage: StorageClient | null = null;

export const handle: Handle = async ({ event, resolve }) => {
    const isCloudflare = !!event.platform?.env;

    if(isCloudflare)
    {
        const env = event.platform?.env;

        if(env)
        {
            event.locals.db = await getConnection(env.HYPERDRIVE.connectionString);
            event.locals.storage = await getStorage({
                storageRegion: env.STORAGE_REGION,
                storageAccessKeyId: env.STORAGE_ACCESS_KEY_ID,
                storageAccessKeySecret: env.STORAGE_ACCESS_KEY_SECRET,
                storageEndpoint: env.STORAGE_ENDPOINT,
            });
        };
    } else
    {
        if(!dbConnection)
            dbConnection = await getConnection({
                hostname: DB_HOST,
                port: DB_PORT,
                username: DB_USER,
                password: DB_PASSWORD,
                pathname: DB_DATABASE,
            });
        if(!storage)
            storage = await getStorage({
                storageRegion: STORAGE_REGION,
                storageAccessKeyId: STORAGE_ACCESS_KEY_ID,
                storageAccessKeySecret: STORAGE_ACCESS_KEY_SECRET,
                storageEndpoint: STORAGE_ENDPOINT,
            });

        event.locals.db = dbConnection;
        event.locals.storage = storage;
    }

    return await resolve(event);
};
