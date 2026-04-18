<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    // import Picker from "$lib/components/picker.svelte"
    import RequiredField from "$lib/components/required-field.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import { enhance } from "$app/forms"
    import { formSchema } from "./schema.svelte.ts"

    const REGIONAL_OFFICES = [
        "I", "II", "III", "IV", "MIMAROPA", "V", "VI", "VII", "VIII",
        "IX", "X", "XI", "XII", "XIII", "NCR", "CAR", "BARMM", "NIR",
    ];
</script>

<div class="content-container bg-muted">
    <div class="content bg-background">
        <h1>CSC Application</h1>

        <Separator />
    
        <form method="POST" use:enhance autocomplete=off>
            <Label class="min-h-8 text-sm font-normal"><i>Personal Details</i></Label>

            <div class="divider">
                <FormField bind:value={formSchema.applicantName} name={"Name"} />
                <FormField bind:value={formSchema.applicantAge} name={"Age"} type={"number"} />
                <FormDate bind:value={formSchema.applicantBirthdate} name={"Date of Birth"} />
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
        padding: 0.5em 1em;
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
        border-radius: 5px;
        min-height: 100vh;
    }
</style>
