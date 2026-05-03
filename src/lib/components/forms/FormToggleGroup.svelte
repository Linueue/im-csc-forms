<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js"
    import RequiredField from "$lib/components/required-field.svelte"

    let { name, options = [], errorMessage = "Invalid!", value = $bindable() } = $props();
</script>

<Label for="field" class="pb-1">{name}</Label>
<ToggleGroup.Root bind:value={value.value} onValueChange={() => value.validateThenSet() } class="w-full shadow-mini flex items-center gap-x-0.5 py-0" variant="outline" type="single">
    {#each options as option}
        <ToggleGroup.Item value={option.value} class="border-2 border-l-2 data-[state=on]:border-primary flex-1 py-[2em] group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-2 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l-2">
            {option.label}
        </ToggleGroup.Item>
    {/each}
</ToggleGroup.Root>
<RequiredField validState={value.validState} errorMessage={errorMessage} />
