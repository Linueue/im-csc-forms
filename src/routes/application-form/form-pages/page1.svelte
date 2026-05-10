<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormImageUpload from "$lib/components/forms/FormImageUpload.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import CircleUserIcon from "@lucide/svelte/icons/circle-user"
    import { getAge } from "$lib/utils/date"
    import { CITIZENSHIPS } from "../selection-constants.svelte"

    let { formSchema = $bindable() } = $props();

    $effect(() => {
        if(formSchema.applicantBirthdate.value != null)
        {
            formSchema.applicantAge.value = getAge(formSchema.applicantBirthdate.value);
            formSchema.applicantAge.validateThenSet();
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Personal Details</Label>
</Row>

<div class="divider">
    <FormMultiField name={"Name"}>
        <FormUnlabeledField bind:value={formSchema.applicantLastName} placeholder={"Last Name"} />
        <FormUnlabeledField bind:value={formSchema.applicantFirstName} placeholder={"First Name"} />
        <FormUnlabeledField bind:value={formSchema.applicantMiddleName} placeholder={"Middle Name"} />
    </FormMultiField>
    <FormToggleGroup
        name={"Sex"}
        options={[
            {value: "M", label: "Male"},
            {value: "F", label: "Female"},
        ]}
        bind:value={formSchema.applicantSex}
    />
    <FormDate bind:value={formSchema.applicantBirthdate} name={"Date of Birth"} />
    <FormField bind:value={formSchema.applicantAge} name={"Age"} type={"number"} readonly={true} placeholder={"Age"} errorMessage={"You must be atleast 18 years old to apply!"} />
    <FormField bind:value={formSchema.applicantBirthplace} name={"Place of Birth"} placeholder={"Manila"} />
    <FormPicker
        title={"nationality"}
        name={"Nationality"}
        options={CITIZENSHIPS}
        bind:value={formSchema.applicantCitizenship}
    />

    <FormImageUpload
        bind:value={formSchema.applicantPhoto}
        name={"Picture"}
        title={"Upload your Passport-size Photo"}
        errorMessage={"Your file is over 5MB large!"}
    >
        {#snippet description()}
            - Philippine passport size
            - Showing 80% face capture
            - In bare face & showing left and right ears
            - With handwritten (not computer generated) name tag showing signature over printed full name
            - File must not be over 5MB
        {/snippet}
    </FormImageUpload>
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
