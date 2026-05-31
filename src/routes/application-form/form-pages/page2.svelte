<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import { Button } from "$lib/components/ui/button/index.js"
    import Row from "$lib/components/row.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import ListCheckIcon from "@lucide/svelte/icons/list-check"
    import { slide } from "svelte/transition"
    import { existingExaminationSchema } from "../schema.svelte"
    import { mapForm } from "$lib/components/ItemSchema.svelte"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.applicantAge.value !== null)
            formSchemaData.isSeniorCitizen.value = formSchemaData.applicantAge.value >= 60;;
        if(formSchemaData.isFirstTime.value !== null)
            formSchemaData.lastExaminationTaken.value = null;
    });

    function addEntry()
    {
        const existingExaminationSchemaData = mapForm(existingExaminationSchema);
        formSchemaData.existingExaminations.value.push(existingExaminationSchemaData);
    }

    function removeEntry()
    {
        formSchemaData.existingExaminations.value.pop();
    }
</script>

<Row gap="0.5em" class="pt-[0.5em] pb-[0.5em]">
    <ListCheckIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Eligibility & Demographics</Label>
</Row>

<div class="divider space-y-5">
    <FormToggleGroup
        name={"Is this your first time taking the test?"}
        options={[
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ]}
        bind:value={formSchemaData.isFirstTime}
    />
    {#if formSchemaData.isFirstTime.value === false}
        <div transition:slide class="divider">
            <FormDate bind:value={formSchemaData.lastExaminationTaken} name={"Last Examination Taken"} />
        </div>
    {/if}
    <FormField
        bind:value={formSchemaData.PWD}
        name={"PWD"}
        placeholder={"Left handed"}
    />
    <FormToggleGroup
        name={"Are you pregnant?"}
        options={[
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ]}
        bind:value={formSchemaData.isPregnant}
    />
    <FormToggleGroup
        name={"Are you a senior citizen?"}
        disabled={true}
        options={[
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ]}
        bind:value={formSchemaData.isSeniorCitizen}
    />
    <div class="divider space-y-1.25">
    <p class="text-sm font-medium">Existing Examinations</p>
    <div class="divider space-y-5">
        {#each formSchemaData.existingExaminations.value as existingExamination, idx}
            <div transition:slide class="divider space-y-5">
                <div class="flex flex-row items-center gap-2">
                    <Separator class="flex-1 h-px bg-border" />
                    <p class="text-sm text-muted-foreground font-medium">Entry {idx + 1}</p>
                    <Separator class="flex-1 h-px bg-border" />
                </div>
                <FormField
                    bind:value={existingExamination.existingExaminationTitle}
                    name={"Title"}
                    placeholder={"CSC SubProfessional"}
                />
                <FormField
                    bind:value={existingExamination.existingExaminationRating}
                    type={"number"}
                    name={"Rating"}
                    placeholder={"95"}
                />
                <FormDate
                    bind:value={existingExamination.existingExaminationDate}
                    name={"Date Taken"}
                />
                <FormField
                    bind:value={existingExamination.existingExaminationPlace}
                    name={"Place Taken"}
                    placeholder={"Manila"}
                />
            </div>
        {/each}

        <div class="flex flex-row items-stretch gap-1">
            <Button class="flex-1" variant="outline" onclick={addEntry}>Add Entry</Button>
            <Button variant="destructive" class="flex-1" onclick={removeEntry}>Remove Entry</Button>
        </div>
        </div>
    </div>
</div>

<Separator class="mt-2" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
