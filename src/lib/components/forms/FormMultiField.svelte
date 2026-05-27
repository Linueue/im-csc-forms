<script lang="ts">
    import Row from "$lib/components/row.svelte"

    let { name, errorMessage = "Invalid!", children } = $props();
</script>

<div class="flex flex-col items-stretch w-full space-y-1.25">
    <p class="leading-none font-medium text-sm">{name}</p>
    <Row gap="5px">
        {@render children()}
    </Row>
</div>
