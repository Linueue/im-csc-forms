<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js"
    import { Label } from "$lib/components/ui/label/index.js"

    let { title, name, options = [], value = $bindable() } = $props();
</script>

<Label for={title} class="pb-1 pt-1">{name}</Label>
<Select.Root type="single" name={title} bind:value={value.value}>
  <Select.Trigger>
    {(value.hasValue()) ? value.value : "<None Selected>"}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Item value={""} label={"<None Selected>"} disabled={true} />
      {#each options as option}
        <Select.Item
          value={option}
          label={option}
        >
          {option}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
