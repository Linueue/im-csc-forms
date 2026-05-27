<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormPicker from "$lib/components/forms/FormPicker.svelte"
    import FormToggleGroup from "$lib/components/forms/FormToggleGroup.svelte"
    import FormImageUpload from "$lib/components/forms/FormImageUpload.svelte"
    import FormSignatureUpload from "$lib/components/forms/FormSignatureUpload.svelte"
    import FormField from "$lib/components/forms/FormField.svelte"
    import FormUnlabeledField from "$lib/components/forms/FormUnlabeledField.svelte"
    import FormMultiField from "$lib/components/forms/FormMultiField.svelte"
    import FormDate from "$lib/components/forms/FormDate.svelte"
    import CircleUserIcon from "@lucide/svelte/icons/circle-user"
    import { getAge } from "$lib/utils/date"
    import { REGIONAL_OFFICES } from "../selection-constants.svelte"
    import MailIcon from "@lucide/svelte/icons/mail"
    import { slide } from "svelte/transition"

    let { formSchemaData = $bindable() } = $props();

    $effect(() => {
        if(formSchemaData.applicantAge.value !== null)
        {
            formSchemaData.isSeniorCitizen.value = formSchemaData.applicantAge.value >= 60;
        }
    });
</script>

<Row gap="0.5em" class="pt-[0.5em]">
    <CircleUserIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Education</Label>
</Row>

<div class="divider">
    <!--
    // Page 3
    highestEducLevel: item.string(), // If this is none, then don't display all
    titleOfDegree: item.string(),
    completion: item.string().min(1).max(2),
    graduationDate: item.date().optional(true),
    honorsReceived: item.string().optional(true),
    NGHighestAttain: item.string().optional(true),-->

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
        <div transition:slide class="divider space-y-2.5 mt-2.5">
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
        <div transition:slide class="divider space-y-2.5 mt-2.5">
            <FormToggleGroup
                name={"Completion"}
                options={[
                    {value: "G", label: "Graduated"},
                    {value: "NO", label: "Not Graduated/On-going"},
                ]}
                bind:value={formSchemaData.completion}
            />
            {#if formSchemaData.completion.value == "NO"}
                <div transition:slide class="divider space-y-2.5">
                    <FormField
                        bind:value={formSchemaData.NGHighestAttain}
                        name={"Highest Attained"}
                        placeholder={"Grade 12/3rd Year"}
                    />
                </div>
            {:else if formSchemaData.completion.value == "G"}
                <div transition:slide class="divider space-y-2.5">
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
