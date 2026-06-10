<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import BriefcaseIcon from "@lucide/svelte/icons/briefcase"
    import { EMPLOYMENT_STATUS } from "../selection-constants.svelte"
    import { slide } from "svelte/transition"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.isEmployed.value === false)
        {
            formSchemaData.employmentPosition.value = null;
            formSchemaData.employmentYears.value = null;
            formSchemaData.employmentStatus.value = null;
            formSchemaData.agencyName.value = null;
            formSchemaData.agencyAddress.value = null;
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em] pb-[0.5em]">
    <BriefcaseIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Employment</Label>
</Row>

<div class="divider space-y-5">
    <FormToggleGroup
        name={"DO YOU HAVE A JOB?"}
        options={[
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ]}
        bind:value={formSchemaData.isEmployed}
    />
    {#if formSchemaData.isEmployed.value}
        <div transition:slide class="divider space-y-5">
            <FormField
                bind:value={formSchemaData.employmentPosition}
                name={"Position"}
                placeholder={"Admin"}
            />
            <FormField
                bind:value={formSchemaData.employmentYears}
                type={"number"}
                name={"Years Employed"}
                placeholder={"3"}
            />
            <FormPicker
                name={"Status"}
                options={EMPLOYMENT_STATUS}
                bind:value={formSchemaData.employmentStatus}
            />
            <FormField
                bind:value={formSchemaData.agencyName}
                name={"Agency Name"}
                placeholder={"Cebu City Hall"}
            />
            <FormField
                bind:value={formSchemaData.agencyAddress}
                name={"Agency Address"}
                placeholder={"Cebu City"}
            />
        </div>
    {/if}
</div>

<Separator class="mt-5" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
