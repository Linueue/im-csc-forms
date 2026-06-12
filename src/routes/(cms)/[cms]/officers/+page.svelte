<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { type PageProps } from "./$types"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import CollectingOfficer from "./CollectingOfficer.svelte"

    let { data }: PageProps = $props();
</script>

<div class="p-8 w-full overflow-x-auto">
    <div class="text-xl font-medium">
        Collecting Officers
    </div>

    <Table.Root>
        <Dialog.Root>
            <Table.Header>
                <Table.Row>
                    <Dialog.Trigger
                        type="button"
                        class={buttonVariants({ variant: "ghost" })}
                        onclick={
                            () => {
                            }
                        }
                    >
                        +
                    </Dialog.Trigger>
                    {#each data.coFields as field}
                        <Table.Head class="max-w-[25em]">{field}</Table.Head>
                    {/each}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each data.collectingOfficers as collectingOfficer}
                    <Table.Row>
                        <Table.Cell class="font-normal text-muted-foreground">
                        </Table.Cell>
                        {#each data.coFields as field}
                            <Table.Cell class="font-normal text-muted-foreground">
                                {collectingOfficer[field]}
                            </Table.Cell>
                        {/each}
                    </Table.Row>
                {/each}
            </Table.Body>
            <CollectingOfficer />
        </Dialog.Root>
    </Table.Root>
</div>
