<script lang="ts">
    import * as Popover from "$lib/components/ui/popover/index.js"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import Picker from "./picker.svelte"
    import { toast } from "svelte-sonner"
    import { invalidateAll } from "$app/navigation"

    let values = $state({
        action: null,
        sex: null,
    });

    async function get()
    {
        const response = await fetch("/api/filterReviewed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if(!response.ok)
            return;
        invalidateAll();
    }

    function onChange()
    {
    }
</script>

<Popover.Root>
    <Popover.Trigger class={buttonVariants({ variant: "outline" })}>
        Filter
    </Popover.Trigger>
    <Popover.Content class="w-80">
        <div class="flex flex-col gap-5">
            <Picker
                name="Action"
                bind:value={values.action}
                onChange={onChange}
                options={[
                    { label: "Approved", value: "A" },
                    { label: "Rejected", value: "D" },
                ]}
            />
            <Picker
                name="Sex"
                bind:value={values.sex}
                onChange={onChange}
                options={[
                    { label: "Male", value: "M" },
                    { label: "Female", value: "F" },
                ]}
            />
        </div>
    </Popover.Content>
</Popover.Root>
