<script lang="ts">
    import { Separator } from "$lib/components/ui/separator/index.js"
    import FormPagination from "$lib/components/forms/FormPagination.svelte"
    import FormButton from "$lib/components/forms/FormButton.svelte"
    import {
        checkAllValidation,
        serialize,
        getFileUploads,
        createFormSchema,
        SubmitStatus,
    } from "./schema.svelte.ts"
    import { enhance } from "$app/forms"
    import { fade, scale } from "svelte/transition"
    import CheckIcon from "@lucide/svelte/icons/circle-check"
    import XIcon from "@lucide/svelte/icons/circle-x"
    import { type SubmitFunction } from "@sveltejs/kit"
    import Page1 from "./form-pages/page1.svelte"

    let isSubmitting = $state(false);
    let submitStatus = $state(SubmitStatus.None);
    let formSchema = $state(createFormSchema());

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
        const fileUploads = getFileUploads(schemaMap);

        formData.set("payload", serialized);

        for(const [key, value] of Object.entries(fileUploads))
        {
            // value! means trust me, this will not be null
            formData.set(key, value!);
        }

        return async ({ result, update }) => {
            await update();

            submitStatus = result.status == 200 ? SubmitStatus.Submitted : SubmitStatus.Failed;
        };
    }
</script>

<div class="content-container bg-background">
    <div class="content">
        <h1>Application Form</h1>

        <Separator />

        {#if submitStatus == SubmitStatus.None}
            <form method="POST" action="?/submit" use:enhance={submitFn} autocomplete=off enctype="multipart/form-data">
                <FormPagination totalPages={2}>
                    <!-- The `currentPage` is a variable that is provided by the `FormPagination` component. -->
                    {#snippet childRender({currentPage})}
                        {#if currentPage == 1}
                            <Page1 bind:formSchema />
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
        {:else if submitStatus == SubmitStatus.Submitted}
            <div class="flex flex-col items-center p-[1em] pt-[3.5em] pb-[3.5em] border-2 rounded-md" transition:fade>
                <div class="p-5">
                    <CheckIcon color="var(--primary)" size={32} />
                </div>
                <p transition:scale class="text-secondary">Submitted Successfully</p>
            </div>
        {:else}
            <div class="flex flex-col items-center p-[1em] pt-[3.5em] pb-[3.5em] border-2 rounded-md" transition:fade>
                <div class="p-5">
                    <XIcon color="var(--destructive)" size={32} />
                </div>
                <p transition:scale class="text-secondary">Failed to submit, please try again.</p>
            </div>
        {/if}
    </div>
</div>

<style>
    h1
    {
        font-size: 2rem;
        padding: 0.25rem 0rem 0.25rem 0rem;
        font-family: var(--font-serif);
    }

    .content-container
    {
        padding: 0em;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .content
    {
        padding: 0.25em 1em 1em 1em;
        max-width: 80ch;
        width: 100%;
        border-radius: var(--radius);
        min-height: 50vh;
    }
</style>
