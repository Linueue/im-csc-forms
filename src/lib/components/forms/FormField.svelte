<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import RequiredField from "$lib/components/required-field.svelte"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert"

    let { value = $bindable(), name, errorMessage = "Invalid!", type = "text", readonly = false, placeholder = "", icon = null } = $props();
</script>

<div class="flex flex-col items-stretch">
    <Label for="${name}">
        {name}
        {#if value.isOptional()}
            <div class="text-muted-foreground leading-none">(Optional)</div>
        {/if}
    </Label>
    <div class="relative flex items-center mt-1.25">
        {#if icon}
            <div class="absolute left-2">
                {@render icon()}
            </div>
        {/if}
        <Input
            readonly={readonly}
            type={type}
            placeholder={placeholder}
            class={`w-full border-2
                ${icon ? "pl-[3em]" : ""}
                ${(value.validState != ValidState.Valid) ? "pr-10 border-destructive" : ""}
            `}
            bind:value={value.value}
            id="${name}"
            onblur={() => value.validateThenSet() }
        />
        {#if value.validState != ValidState.Valid}
            <TriangleAlertIcon class="absolute right-2" color="var(--destructive)" />
        {/if}
    </div>
    <RequiredField validState={value.validState} errorMessage={errorMessage} />
</div>
