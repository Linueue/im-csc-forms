<script lang="ts">
    let { gap = "0px", children } = $props();
</script>

<div style={`gap: ${gap}`}>
    {@render children()}
</div>

<style>
    div
    {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }
</style>
