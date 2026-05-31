<script lang="ts">
    import { Separator } from "$lib/components/ui/separator/index.js"
    let { name, grid_full = false } = $props();
</script>

<div class={`flex flex-row items-center gap-2 ${grid_full ? "col-span-full" : ""}`}>
    <Separator class="flex-1 h-px bg-border" />
        <p class="text-sm text-muted-foreground font-medium">{name}</p>
    <Separator class="flex-1 h-px bg-border" />
</div>
