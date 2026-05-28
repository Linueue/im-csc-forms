<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormImageUpload from "$lib/components/forms/FormImageUpload.svelte"
    import FormSignatureUpload from "$lib/components/forms/FormSignatureUpload.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import CircleUserIcon from "@lucide/svelte/icons/circle-user"
    import { getAge } from "$lib/utils/date"
    import { EMPLOYMENT_STATUS } from "../selection-constants.svelte"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte"
    import MailIcon from "@lucide/svelte/icons/mail"
    import { slide } from "svelte/transition"

    let { formSchemaData = $bindable() } = $props();
</script>

<Row gap="0.5em" class="pt-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Employment</Label>
</Row>

<div class="divider space-y-2.5">
    <FormToggleGroup
        name={"DO YOU HAVE A JOB?"}
        options={[
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ]}
        bind:value={formSchemaData.isEmployed}
    />
    {#if formSchemaData.isEmployed.value}
        <div transition:slide class="divider space-y-2.5">
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

<Separator class="mt-2" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
