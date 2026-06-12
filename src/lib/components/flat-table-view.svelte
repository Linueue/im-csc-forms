<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"

    let { headerRows, bodyRows, name, desc = null } = $props();
</script>

<div>
    <div class="text-xl font-medium font-serif">
        {name}
    </div>

    {#if desc}
        <div class="text-sm font-medium text-muted-foreground">
            {desc}
        </div>
    {/if}

    <Table.Root>
        <Table.Header>
            <Table.Row>
                {@render headerRows()}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {@render bodyRows()}
        </Table.Body>
    </Table.Root>
</div>
