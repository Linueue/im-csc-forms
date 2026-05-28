<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import { Item } from "$lib/components/ItemSchema.svelte"
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
    import { slide } from "svelte/transition"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.applicantAge.value !== null)
        {
            formSchemaData.isSeniorCitizen.value = formSchemaData.applicantAge.value >= 60;
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Final</Label>
</Row>

<div class="divider space-y-2.5">
    <p class="px-5 font-light text-sm">To continue your submission, please upload, or draw your signature from the provided space below. Your signature will serve as confirmation that the information, and materials you have submitted are not of your own data. By proceeeding with the submission process, you acknowledge that you have read, understood, and agreed to the terms written in our Privacy Policy, including how the information may be collected, stored, processed, and protected in accordance with applicable laws, and regulations.</p>

    <FormSignatureUpload
        bind:value={formSchemaData.applicantSignature}
        name={"Signature"}
        title={"Upload your Signature Photo"}
        errorMessage={"Your file is over 1MB large!"}
    >
        {#snippet description()}
            - Black ink on white background
        {/snippet}
    </FormSignatureUpload>
</div>

<Separator />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 5px;
        width: 100%;
    }
</style>
