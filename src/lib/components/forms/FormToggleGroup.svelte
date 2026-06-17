<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import RequiredField from "$lib/components/required-field.svelte"

    let { name, options = [], errorMessage = "Invalid!", value = $bindable(), disabled = false } = $props();
</script>

<div class="flex flex-col items-stretch w-full">
    <Label for="${name}" class="mb-1.25">
        {name}
        {#if value.isOptional()}
            <div class="text-muted-foreground">(Optional)</div>
        {/if}
    </Label>
    <ToggleGroup.Root
        bind:value={value.value}
        disabled={disabled}
        onValueChange={() => value.validateThenSet() }
        class="w-full shadow-mini flex flex-wrap items-center gap-0.5 py-0"
        variant="outline"
        type="single"
    >
        {#each options as option}
            <ToggleGroup.Item
                value={option.value}
                class={
                    `${option.value === value.value ? "text-primary" : ""}
                    border-2 border-l-2 data-[state=on]:bg-primary/15 bg-input/30 hover:bg-muted flex-1 py-[1.5em]
                    hover:text-secondary data-[state=on]:hover:text-primary
                    min-w-[10em] sm:w-auto
                    ${(value.validState != ValidState.Valid) ? "pr-10 border-destructive" : ""}
                    group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-2
                    group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l-2`
                }>
                {option.label}
            </ToggleGroup.Item>
        {/each}
    </ToggleGroup.Root>
    <RequiredField validState={value.validState} errorMessage={errorMessage} />
</div>
