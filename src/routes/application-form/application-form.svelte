<script lang="ts">
    import { Separator } from "$lib/components/ui/separator/index.js"
    import FormPagination from "$lib/components/forms/FormPagination.svelte"
    import FormButton from "$lib/components/forms/FormButton.svelte"
    import { formSchema, checkAllValidation, serialize } from "./schema.svelte.ts"
    import { enhance } from "$app/forms"
    import { type SubmitFunction } from "@sveltejs/kit"
    import Page1 from "./form-pages/page1.svelte"

    let isSubmitting = $state(false);

    const submitFn: SubmitFunction = async ({ cancel, formData }) => {
        const schemaMap = new Map(Object.entries(formSchema));
        // Check if there are non-optional empty fields
        const isValid = checkAllValidation(schemaMap);

        if(!isValid)
        {
            cancel();
            return;
        }

        isSubmitting = true;

        // Delete each params in formData, since we would like to send a JSON to the server
        for(const key of formData.keys())
            formData.delete(key);

        const serialized: string = serialize(schemaMap);

        formData.set("payload", serialized);

        return async ({ update }) => {
            const result = await update();

            console.log(result);
        };
    }
</script>

<div class="content-container bg-muted">
    <div class="content bg-background">
        <h1>CSC Application</h1>

        <Separator />
    
        <form method="POST" action="?/submit" use:enhance={submitFn} autocomplete=off>
            <FormPagination totalPages={2}>
                <!-- The `currentPage` is a variable that is provided by the `FormPagination` component. -->
                {#snippet childRender({currentPage})}
                    {#if currentPage == 1}
                        <Page1 />
                    {:else if currentPage == 2}
                        <h1>That is all</h1>
                        <h1>Thank you!</h1>

                        <Separator />
                    {/if}
                {/snippet}
                {#snippet submitRender()}
                    <FormButton isLoading={isSubmitting}>Submit</FormButton>
                {/snippet}
            </FormPagination>
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
