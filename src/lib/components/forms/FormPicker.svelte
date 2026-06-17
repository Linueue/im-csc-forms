<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import RequiredField from "$lib/components/required-field.svelte"

    let {
        name,
        errorMessage = "Invalid!",
        icon = null,
        options = [],
        value = $bindable(),
        allowDeselect = false,
    } = $props();

    // To use the labels, rather than the values for displaying the current selection
    let currentSelected = $derived(options.find((f) => f.value == value.value)?.label ?? "<None Selected>");
</script>

<div class="flex flex-col items-stretch w-full">
    <Label for="${name}" class="mb-1.25">
        {name}
        {#if value.isOptional()}
            <div class="text-muted-foreground">(Optional)</div>
        {/if}
    </Label>
    <Select.Root type="single" name={name} bind:value={value.value} allowDeselect={allowDeselect}>
        <Select.Trigger
            class={`w-full bg-muted border-2 ${(value.validState != ValidState.Valid) ? "border-destructive!" : ""}`}
        >
            <div class="flex w-full items-center gap-[0.5em]">
                {#if icon}
                    {@render icon()}
                {/if}
                <div class={value.value !== null ? "" : "text-muted-foreground"}>
                    {currentSelected}
                </div>
            </div>
        </Select.Trigger>
        <Select.Content class="max-h-75">
            <Select.Group>
                {#each options as option}
                    <Select.Item
                        value={option.value}
                        label={option.label}
                    >
                        {option.label}
                    </Select.Item>
                {/each}
            </Select.Group>
        </Select.Content>
    </Select.Root>
</div>
<RequiredField validState={value.validState} errorMessage={errorMessage} />
