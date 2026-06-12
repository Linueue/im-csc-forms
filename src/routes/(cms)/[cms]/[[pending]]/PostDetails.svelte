<script lang="ts">
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import { REGIONAL_OFFICES } from "$lib/selection-constants"
    import { slide } from "svelte/transition"

    let { schemaFormData = $bindable(), collectingOfficers, processors } = $props();
</script>

<div class="flex flex-col py-5 space-y-5">
    <div class="text-xl font-serif">
        Examination Details
    </div>

    <FormToggleGroup
        name="Verified Against"
        options={[
            { label: "DIBAR", value: "DIBAR" },
            { label: "E-Retakers", value: "E-Retakers" },
            { label: "EDQIS", value: "EDQIS" },
        ]}
        bind:value={schemaFormData.verifiedAgainst}
    />
    <FormPicker
        name="CSC Regional Office"
        options={REGIONAL_OFFICES}
        bind:value={schemaFormData.CSCRegionalOffice}
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

    <div class="text-xl font-serif">
        Payment Details
    </div>

    <FormField
        name="Processing OR Number"
        placeholder="2026-OR-000000"
        disabled={true}
        bind:value={schemaFormData.processingORNumber}
    />
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
    {#if schemaFormData.processingActionTaken.value === "D"}
        <div transition:slide>
            <FormField
                name="Reason for Disapproval"
                placeholder="ID"
                bind:value={schemaFormData.processingReasonForDisapproval}
            />
        </div>
    {/if}
    <FormPicker
        name="Processor"
        options={processors.map((processor: any) => ({ label: processor.ProcessorName, value: processor.ProcessorID }))}
        bind:value={schemaFormData.processorID}
    />
</div>
