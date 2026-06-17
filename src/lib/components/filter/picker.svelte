<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js"

    let {
        name,
        icon = null,
        options = [],
        onChange = null,
        value = $bindable()
    } = $props();

    // To use the labels, rather than the values for displaying the current selection
    let currentSelected = $derived(options.find((f) => f.value == value)?.label ?? "<None Selected>");
</script>

<div class="flex flex-col items-stretch w-full">
    <div class="mb-1.25 flex flex-row">
        {name}

        <button class="text-destructive ml-auto text-xs" onclick={() => { value = null; onChange(); }}>
            Reset
        </button>
    </div>
    <Select.Root type="single" name={name} bind:value={value} onValueChange={onChange}>
        <Select.Trigger
            class="w-full bg-muted border-2"
        >
            <div class="flex w-full items-center gap-[0.5em]">
                {#if icon}
                    {@render icon()}
                {/if}
                <div class={value !== null ? "" : "text-muted-foreground"}>
                    {currentSelected}
                </div>
            </div>
        </Select.Trigger>
        <Select.Content class="max-h-75">
            <Select.Group>
            <Select.Item value={""} label={"<None Selected>"} disabled={true} />
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
