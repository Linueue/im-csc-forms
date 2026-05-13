import Signature from "./signature.svelte"
import { SignatureData } from "./types.svelte"

export async function rasterize(path: string, width: number, height: number, originalWidth: number, originalHeight: number): Promise<string>
{
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${originalWidth}" height="${originalHeight}" viewBox="0 0 ${originalWidth} ${originalHeight}">
            <path d="${path}" fill="black" stroke="black" />
        </svg>
    `;

    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        ctx!.fillStyle = "white";
        ctx!.fillRect(0, 0, width, height);

        const img = new Image();
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            ctx?.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);
            const dataUrl = canvas.toDataURL("image/png");
            resolve(dataUrl);
        };

        img.onerror = reject;
        img.src = url;
    });
}

export {
    Signature,
    SignatureData
};

