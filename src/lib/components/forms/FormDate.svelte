<script lang="ts">
    import { Calendar } from "$lib/components/ui/calendar/index.js"
    import * as Popover from "$lib/components/ui/popover/index.js"
    import { Button } from "$lib/components/ui/button/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
    import {
        getLocalTimeZone,
        today,
    } from "@internationalized/date";

    let { value = $bindable(), name, errorMessage = "Invalid!" } = $props();

    let open = $state(false);
</script>

<Label for="field" class="pb-1">{name}</Label>
<Popover.Root bind:open>
    <Popover.Trigger id="date" class="w-48">
        <Button variant="outline" class={`w-48 border-2 bg-muted justify-between font-normal ${(value.validState != ValidState.Valid) ? "border-destructive" : ""}`}>
            {value.value != null ?
                value.value.toDate(getLocalTimeZone()).toLocaleDateString() :
                "Select date"
            }
            <ChevronDownIcon />
        </Button>
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
