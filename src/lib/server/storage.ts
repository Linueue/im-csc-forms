import { AwsClient } from "aws4fetch";
import { STORAGE_ENDPOINT, STORAGE_REGION, STORAGE_ACCESS_KEY_ID, STORAGE_ACCESS_KEY_SECRET } from "$env/static/private";

const client = new AwsClient({
    service: "s3",
    region: STORAGE_REGION,
    accessKeyId: STORAGE_ACCESS_KEY_ID,
    secretAccessKey: STORAGE_ACCESS_KEY_SECRET,
});

const ENDPOINT = STORAGE_ENDPOINT;
const BUCKET = "im-csc-forms";

export async function upload(file: File, directory: string): Promise<string>
{
    const filename = `${directory}/${crypto.randomUUID()}-${encodeURIComponent(file.name)}`
    const publicUrl = `${ENDPOINT}/${BUCKET}/${filename}`;

    const signed = await client.sign(
        new Request(publicUrl),
        {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
                "Content-Length": file.size.toString(),
            },
            aws: { signQuery: true },
        },
    );
    let response = await fetch(signed.url.toString(), {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
            "Content-Length": file.size.toString(),
        },
        body: file,
    });

    if(!response.ok)
    {
        console.log(await response.text());
    }

    return publicUrl;
}
