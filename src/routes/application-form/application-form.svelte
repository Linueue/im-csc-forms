<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js"
    import { Input } from "$lib/components/ui/input/index.js"
    import Picker from "$lib/components/picker.svelte"
    import { formSchema, type FormSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm
    } from "sveltekit-superforms";
    import { zod4Client } from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

    const form = superForm(data.form, {
        validators: zod4Client(formSchema),
    });

    const { form: formData, enhance } = form;
    const REGIONAL_OFFICES = [
        "I", "II", "III", "IV", "MIMAROPA", "V", "VI", "VII", "VIII",
        "IX", "X", "XI", "XII", "XIII", "NCR", "CAR", "BARMM", "NIR",
    ];
</script>

<div class="content-container">
    <form method="POST" use:enhance autocomplete=off>
        <Form.Field {form} name="regionalOffice">
            <Form.Control>
                <Form.Label>CSC Regional Office</Form.Label>
                <Picker title="Select" options={REGIONAL_OFFICES} bind:value={$formData.username} />
            </Form.Control>
            <Form.Description>This is your public display name.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
    </form>
</div>

<style>
    .content-container
    {
        padding: 1em;
    }
</style>
