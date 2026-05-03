<script lang="ts">
    let { gap = "0px", children, ...restProps } = $props();
</script>

<div style={`gap: ${gap}`} {...restProps}>
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
