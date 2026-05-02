<script lang="ts">
    import * as Pagination from "$lib/components/ui/pagination/index.js"

    type ChildRender = (args: { currentPage: number }) => any;
    type SubmitRender = (args: { }) => any;
    let { totalPages, childRender, submitRender } = $props<{totalPages: number, childRender?: ChildRender, submitRender?: SubmitRender}>();
</script>

<Pagination.Root count={totalPages} perPage={1}>
    {#snippet child({pages, currentPage})}
        {#if childRender}
            {@render childRender({ currentPage: currentPage })}
        {/if}

        <Pagination.Content class="pt-1">
            {#if currentPage != 1}
                <Pagination.Item>
                    <Pagination.PrevButton />
                </Pagination.Item>
            {/if}
            {#if currentPage != totalPages}
                <Pagination.Item>
                    <Pagination.NextButton />
                </Pagination.Item>
            {:else}
                <Pagination.Item>
                    {@render submitRender()}
                </Pagination.Item>
            {/if}
        </Pagination.Content>
    {/snippet}
</Pagination.Root>
