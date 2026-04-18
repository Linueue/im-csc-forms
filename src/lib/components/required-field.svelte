<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { ValidState } from "$lib/components/ItemSchema.svelte";
    import { slide } from "svelte/transition";

    let { validState, errorMessage } = $props();
</script>

<div class="container">
{#if validState == ValidState.Required}
    <div transition:slide>
            <Label class="pt-1 pb-1 text-red-500 text-xs/3">This is a required field!</Label>
    </div>
{:else if validState == ValidState.Invalid}
    <div transition:slide>
        <Label class="pt-1 pb-1 text-red-500 text-xs/3">{errorMessage}</Label>
    </div>
{/if}
</div>

<style>
    .container
    {
        min-height: 0.25em;
    }
</style>
