<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { Checkbox } from "$lib/components/ui/checkbox/index.js"
    import FormField from "$lib/components/forms/FormField.svelte"
    import TableView from "$lib/components/table-view.svelte"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import { item, mapForm } from "$lib/components/ItemSchema.svelte";
    import { toast } from "svelte-sonner"
    import { type SubmitFunction } from "@sveltejs/kit"
    import { serialize, checkAllValidation, SubmitStatus } from "$lib/utils/forms"
    import { invalidateAll } from "$app/navigation"

    export const detailsSchema = {
        collectingOfficerName: item.string(),
    };
    let schemaFormData = $state(mapForm(detailsSchema));
    let selected = $state(new Set());

    let { collectingOfficers, coFields } = $props();

    async function deleteRowsFn()
    {
        if([...selected].length === 0)
            return;

        const response = await fetch(`/api/removeCollectingOfficer`, {
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
            toast.error("Could not be removed.");
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

        // Delete each params in formData, since we would like to send a JSON to the server
        for(const key of formData.keys())
            formData.delete(key);

        const { data, files: _ } = serialize(schemaMap);
        const serializedString = JSON.stringify(data);
        formData.set("payload", serializedString);

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
        name="Collecting Officers"
        enhanceFn={submitFn}
        submitName={"Add"}
        dialogHeaderTitle={"Add Collecting Officer"}
        formAction="?/submitCollectingOfficer"
    >
        {#snippet headerRows()}
            <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "ghost" })}
            >
                +
            </Dialog.Trigger>
            <Table.Head class="max-w-[3em]">Collecting Officer Name</Table.Head>
        {/snippet}
        {#snippet bodyRows()}
            {#each collectingOfficers as collectingOfficer}
                <Table.Row>
                    <Table.Cell class="w-[3em] font-normal text-muted-foreground">
                        <Checkbox
                            checked={selected.has(collectingOfficer.CollectingOfficerID)}
                            onCheckedChange={(checked) => {
                                if(checked)
                                    selected.add(collectingOfficer.CollectingOfficerID);
                                else
                                    selected.delete(collectingOfficer.CollectingOfficerID);
                            }}
                        />
                    </Table.Cell>
                    <Table.Cell class="font-normal text-muted-foreground">
                        {collectingOfficer.CollectingOfficerName}
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/snippet}
        {#snippet children()}
            <div>
                <FormField
                    name="Name"
                    placeholder="Dela Cruz, Juan"
                    bind:value={schemaFormData.collectingOfficerName}
                />
            </div>
        {/snippet}
    </TableView>
    <Button class="m-2" variant="destructive" onclick={() => deleteRowsFn()}>Delete</Button>
</div>
