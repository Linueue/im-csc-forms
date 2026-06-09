import { createConnection, Connection } from "mysql2/promise";
import { AwsClient } from "aws4fetch";

interface ConnectionHost
{
    hostname: string,
    port: string,
    username: string,
    password: string,
    pathname: string,
}

interface StorageEnv
{
    storageRegion: string,
    storageAccessKeyId: string,
    storageAccessKeySecret: string,
    storageEndpoint: string,
}

export type ConnectionString = string | ConnectionHost;

export async function getConnection(connectionString: ConnectionString): Promise<Connection>
{
    const url = typeof connectionString == "string" ?
        new URL(connectionString) :
        connectionString;
    return await createConnection({
        host: url.hostname,
        port: parseInt(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.trim().replace("/", ""),
    });
}

interface StorageClientEndpoint
{
    client: AwsClient,
    endpoint: string,
}

export async function getStorage(env: StorageEnv): Promise<StorageClientEndpoint>
{
    const client = new AwsClient({
        service: "s3",
        region: env.storageRegion,
        accessKeyId: env.storageAccessKeyId,
        secretAccessKey: env.storageAccessKeySecret,
    });

    const storage: StorageClientEndpoint = {
        client,
        endpoint: env.storageEndpoint,
    };

    return storage;
}

export type DBClient = Connection;
export type StorageClient = StorageClientEndpoint;
