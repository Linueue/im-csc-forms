<script lang="ts">
    import { signature } from "svelte-signature-pad";
    import { SignatureData } from "./types.svelte";
    import { onMount } from "svelte";

    let { signatureData = $bindable<SignatureData>() } = $props();

    let width = $state(0);
    let height = $state(0);
    let preview = $state<string>();

    const ondraw = (path: string) => preview = path;
    const oncomplete = (path: string) => {
        preview = "";
        signatureData.layers = [...signatureData.layers, path];
        signatureData.width = width;
        signatureData.height = height;
    }

    const clear = () => {
        signatureData.layers = [];
    }

    onMount(() => {
        signatureData.begin();
    });
</script>

<div class="relative w-full aspect-square bg-gray-100 border border-dashed border-gray-300 rounded-md">
    <div class="absolute left-4 right-4 bottom-24 border-t border-dotted border-gray-300"></div>
        <div
            role="img"
            aria-label="signature-pad"
            class="w-full h-full touch-none"
            use:signature={{ ondraw, oncomplete }}
            bind:clientWidth={width}
            bind:clientHeight={height}
            >
            {#each signatureData.layers as layer}
                <svg class="absolute w-full h-full fill-black pointer-events-none" viewBox="0 0 {signatureData.width} {signatureData.height}">
                    <path d={layer} />
                </svg>
            {/each}

            {#if preview}
            
      <svg class="absolute w-full h-full fill-gray-900 pointer-events-none" viewBox="0 0 {width} {height}">
        <path d={preview} />
      </svg>
            {/if}
        </div>
    <button class="absolute top-2 right-2 px-4 py-2 text-sm opacity-65 text-muted-foreground bg-background border border-gray-200 rounded" onclick={clear}>Clear</button>
</div>
