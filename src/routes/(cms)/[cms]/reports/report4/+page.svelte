<script lang="ts">
    import * as Table from "$lib/components/ui/table/index"
    import { type PageProps } from "./$types"
    import { formatDate } from "$lib/utils/date"
    import FlatTableView from "$lib/components/flat-table-view.svelte"
    import { employmentType } from "$lib/utils/forms"

    let { data }: PageProps = $props();
</script>

<div class="p-2 w-full overflow-x-auto">
    <FlatTableView
        name="Applicant Statistics"
        desc="Employment Type Distribution"
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[30em] w-[30em]">Employment Type</Table.Head>
            <Table.Head class="max-w-[25em]">No of Applicants</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each data.applicants as applicant}
                <Table.Row>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {employmentType(applicant.EmploymentType)}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.No_of_Applicants}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
    </FlatTableView>
</div>
