<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import { onDestroy } from "svelte"
    import ImageIcon from "@lucide/svelte/icons/image"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import { ValidState } from "$lib/components/ItemSchema.svelte"
    import RequiredField from "$lib/components/required-field.svelte"

    let {
        name,
        title,
        description,
        errorMessage = "Invalid!",
        value = $bindable()
    } = $props();

    let files = $state<FileList>();
    let previewSrc = $state<string>();
    let savedSrc = $state<string>();

    if(value.value)
        savedSrc = URL.createObjectURL(value.value);

    function saveChangesFn()
    {
        if(!files)
        {
            value.validateThenSet();
            return;
        }

        value.value = files[0];
        value.validateThenSet();
        if(savedSrc)
            URL.revokeObjectURL(savedSrc);
        savedSrc = previewSrc;
        previewSrc = "";
    }

    function handleFileUpload(e: Event)
    {
        const input = e.currentTarget as HTMLInputElement;
        if(!input.files)
            return;

        files = input.files;

        const url = URL.createObjectURL(files[0]);
        previewSrc = url;
    }

    onDestroy(() => {
        if(previewSrc)
            URL.revokeObjectURL(previewSrc);
        if(savedSrc)
            URL.revokeObjectURL(savedSrc);
    });
</script>

<div class="flex flex-col items-stretch">
    <Label for={name} class="mb-1.25">{name}</Label>
    <Dialog.Root>
        <Dialog.Trigger
            type="button"
            class={`
                flex flex-col items-center justify-center border-2 rounded-md bg-muted dark:bg-input/30 hover:bg-input/50 cursor-pointer
                ${(value.validState != ValidState.Valid) ? "border-destructive" : ""}
                ${(savedSrc ? "p-2" : "p-5")}
            `}
        >
            {#if savedSrc}
                <img src={savedSrc} alt="Preview" class="rounded-md max-w-[20em]" />
            {:else}
                <ImageIcon size={128} strokeWidth={0.25} color="var(--muted-foreground)" />
                <p class="text-muted-foreground">Upload Image</p>
            {/if}
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-106.25">
            <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description class="whitespace-pre-line">
                    {@render description()}
                </Dialog.Description>
            </Dialog.Header>
            {#if previewSrc}
                <div class="flex align-center justify-center border-2 rounded-md p-2">
                    <img src={previewSrc} alt="Preview" class="rounded-md" />
                </div>
            {:else}
                <div class="flex align-center justify-center border-2 rounded-md">
                    <ImageIcon size={128} strokeWidth={0.5} color="var(--muted)" />
                </div>
            {/if}
            <Input accept="image/png, image/jpeg, image/webp" type="file" onchange={handleFileUpload} />
            <Dialog.Footer>
                <Dialog.Close
                    type="button"
                    class={buttonVariants({ variant: "outline" })}
                >
                    Cancel
                </Dialog.Close>
                <Dialog.Close
                    type="button"
                    class={buttonVariants({ variant: "default" })}
                    onclick={saveChangesFn}
                >
                    Save Changes
                </Dialog.Close>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
    <RequiredField validState={value.validState} errorMessage={errorMessage} />
</div>
