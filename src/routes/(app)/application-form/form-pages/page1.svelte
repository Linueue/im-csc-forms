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
    import PhoneIcon from "@lucide/svelte/icons/phone"
    import EarthIcon from "@lucide/svelte/icons/earth"
    import UsersIcon from "@lucide/svelte/icons/users"
    import { getAge } from "$lib/utils/date"
    import { CITIZENSHIPS, CIVIL_STATUS } from "$lib/selection-constants"
    import MailIcon from "@lucide/svelte/icons/mail"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.applicantBirthdate.value != null)
        {
            formSchemaData.applicantAge.value = getAge(formSchemaData.applicantBirthdate.value);
            formSchemaData.applicantAge.validateThenSet();
        }
    });

    export function getActiveForms()
    {
    }
</script>

<Row gap="0.5em" class="pt-[0.5em] pb-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Personal Details</Label>
</Row>

<div class="divider space-y-5">
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
    <FormField disabled={true} bind:value={formSchemaData.applicantAge} name={"Age"} type={"number"} readonly={true} placeholder={"Age"} errorMessage={"You must be atleast 18 years old to apply!"} />
    <FormField bind:value={formSchemaData.applicantBirthplace} name={"Place of Birth"} placeholder={"Manila"} />
    <FormPicker
        name={"Citizenship"}
        options={CITIZENSHIPS}
        bind:value={formSchemaData.applicantCitizenship}
    >
        {#snippet icon()}
            <EarthIcon strokeWidth={1} />
        {/snippet}
    </FormPicker>
    <FormPicker
        name={"Civil Status"}
        options={CIVIL_STATUS}
        bind:value={formSchemaData.applicantCivilStatus}
    >
        {#snippet icon()}
            <UsersIcon strokeWidth={1} />
        {/snippet}
    </FormPicker>
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
        type={"tel"}
        name={"Mobile Number"}
        pattern={"[0-9]{11}"}
        errorMessage={"Digits must be exactly 11."}
        placeholder={"09123456789"}
    />
    <FormField
        bind:value={formSchemaData.applicantTelephone}
        name={"Telephone Number"}
        type={"tel"}
        pattern={"+[0-9]{3} [0-9]{3} [0-9]{3}"}
        placeholder={"+632 123 456"}
    >
        {#snippet icon()}
            <PhoneIcon size={20} strokeWidth={1} />
        {/snippet}
    </FormField>
    <FormField
        bind:value={formSchemaData.applicantEmail}
        name={"Email"}
        type={"email"}
        placeholder={"johndoe@gmail.com"}
    >
        {#snippet icon()}
            <MailIcon strokeWidth={1} size={"20"} />
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

<Separator class="mt-5" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
