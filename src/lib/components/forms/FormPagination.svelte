<script lang="ts">
    import * as Pagination from "$lib/components/ui/pagination/index.js"

    type ChildRender = (args: { currentPage: number }) => any;
    type SubmitRender = (args: { }) => any;
    type ButtonFn = (page: number) => any;
    let { totalPages, page = $bindable(), childRender, submitRender, nextButtonFn, prevButtonFn } = $props<{
        totalPages: number,
        page: number,
        childRender?: ChildRender,
        submitRender?: SubmitRender,
        nextButtonFn: ButtonFn,
        prevButtonFn: ButtonFn,
    }>();

    function handleNextButton()
    {
        const valid = nextButtonFn(page);
        if(valid)
            return;
        page = page - 1;
    }

    function handlePrevButton()
    {
        const valid = prevButtonFn(page);
        if(valid)
            return;
        page = page + 1;
    }
</script>

<Pagination.Root count={totalPages} perPage={1} bind:page={page}>
    {#snippet child({pages: _, currentPage})}
        {#if childRender}
            {@render childRender({ currentPage: currentPage })}
        {/if}

        <Pagination.Content class="flex flex-row w-full justify-between pt-2">
            {#if currentPage != 1}
                <Pagination.Item class="self-start">
                    <Pagination.PrevButton onclick={() => handlePrevButton()} />
                </Pagination.Item>
            {:else}
                <!-- Placeholder, this pushes Next to the right when page is 1 -->
                <div class="w-[5em]"></div>
            {/if}
            {#if currentPage != totalPages}
                <Pagination.Item class="self-end">
                    <Pagination.NextButton onclick={() => handleNextButton()} />
                </Pagination.Item>
            {:else}
                <Pagination.Item>
                    {@render submitRender()}
                </Pagination.Item>
            {/if}
        </Pagination.Content>
    {/snippet}
</Pagination.Root>
