<script lang="ts">
    import { ValidState } from "$lib/components/ItemSchema.svelte";
    import { slide } from "svelte/transition";

    let { validState, errorMessage } = $props();
</script>

{#if validState != ValidState.Valid}
    <div transition:slide class="overflow-hidden">
        <p class="text-destructive font-medium text-xs leading-tight mt-1.25">
            {validState == ValidState.Required ? "This is a required field!" : errorMessage}
        </p>
    </div>
{/if}
