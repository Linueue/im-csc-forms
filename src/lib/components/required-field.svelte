<script lang="ts">
    import { ValidState } from "$lib/components/ItemSchema.svelte";
    import { slide } from "svelte/transition";

    let { validState, errorMessage } = $props();

    let ref = $state<HTMLDivElement | null>(null);

    function isInViewport(el: HTMLElement): boolean
    {
        const rect = el.getBoundingClientRect();

        return (rect.top >= 0 && rect.bottom <= window.innerHeight);
    }

    $effect(() => {
        if(validState != ValidState.Valid && ref && !isInViewport(ref))
        {
            ref.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    })
</script>

{#if validState != ValidState.Valid}
    <div bind:this={ref} transition:slide class="overflow-hidden">
        <p class="text-destructive font-medium text-xs leading-tight mt-1.25">
            {validState == ValidState.Required ? "This is a required field!" : errorMessage}
        </p>
    </div>
{/if}
