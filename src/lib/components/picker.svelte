<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js"

    let { title, options = [], value = $bindable() } = $props();
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger>
    {value}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
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
