<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import { enhance } from "$app/forms"

    let { headerRows, bodyRows, children, name, dialogHeaderTitle, dialogHeaderDesc = null, enhanceFn, submitName, formAction } = $props();
</script>

<div>
    <div class="text-xl font-medium font-serif">
        {name}
    </div>

    <Table.Root>
        <Dialog.Root>
            <Table.Header>
                <Table.Row>
                    {@render headerRows()}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {@render bodyRows()}
            </Table.Body>
            <Dialog.Content class="sm:max-w-[80ch]">
                <form class="flex flex-col space-y-5" method="POST" action={formAction} use:enhance={enhanceFn} autocomplete=off enctype="multipart/form-data">
                    <Dialog.Header>
                        <Dialog.Title>{dialogHeaderTitle}</Dialog.Title>
                        {#if dialogHeaderDesc}
                            <Dialog.Description>{dialogHeaderDesc}</Dialog.Description>
                        {/if}
                    </Dialog.Header>
                    <div class="overflow-y-auto max-h-[65vh] sm:max-h-[75vh]">
                        {@render children()}
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
                            {submitName}
                        </Dialog.Close>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    </Table.Root>
</div>
