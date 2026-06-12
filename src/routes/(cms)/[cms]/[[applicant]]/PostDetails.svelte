<script lang="ts">
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte";
    import { CalendarDate } from "@internationalized/date";
    import { enhance } from "$app/forms"
    import { toast } from "svelte-sonner"
    import { type SubmitFunction } from "@sveltejs/kit"
    import { checkAllValidation, SubmitStatus } from "$lib/utils/forms"

    export const detailsSchema = {
        verifiedAgainst: item.string().min(1).max(50).default("DIBAR"),
        examinationDate: item.date().default(new CalendarDate(2026, 8, 10)),
        examinationPlace: item.string().default("Manila"),
        processingAmount: item.number().default(500),
        collectingOfficerID: item.number().default(1),
        processingIdentification: item.string(),
        processingActionTaken: item.string().default("A"),
        processorID: item.number().default(1),
    };

    let { collectingOfficers, processors } = $props();
    const schemaFormData = $state(mapForm(detailsSchema));
    let isSubmitting = $state(false);
    let submitStatus = $state(SubmitStatus.None);

    const submitFn: SubmitFunction = async ({ cancel }) => {
        const isValid = checkAllValidation(new Map(Object.entries(schemaFormData)));
        if(!isValid)
        {
            toast.error("Missing required/invalid fields!");
            cancel();
            return;
        }

        isSubmitting = true;

        return async ({ result, update }) => {
            await update();

            submitStatus = result.status == 200 ? SubmitStatus.Submitted : SubmitStatus.Failed;
            isSubmitting = false;
        };
    }
</script>

<div class="flex flex-col py-3">
    <form class="flex flex-col space-y-5" method="POST" action="?/submit" use:enhance={submitFn} autocomplete=off>
        <div class="text-xl">
            Examination Details
        </div>

        <FormPicker
            name="Verified Against"
            options={[
                { label: "DIBAR", value: "DIBAR" },
            ]}
            bind:value={schemaFormData.verifiedAgainst}
        />
        <FormDate
            name="Examination Date"
            bind:value={schemaFormData.examinationDate}
            limit={false}
        />
        <FormField
            name="Examination Place"
            placeholder="Manila"
            bind:value={schemaFormData.examinationPlace}
        />

        <div class="text-xl">
            Payment Details
        </div>

        <FormField
            name="Processing Amount"
            placeholder="Php500"
            type="number"
            bind:value={schemaFormData.processingAmount}
        />
        <FormPicker
            name="Collecting Officer"
            options={collectingOfficers.map((officer: any) => ({ label: officer.CollectingOfficerName, value: officer.CollectingOfficerID }))}
            bind:value={schemaFormData.collectingOfficerID}
        />
        <FormField
            name="Processing Identification"
            placeholder="ID"
            bind:value={schemaFormData.processingIdentification}
        />
        <FormToggleGroup
            name="Action"
            options={[
                { label: "Approved", value: "A" },
                { label: "Disapproved", value: "D" },
            ]}
            bind:value={schemaFormData.processingActionTaken}
        />
        <FormPicker
            name="Processor"
            options={processors.map((processor: any) => ({ label: processor.ProcessorName, value: processor.ProcessorID }))}
            bind:value={schemaFormData.processorID}
        />
    </form>
</div>
