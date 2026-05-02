<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Picker from "$lib/components/forms/FormPicker.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import { formSchema } from "../schema.svelte.ts"
    import { getAge } from "$lib/utils/date"
    import { CITIZENSHIPS } from "../selection-constants.svelte"

    $effect(() => {
        if(formSchema.applicantBirthdate.value != null)
        {
            formSchema.applicantAge.value = getAge(formSchema.applicantBirthdate.value);
            formSchema.applicantAge.validateThenSet();
        }
    });
</script>

<Label class="min-h-8 text-sm font-normal"><i>Personal Details</i></Label>

<div class="divider">
    <FormMultiField name={"Name"}>
        <FormUnlabeledField bind:value={formSchema.applicantLastName} placeholder={"Last Name"} />
        <FormUnlabeledField bind:value={formSchema.applicantFirstName} placeholder={"First Name"} />
        <FormUnlabeledField bind:value={formSchema.applicantMiddleName} placeholder={"Middle Name"} />
    </FormMultiField>
    <Picker
        title={"sex"}
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
    <Picker
        title={"nationality"}
        name={"Nationality"}
        options={CITIZENSHIPS}
        bind:value={formSchema.applicantCitizenship}
    />
</div>

<Separator />

<style>
    .divider
    {
        padding: 0.5em 0.5em;
    }
</style>
