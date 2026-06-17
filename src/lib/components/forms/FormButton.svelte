<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js"
    import LoadingIcon from "@lucide/svelte/icons/loader-circle"

    let { children, isLoading = false } = $props();
</script>

<Button type="submit" variant="default" disabled={isLoading}>
    {#if isLoading}
        <LoadingIcon class="animate-spin" />
    {/if}
    {@render children()}
</Button>
