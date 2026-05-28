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
    import { CITIZENSHIPS, CIVIL_STATUS } from "../selection-constants.svelte"
    import MailIcon from "@lucide/svelte/icons/mail"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.applicantBirthdate.value != null)
        {
            formSchemaData.applicantAge.value = getAge(formSchemaData.applicantBirthdate.value);
            formSchemaData.applicantAge.validateThenSet();
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Personal Details</Label>
</Row>

<div class="divider space-y-2.5">
    <FormMultiField name={"Name"}>
        <FormUnlabeledField bind:value={formSchemaData.applicantLastName} placeholder={"Last Name"} />
        <FormUnlabeledField bind:value={formSchemaData.applicantFirstName} placeholder={"First Name"} />
        <FormUnlabeledField bind:value={formSchemaData.applicantMiddleName} placeholder={"Middle Name"} />
    </FormMultiField>
    <FormToggleGroup
        name={"Sex"}
        options={[
            {value: "M", label: "Male"},
            {value: "F", label: "Female"},
        ]}
        bind:value={formSchemaData.applicantSex}
    />
    <FormDate bind:value={formSchemaData.applicantBirthdate} name={"Date of Birth"} />
    <FormField bind:value={formSchemaData.applicantAge} name={"Age"} type={"number"} readonly={true} placeholder={"Age"} errorMessage={"You must be atleast 18 years old to apply!"} />
    <FormField bind:value={formSchemaData.applicantBirthplace} name={"Place of Birth"} placeholder={"Manila"} />
    <FormPicker
        name={"Citizenship"}
        options={CITIZENSHIPS}
        bind:value={formSchemaData.applicantCitizenship}
    />
    <FormPicker
        name={"Civil Status"}
        options={CIVIL_STATUS}
        bind:value={formSchemaData.applicantCivilStatus}
    />
    <FormField
        bind:value={formSchemaData.applicantMotherMaidenName}
        name={"Mother Maiden Name"}
        placeholder={"Jane Doe"}
    />
    <FormField
        bind:value={formSchemaData.applicantAddress}
        name={"Address"}
        placeholder={"#123 San Juan St., Manila"}
    />
    <FormField
        bind:value={formSchemaData.applicantMobile}
        type={"number"}
        name={"Mobile Number"}
        placeholder={"09123456789"}
    />
    <FormField
        bind:value={formSchemaData.applicantTelephone}
        name={"Telephone Number"}
        placeholder={"+632 123 456"}
    />
    <FormField
        bind:value={formSchemaData.applicantEmail}
        name={"Email"}
        placeholder={"johndoe@gmail.com"}
    >
        {#snippet icon()}
            <MailIcon strokeWidth={1} />
        {/snippet}
    </FormField>
    <FormImageUpload
        bind:value={formSchemaData.applicantPhoto}
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

<Separator class="mt-2" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
