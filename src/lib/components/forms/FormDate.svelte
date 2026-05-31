<script lang="ts">
    import { Calendar } from "$lib/components/ui/calendar/index.js"
    import * as Popover from "$lib/components/ui/popover/index.js"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
    import {
        getLocalTimeZone,
        today,
    } from "@internationalized/date";

    let { value = $bindable(), name, icon = null, errorMessage = "Invalid!" } = $props();

    let open = $state(false);
</script>

<div class="flex flex-col items-stretch">
    <Label for="${name}" class="mb-1.25">
        {name}
        {#if value.isOptional()}
            <div class="text-muted-foreground">(Optional)</div>
        {/if}
    </Label>
    <Popover.Root bind:open>
        <Popover.Trigger
            id="${name}"
            class={
            `${buttonVariants({variant: "outline", size: "default"})}
            w-full border-2 bg-muted justify-between font-normal
            ${(value.validState != ValidState.Valid) ? "border-destructive!" : ""}`
        }>
            <div class="flex w-full items-center gap-[0.5em]">
                {#if icon}
                    {@render icon()}
                {/if}
                {#if value.value}
                    {value.value.toDate(getLocalTimeZone()).toLocaleDateString()}
                {:else}
                    <div class="text-muted-foreground">Select date</div>
                {/if}
            </div>
            <ChevronDownIcon />
        </Popover.Trigger>
        <Popover.Content class="w-auto overflow-hidden p-0" align="start">
        <Calendar
        type="single"
            bind:value={value.value}
            captionLayout="dropdown"
            onValueChange={() => {
                open = false;
                value.validateThenSet();
            }}
            maxValue={today(getLocalTimeZone())}
        />
        </Popover.Content>
    </Popover.Root>
    <RequiredField validState={value.validState} errorMessage={errorMessage} />
</div>
