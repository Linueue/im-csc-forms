<script lang="ts">
    let { name, value } = $props();
</script>

<p class="font-medium min-w-[10em]">{name}</p>
<p class="font-light">{value ? value : "-"}</p>
