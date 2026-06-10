<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { type PageProps } from "./$types"
    import { formatDate } from "$lib/utils/date"

    let { data }: PageProps = $props();
</script>

<div class="p-8 w-full overflow-x-auto">
    <div class="text-xl font-medium">
        Reports
    </div>

    <Table.Root>
        <Table.Header>
            <Table.Row>
                {#each data.fields as field}
                    <Table.Head class="max-w-[25em]">{field}</Table.Head>
                {/each}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each data.applicants as applicant}
                <Table.Row>
                    {#each data.fields as field}
                        <Table.Cell class="font-normal text-muted-foreground">
                            {#if ["Birthdate", "LastExaminationTaken", "ExaminationDate"].includes(field)}
                                {formatDate(applicant[field])}
                            {:else}
                                {applicant[field]}
                            {/if}
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
