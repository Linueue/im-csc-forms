import { type StorageClient } from "$lib/server";

const BUCKET = "im-csc-forms";

export async function upload(client: StorageClient, file: File, directory: string): Promise<string>
{
    const filename = `${directory}/${crypto.randomUUID()}-${encodeURIComponent(file.name)}`
    const publicUrl = `${client.endpoint}/${BUCKET}/${filename}`;

    const signed = await client.client.sign(
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
