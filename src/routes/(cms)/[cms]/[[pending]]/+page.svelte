<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { type PageProps } from "./$types"
    import { formatDate, getToday } from "$lib/utils/date"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import LoadingIcon from "@lucide/svelte/icons/loader-circle"
    import PostDetails from "./PostDetails.svelte"
    import TableView from "$lib/components/table-view.svelte"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte";
    import { CalendarDate } from "@internationalized/date";
    import ApplicantView from "$lib/components/applicant-view.svelte";
    import { toast } from "svelte-sonner"
    import { onMount } from "svelte"
    import { type SubmitFunction } from "@sveltejs/kit"
    import { checkAllValidation, serialize } from "$lib/utils/forms"

    let { data }: PageProps = $props();

    function genORNumber()
    {
        const today = getToday();
        const max = 999999;
        const rand = Math.floor(Math.random() * max).toString();
        return `OR-${today.year}-${rand.padStart(6, '0')}`
    }

    const detailsSchema = {
        verifiedAgainst: item.string().min(1).max(50).default("DIBAR"),
        examinationDate: item.date().default(new CalendarDate(2026, 8, 10)),
        examinationPlace: item.string().default("Manila"),
        CSCRegionalOffice: item.string().default("NCR"),
        processingORNumber: item.string().default(genORNumber),
        processingAmount: item.number().default(500),
        collectingOfficerID: item.number().default(1),
        processingIdentification: item.string().default("National ID"),
        processingActionTaken: item.string().default("A"),
        processingReasonForDisapproval: item.string().default("Missing"),
        processorID: item.number().default(1),
    };

    let selectedApplicant: Record<string, any> | null = $state(null);
    let isLoading = $state(false);
    let collectingOfficers = $state<Record<string, any>[]>([]);
    let processors = $state<Record<string, any>[]>([]);

    let schemaFormData = $state(mapForm(detailsSchema));

    async function openReview(applicant: string)
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

    const submitFn: SubmitFunction = async ({ cancel, formData }) => {
        const schemaMap = new Map(Object.entries(schemaFormData));
        const isValid = checkAllValidation(schemaMap);
        if(!isValid)
        {
            toast.error("Missing required/invalid fields!");
            cancel();
            return;
        }

        for(const key of formData.keys())
            formData.delete(key);

        const { data, files: _ } = serialize(schemaMap);
        data.applicantNo = selectedApplicant?.ApplicantNo;

        const serializedString = JSON.stringify(data);
        formData.set("payload", serializedString);

        return async ({ result, update }) => {
            await update();

            if(result.status == 200)
            {
                schemaFormData = mapForm(detailsSchema);
                toast.info("Added.");
                return;
            }

            toast.error("Could not add.")
        };
    }

    onMount(async () => {
        const collectingOfficersPromise = fetch("/api/getCollectingOfficers");
        const processorsPromise = fetch("/api/getProcessors");
        const [r1, r2] = await Promise.all([collectingOfficersPromise, processorsPromise]);

        if(!r1.ok || !r2.ok)
        {
            toast.error("Could not fetch the database.");
            return;
        }

        const [result1, result2] = await Promise.all([r1.json(), r2.json()]) as Record<string, any>[];
        collectingOfficers = result1.collectingOfficers;
        processors = result2.processors;
        if(collectingOfficers)
            schemaFormData.collectingOfficerID.value = collectingOfficers[0].CollectingOfficerID;
        if(processors)
            schemaFormData.processorID.value = processors[0].ProcessorID;
    })
</script>

<div class="px-2 my-3 w-full overflow-x-auto">
    <TableView
        name="Pending Applications"
        enhanceFn={submitFn}
        submitName={"Update"}
        dialogHeaderTitle={"Review"}
        formAction="?/submit"
    >
        {#snippet headerRows()}
            <Table.Head class="max-w-[5em] w-[5em] text-center">Action</Table.Head>
            <Table.Head class="max-w-[25em]">Applicant Name</Table.Head>
            <Table.Head class="max-w-[25em] w-[5em] text-center">Age</Table.Head>
            <Table.Head class="max-w-[25em] w-[5em] text-center">Sex</Table.Head>
            <Table.Head class="max-w-[25em] w-[8em] text-center">Citizenship</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each data.applicants as applicant}
                <Table.Row>
                    <Table.Cell class="font-normal text-muted-foreground flex align-center justify-center">
                        <Dialog.Trigger
                            type="button"
                            class={buttonVariants({ variant: "outline" })}
                            onclick={
                                () => {
                                    openReview(applicant.ApplicantNo);
                                }
                            }
                        >
                            Review
                        </Dialog.Trigger>
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
                        {applicant.Citizenship}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
        {#snippet children()}
            <div>
                {#if isLoading && !selectedApplicant}
                    <div class="flex flex-col items-center py-[15em] gap-3">
                        <LoadingIcon class="animate-spin" />
                        <div>
                            Loading Applicant...
                        </div>
                    </div>
                {:else}
                    <div class="flex flex-col">
                        <ApplicantView applicant={selectedApplicant} />
                        <PostDetails bind:schemaFormData collectingOfficers={collectingOfficers} processors={processors} />
                    </div>
                {/if}
            </div>
        {/snippet}
    </TableView>
</div>
