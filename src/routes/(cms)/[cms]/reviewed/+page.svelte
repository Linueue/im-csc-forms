<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { formatDate } from "$lib/utils/date"
    import FlatTable from "$lib/components/table-view.svelte"
    import ApplicantView from "$lib/components/applicant-view.svelte";
    import LoadingIcon from "@lucide/svelte/icons/loader-circle"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Filter from "$lib/components/filter/filter-reviewed.svelte";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    let applicants = $state<Record<string, any>[]>([]);
    let selectedApplicant = $state<Record<string, any> | null>(null);
    let isLoading = $state(false);
    let selectedApplicantAction = $state("A");

    async function openApplicant(applicant: string)
    {
        selectedApplicant = null;
        isLoading = true;

        const params = new URLSearchParams({
            applicantNo: applicant
        });

        const response = await fetch(`/api/getApplicantDetails?${params.toString()}`);

        const result: Record<string, any> = await response.json();
        selectedApplicant = result.applicant;
        selectedApplicant!.existingExaminations = result.existingExaminations;
        isLoading = false;
    }

    onMount(async () => {
        const response = await fetch(`/api/filterReviewed`, {
            method: "POST",
        });

        if(!response.ok)
            toast.error("Error fetching the database.");

        const result: Record<string, any> = await response.json();
        applicants = result.applicants;
    });
</script>

<div class="px-2 my-3 w-full overflow-x-auto">
    <div class="text-xl flex flex-row">
        <div class="mr-auto font-medium font-serif">
            Reviewed Applications
        </div>
        <Filter bind:applicants />
    </div>
    <FlatTable
        name={null}
        enhanceFn={null}
        submitName={null}
        dialogHeaderTitle={"View"}
        formAction={null}
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[3em] w-[3em]"></Table.Head>
            <Table.Head class="max-w-[5em] text-center">Action</Table.Head>
            <Table.Head class="max-w-[10em]">Applicant Name</Table.Head>
            <Table.Head class="max-w-[5em] text-center">Age</Table.Head>
            <Table.Head class="max-w-[5em] text-center">Sex</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Examination Place</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Examination Date</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Verified Against</Table.Head>
            <Table.Head class="max-w-[10em] text-center">Date Processed</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each applicants as applicant}
                <Table.Row>
                    <Table.Cell class="font-normal text-muted-foreground flex align-center justify-center">
                        <Dialog.Trigger
                            type="button"
                            class={buttonVariants({ variant: "outline" })}
                            onclick={
                                () => {
                                    selectedApplicantAction = applicant.Action;
                                    openApplicant(applicant.ApplicantNo);
                                }
                            }
                        >
                            View
                        </Dialog.Trigger>
                    </Table.Cell>
                    <Table.Cell class="font-normal w-[5em] text-muted-foreground text-center">
                        <div class={`rounded-md ${applicant.Action === "A" ? "text-green-500" : "text-destructive"}`}>
                            {applicant.Action === "A" ? "Approved" : "Rejected"}
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
                    <Table.Cell class="font-normal text-muted-foreground text-center">
                        {formatDate(applicant.ProcessingDate)}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
        {#snippet children()}
            {#if isLoading && !selectedApplicant}
                <div class="flex flex-col items-center py-[15em] gap-3">
                    <LoadingIcon class="animate-spin" />
                    <div>
                        Loading Applicant...
                    </div>
                </div>
            {:else}
                <ApplicantView applicant={selectedApplicant}>
                    {#snippet children()}
                        <div class={`rounded-md ${selectedApplicantAction === "A" ? "text-green-500" : "text-destructive"}`}>
                            {selectedApplicantAction === "A" ? "Approved" : "Rejected"}
                        </div>
                    {/snippet}
                </ApplicantView>
            {/if}
        {/snippet}
    </FlatTable>
</div>
