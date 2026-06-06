import { createConnection, Connection } from "mysql2/promise";
import { AwsClient } from "aws4fetch";

export async function getConnection(connectionString: string): Promise<Connection>
{
    const url = new URL(connectionString);
    return await createConnection({
        host: url.hostname,
        port: parseInt(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
    });
}

interface StorageClientEndpoint
{
    client: AwsClient,
    endpoint: string,
}

export async function getStorage(env: Env): Promise<StorageClientEndpoint>
{
    const client = new AwsClient({
        service: "s3",
        region: env.STORAGE_REGION,
        accessKeyId: env.STORAGE_ACCESS_KEY_ID,
        secretAccessKey: env.STORAGE_ACCESS_KEY_SECRET,
    });

    const storage: StorageClientEndpoint = {
        client,
        endpoint: env.STORAGE_ENDPOINT,
    };

    return storage;
}

export type DBClient = Connection;
export type StorageClient = StorageClientEndpoint;
