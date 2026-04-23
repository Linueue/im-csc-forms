<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Picker from "$lib/components/forms/FormPicker.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import Row from "$lib/components/row.svelte"
    import { enhance } from "$app/forms"
    import { formSchema } from "./schema.svelte.ts"
    import { getAge } from "$lib/utils/date"

    const REGIONAL_OFFICES = [
        "I", "II", "III", "IV", "MIMAROPA", "V", "VI", "VII", "VIII",
        "IX", "X", "XI", "XII", "XIII", "NCR", "CAR", "BARMM", "NIR",
    ];

    $effect(() => {
        if(formSchema.applicantBirthdate.value != null)
            formSchema.applicantAge.value = getAge(formSchema.applicantBirthdate.value);
    });
</script>

<div class="content-container bg-muted">
    <div class="content bg-background">
        <h1>CSC Application</h1>

        <Separator />
    
        <form method="POST" use:enhance autocomplete=off>
            <Label class="min-h-8 text-sm font-normal"><i>Personal Details</i></Label>

            <div class="divider">
                <FormMultiField name={"Name"}>
                    <FormUnlabeledField bind:value={formSchema.applicantLastName} placeholder={"Last Name"} />
                    <FormUnlabeledField bind:value={formSchema.applicantFirstName} placeholder={"First Name"} />
                    <FormUnlabeledField bind:value={formSchema.applicantMiddleName} placeholder={"Middle Name"} />
                </FormMultiField>
                <Picker title={"sex"} name={"Sex"} options={["Male", "Female"]} bind:value={formSchema.applicantSex} />
                <FormDate bind:value={formSchema.applicantBirthdate} name={"Date of Birth"} />
                <FormField bind:value={formSchema.applicantAge} name={"Age"} type={"number"} readonly={true} placeholder={"Age"} errorMessage={"You must be atleast 18 years old to apply!"} />
                <FormField bind:value={formSchema.applicantBirthplace} name={"Place of Birth"} placeholder={"Manila"} />
            </div>

            <Separator />
        </form>
    </div>
</div>

<style>
    h1
    {
        font-size: 2rem;
        padding: 0.5rem 0rem 1rem 0rem;
    }

    .divider
    {
        padding: 0.5em 0.5em;
    }

    .content-container
    {
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .content
    {
        padding: 1em;
        max-width: 80ch;
        width: 100%;
        border-radius: var(--radius);
        min-height: 100vh;
    }
</style>
