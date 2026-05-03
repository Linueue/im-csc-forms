<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import Row from "$lib/components/row.svelte"

    let { name, errorMessage = "Invalid!", children } = $props();
</script>

<Label for="field" class="pb-1">{name}</Label>
<Row gap="5px">
    {@render children()}
</Row>
<RequiredField validState={ValidState.Valid} errorMessage={errorMessage} />
