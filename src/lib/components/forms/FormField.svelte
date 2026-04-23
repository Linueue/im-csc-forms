<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"

    let { value = $bindable(), name, errorMessage = "Invalid!", type = "text", readonly = false, placeholder = "" } = $props();
</script>

<Label for="field" class="pb-1 pt-1">{name}</Label>
<Input readonly={readonly} type={type} placeholder={placeholder} class={`w-100% border-2 ${(value.validState != ValidState.Valid) ? "border-destructive" : ""}`} bind:value={value.value} id="field" onblur={() => value.validateThenSet() } />
<RequiredField validState={value.validState} errorMessage={errorMessage} />
