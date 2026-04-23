<script lang="ts">
    import * as Pagination from "$lib/components/ui/pagination/index.js"

    type ChildRender = (args: { currentPage: number }) => any;
    let { totalPages, childRender } = $props<{totalPages: number, childRender?: ChildRender}>();
</script>

<Pagination.Root count={totalPages * 2} perPage={totalPages}>
    {#snippet child({pages, currentPage})}
        {#if childRender}
            {@render childRender({ currentPage: currentPage })}
        {/if}

        <Pagination.Content>
            <Pagination.Item>
                <Pagination.PrevButton />
            </Pagination.Item>
            <Pagination.Item>
                <Pagination.NextButton />
            </Pagination.Item>
        </Pagination.Content>
    {/snippet}
</Pagination.Root>
