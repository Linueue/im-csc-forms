<script lang="ts">
    import * as Table from "$lib/components/ui/table/index"
    import { type PageProps } from "./$types"
    import { formatDate } from "$lib/utils/date"
    import FlatTableView from "$lib/components/flat-table-view.svelte"

    let { data }: PageProps = $props();
</script>

<div class="p-2 w-full overflow-x-auto">
    <FlatTableView
        name="Applicant Statistics"
        desc="CSC Regional Office Applicants"
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[30em] w-[30em]">CSC Regional Office</Table.Head>
            <Table.Head class="max-w-[25em]">Total Applicants</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each data.applicants as applicant}
                <Table.Row>
                    {#each data.fields as field}
                        <Table.Cell class="font-normal text-muted-foreground">
                            {#if ["Birthdate", "LastExaminationTaken", "ExaminationDate"].includes(field)}
                                {formatDate(applicant[field])}
                            {:else}
                                {applicant[field]}
                            {/if}
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {/each}
        {/snippet}
    </FlatTableView>
</div>
