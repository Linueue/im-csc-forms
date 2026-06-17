<script lang="ts">
    import * as Table from "$lib/components/ui/table/index"
    import { formatDate } from "$lib/utils/date"
    import FlatTableView from "$lib/components/flat-table-view.svelte"
    import Filter from "$lib/components/filter/filter-collecting-officers.svelte"
    import { onMount } from "svelte"
    import { toast } from "svelte-sonner"

    let applicants: Record<string, any>[] = $state([]);
    let collectingOfficers: Record<string, any>[] = $state([]);

    onMount(async () => {
        const applicantsPromise = fetch(`/api/filterCollectingOfficer`, {
            method: "POST",
        });
        const collectingOfficersPromise = fetch("/api/getCollectingOfficers");
        const [r1, r2] = await Promise.all([applicantsPromise, collectingOfficersPromise]);

        if(!r1.ok || !r2.ok)
            toast.error("Error fetching the database.");

        const [result1, result2] = await Promise.all([r1.json(), r2.json()]) as Record<string, any>[];

        applicants = result1.applicants;
        collectingOfficers = result2.collectingOfficers;
    })
</script>

<div class="p-2 w-full overflow-x-auto">
    <div class="text-xl flex flex-row">
        <div class="mr-auto font-medium font-serif">
            Report 10
        </div>
        <Filter bind:applicants bind:collectingOfficers />
    </div>
    <FlatTableView
        name={null}
        desc="Display the ApplicantNo, ApplicantName, ProcessingORNumber, and ProcessingAmount for applicants whose payment was handled by the Collecting Officer named %name%."
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[30em] w-[5em]">Applicant No</Table.Head>
            <Table.Head class="max-w-[25em]">Applicant Name</Table.Head>
            <Table.Head class="max-w-[25em]">Processing OR Number</Table.Head>
            <Table.Head class="max-w-[25em]">Processing Amount</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each applicants as applicant}
                <Table.Row>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.ApplicantNo}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.ApplicantName}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.ProcessingORNumber}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {applicant.ProcessingAmount}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
    </FlatTableView>
</div>
