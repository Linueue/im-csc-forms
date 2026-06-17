<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { Checkbox } from "$lib/components/ui/checkbox/index.js"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormSignatureUpload from "$lib/components/forms/FormSignatureUpload.svelte"
    import TableView from "$lib/components/table-view.svelte"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte";
    import { toast } from "svelte-sonner"
    import { type SubmitFunction } from "@sveltejs/kit"
    import { serialize, checkAllValidation } from "$lib/utils/forms"
    import { invalidateAll } from "$app/navigation"

    export const detailsSchema = {
        processorName: item.string(),
        processorPosition: item.string().default("Examination Processor I"),
        processorSignature: item.image().size(1 * 1024 * 1024),
    };
    let schemaFormData = $state(mapForm(detailsSchema));
    let selected = $state(new Set());

    let { processors, pFields } = $props();

    async function deleteRowsFn()
    {
        if([...selected].length === 0)
            return;

        const response = await fetch("/api/removeProcessor", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ids: [...selected],
            }),
            cache: "no-store",
        });

        if(!response.ok)
        {
            const reason = await response.text();
            toast.error(reason);
            return;
        }
        toast.info("Removed.");

        selected = new Set();
        invalidateAll();
    }

    const submitFn: SubmitFunction = async ({ cancel, formData }) => {
        const schemaMap = new Map(Object.entries(schemaFormData));
        const isValid = checkAllValidation(schemaMap);
        if(!isValid)
        {
            toast.error("Missing required/invalid fields!");
            cancel();
            return;
        }

        for(const key of formData.keys())
            formData.delete(key);

        const { data, files } = serialize(schemaMap);
        const serializedString = JSON.stringify(data);
        formData.set("payload", serializedString);

        for(const [key, value] of Object.entries(files))
            formData.set(key, value!);

        return async ({ result, update }) => {
            await update();

            if(result.status == 200)
            {
                schemaFormData = mapForm(detailsSchema);
                toast.info("Added.");
                return;
            }

            toast.error("Could not add.")
        };
    }
</script>

<div>
    <TableView
        name="Processor"
        enhanceFn={submitFn}
        submitName={"Add"}
        dialogHeaderTitle={"Add Processor"}
        formAction="?/submitProcessor"
    >
        {#snippet headerRows()}
            <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "ghost" })}
            >
                +
            </Dialog.Trigger>
            <Table.Head class="max-w-[10em] w-[10em]">Processor Name</Table.Head>
            <Table.Head class="max-w-[10em]">Processor Position</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each processors as processor}
                <Table.Row>
                    <Table.Cell class="w-[3em] font-normal text-muted-foreground">
                        <Checkbox
                            checked={selected.has(processor.ProcessorID)}
                            onCheckedChange={(checked) => {
                                if(checked)
                                    selected.add(processor.ProcessorID);
                                else
                                    selected.delete(processor.ProcessorID);
                            }}
                        />
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {processor.ProcessorName}
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {processor.ProcessorPosition}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
        {#snippet children()}
            <div class="flex flex-col gap-5">
                <FormField
                    name="Name"
                    placeholder="Dela Cruz, Juan"
                    bind:value={schemaFormData.processorName}
                />
                <FormField
                    name="Position"
                    placeholder="Examination Processor I"
                    bind:value={schemaFormData.processorPosition}
                />
                <FormSignatureUpload
                    name="Signature"
                    title="Signature"
                    bind:value={schemaFormData.processorSignature}
                >
                    {#snippet description()}
                        - Black ink on white background.
                    {/snippet}
                </FormSignatureUpload>
            </div>
        {/snippet}
    </TableView>
    <Button class="m-2" variant="destructive" onclick={() => deleteRowsFn()}>Delete</Button>
</div>
