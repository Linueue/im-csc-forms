<script lang="ts">
    import * as Pagination from "$lib/components/ui/pagination/index.js"

    type ChildRender = (args: { currentPage: number }) => any;
    type SubmitRender = (args: { }) => any;
    type NextButtonFn = (page: number) => any;
    let { totalPages, childRender, submitRender, nextButtonFn } = $props<{
        totalPages: number,
        childRender?: ChildRender,
        submitRender?: SubmitRender,
        nextButtonFn: NextButtonFn,
    }>();

    let page = $state(1);

    function handleNextButton()
    {
        const valid = nextButtonFn(page);
        console.log(valid);
        if(valid)
            return;
        page = page - 1;
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
                    <Pagination.PrevButton class="border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs" />
                </Pagination.Item>
            {:else}
                <!-- Placeholder, this pushes Next to the right when page is 1 -->
                <div class="w-[5em]"></div>
            {/if}
            {#if currentPage != totalPages}
                <Pagination.Item class="self-end">
                    <Pagination.NextButton onclick={() => handleNextButton()} class="border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs" />
                </Pagination.Item>
            {:else}
                <Pagination.Item>
                    {@render submitRender()}
                </Pagination.Item>
            {/if}
        </Pagination.Content>
    {/snippet}
</Pagination.Root>
