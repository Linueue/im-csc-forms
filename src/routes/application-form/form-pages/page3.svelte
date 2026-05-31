<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import GraduationCapIcon from "@lucide/svelte/icons/graduation-cap"
    import { slide } from "svelte/transition"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        switch(formSchemaData.highestEducLevel.value as string | null)
        {
            case "":
            case "High School":
            case "Vocational":
                formSchemaData.titleOfDegree.value = null;
                formSchemaData.major.value = null;
                break;
        }
        switch(formSchemaData.completion.value as string | null)
        {
            case "G":
                formSchemaData.NGHighestAttain.value = null;
                break;
            case "NO":
                formSchemaData.graduationDate.value = null;
                break;
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em] pb-[0.5em]">
    <GraduationCapIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Education</Label>
</Row>

<div class="divider">
    <FormToggleGroup
        name={"Highest Education Level"}
        options={[
            {value: "High School", label: "High School"},
            {value: "Vocational", label: "Vocational"},
            {value: "College", label: "College"},
            {value: "Postgraduate", label: "Postgraduate"},
        ]}
        bind:value={formSchemaData.highestEducLevel}
    />
    {#if ["College", "Postgraduate"].includes(formSchemaData.highestEducLevel.value)}
        <div transition:slide class="divider space-y-5 mt-5">
            <FormField
                bind:value={formSchemaData.titleOfDegree}
                name={"Title of Degree"}
                placeholder={"Bachelor of Science in Business Adminstration"}
            />
            <FormField
                bind:value={formSchemaData.major}
                name={"Major"}
                placeholder={"Finance"}
            />
        </div>
    {/if}
    {#if formSchemaData.highestEducLevel.value}
        <div transition:slide class="divider space-y-5 mt-5">
            <FormToggleGroup
                name={"Completion"}
                options={[
                    {value: "G", label: "Graduated"},
                    {value: "NO", label: "Not Graduated/On-going"},
                ]}
                bind:value={formSchemaData.completion}
            />
            {#if formSchemaData.completion.value == "NO"}
                <div transition:slide class="divider space-y-5">
                    <FormField
                        bind:value={formSchemaData.NGHighestAttain}
                        name={"Highest Attained"}
                        placeholder={"Grade 12/3rd Year"}
                    />
                </div>
            {:else if formSchemaData.completion.value == "G"}
                <div transition:slide class="divider space-y-5">
                    <FormDate
                        bind:value={formSchemaData.graduationDate}
                        name={"Graduation Date"}
                    />
                </div>
            {/if}
            <FormField
                bind:value={formSchemaData.honorsReceived}
                name={"Honors Received"}
                placeholder={"Cum Laude/Honors"}
            />
            <FormMultiField name={"School Year"}>
                <FormUnlabeledField bind:value={formSchemaData.schoolStartYear} type={"number"} placeholder={"2021"} />
                <FormUnlabeledField bind:value={formSchemaData.schoolEndYear} type={"number"} placeholder={"2025"} />
            </FormMultiField>
            <FormField
                bind:value={formSchemaData.schoolName}
                name={"School Name"}
                placeholder={"Polytechnic University of the Philippines"}
            />
            <FormField
                bind:value={formSchemaData.schoolAddress}
                name={"School Address"}
                placeholder={"Sta. Mesa"}
            />
        </div>
    {/if}
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
