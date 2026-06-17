<script lang="ts">
    import * as Popover from "$lib/components/ui/popover/index.js"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import Picker from "./picker.svelte"
    import { toast } from "svelte-sonner"

    let { applicants = $bindable(), collectingOfficers = $bindable() } = $props();

    let values = $state({
        collectingOfficer: null,
    });

    async function filter()
    {
        const response = await fetch("/api/filterCollectingOfficer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if(!response.ok)
        {
            toast.error("Could not fetch the databse.");
            return;
        }

        const result: Record<string, any> = await response.json();
        applicants = result.applicants;
    }

    function onChange()
    {
        filter();
    }
</script>

<Popover.Root>
    <Popover.Trigger class={buttonVariants({ variant: "outline" })}>
        Filter
    </Popover.Trigger>
    <Popover.Content class="w-80">
        <div class="flex flex-col gap-5">
            <Picker
                name="Collected by"
                bind:value={values.collectingOfficer}
                onChange={onChange}
                options={
                    collectingOfficers.map((officer: Record<string, any>) => ({ label: officer.CollectingOfficerName, value: officer.CollectingOfficerID }))
                }
            />
        </div>
    </Popover.Content>
</Popover.Root>
