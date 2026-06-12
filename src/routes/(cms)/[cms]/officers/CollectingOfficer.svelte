<script lang="ts">
    import FormField from "$lib/components/forms/FormField.svelte"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte";
    import { enhance } from "$app/forms"
    import { toast } from "svelte-sonner"
    import { type SubmitFunction } from "@sveltejs/kit"
    import { serialize, checkAllValidation, SubmitStatus } from "$lib/utils/forms"

    export const detailsSchema = {
        collectingOfficerName: item.string(),
    };

    let schemaFormData = $state(mapForm(detailsSchema));
    let isSubmitting = $state(false);
    let submitStatus = $state(SubmitStatus.None);

    const submitFn: SubmitFunction = async ({ cancel, formData }) => {
        const schemaMap = new Map(Object.entries(schemaFormData));
        const isValid = checkAllValidation(schemaMap);
        if(!isValid)
        {
            toast.error("Missing required/invalid fields!");
            cancel();
            return;
        }

        isSubmitting = true;
        // Delete each params in formData, since we would like to send a JSON to the server
        for(const key of formData.keys())
            formData.delete(key);

        const serialized = serialize(schemaMap);
        const serializedString = JSON.stringify(serialized);
        formData.set("payload", serializedString);

        return async ({ result, update }) => {
            await update();

            submitStatus = result.status == 200 ? SubmitStatus.Submitted : SubmitStatus.Failed;
            isSubmitting = false;

            schemaFormData = mapForm(detailsSchema);

            toast.info("Added");
        };
    }
</script>

<div class="flex flex-col py-3">
    <Dialog.Content class="sm:max-w-[80ch]">
        <form class="flex flex-col space-y-5" method="POST" action="?/submitCollectingOfficer" use:enhance={submitFn} autocomplete=off>
            <Dialog.Header>
                <Dialog.Title>Add Collecting Officer</Dialog.Title>
            </Dialog.Header>
            <div class="overflow-y-auto max-h-[75vh]">
                <FormField
                    name="Name"
                    placeholder="Dela Cruz, Juan"
                    bind:value={schemaFormData.collectingOfficerName}
                />
            </div>
            <Dialog.Footer>
                <Dialog.Close
                    type="button"
                    class={buttonVariants({ variant: "outline" })}
                >
                    Cancel
                </Dialog.Close>
                <Dialog.Close
                    type="submit"
                    class={buttonVariants({ variant: "default" })}
                >
                    Save changes
                </Dialog.Close>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</div>

