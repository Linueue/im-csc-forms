<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { type PageProps } from "./$types"
    import { formatDate, getToday } from "$lib/utils/date"
    import FlatTableView from "$lib/components/flat-table-view.svelte"

    let { data }: PageProps = $props();

</script>

<div class="px-2 my-3 w-full overflow-x-auto">
    <FlatTableView
        name="Reviewed Applications"
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[5em] text-center">Action</Table.Head>
            <Table.Head class="max-w-[10em]">Applicant Name</Table.Head>
            <Table.Head class="max-w-[5em] text-center">Age</Table.Head>
            <Table.Head class="max-w-[5em] text-center">Sex</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Examination Place</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Examination Date</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Verified Against</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each data.applicants as applicant}
                <Table.Row>
                    <Table.Cell class="font-normal w-[5em] text-muted-foreground text-center">
                        <div class={`rounded-md ${applicant.Action === "A" ? "text-green-500" : "text-destructive"}`}>
                            {applicant.Action === "A" ? "Approved" : "Disapproved"}
                        </div>
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.ApplicantName}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {applicant.Age}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {applicant.Sex}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {applicant.Examinationplace}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {formatDate(applicant.ExaminationDate)}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {applicant.VerifiedAgainst}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
    </FlatTableView>
</div>
