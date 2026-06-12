<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"

    let { headerRows, bodyRows, name } = $props();
</script>

<div>
    <div class="text-xl font-medium font-serif">
        {name}
    </div>

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
