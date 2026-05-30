<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"

    let { value = $bindable(), errorMessage = "Invalid!", type = "text", readonly = false, placeholder = "" } = $props();
</script>

<div class="flex flex-col items-stretch w-full">
    <Input readonly={readonly} type={type} placeholder={placeholder} class={`text-sm w-100% border-2 ${(value.validState != ValidState.Valid) ? "border-destructive" : ""}`} bind:value={value.value} id="field" onblur={() => value.validateThenSet() } />
    <RequiredField validState={value.validState} errorMessage={errorMessage} />
</div>
