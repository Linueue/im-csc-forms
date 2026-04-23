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
</script>

<Label for={title} class="pb-1 pt-1">{name}</Label>
<Select.Root type="single" name={title} bind:value={value.value}>
  <Select.Trigger>
    {(value.hasValue()) ? value.value : "<None Selected>"}
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
