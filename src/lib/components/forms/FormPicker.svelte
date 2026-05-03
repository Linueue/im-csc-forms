<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"

    let {
        title,
        name,
        errorMessage = "Invalid!",
        options = [],
        value = $bindable()
    } = $props();

    // To use the labels, rather than the values for displaying the current selection
    let currentSelected = $derived(options.find((f) => f.value == value.value)?.label ?? "<None Selected>");
</script>

<Label for={title} class="pb-1">{name}</Label>
<Select.Root type="single" name={title} bind:value={value.value}>
  <Select.Trigger class="bg-muted">
    {currentSelected}
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
<RequiredField validState={value.validState} errorMessage={errorMessage} />
