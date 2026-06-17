<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"
    import Row from "$lib/components/row.svelte"
    import FormSignatureUpload from "$lib/components/forms/FormSignatureUpload.svelte"
    import CheckIcon from "@lucide/svelte/icons/check-check"
    import SummaryField from "$lib/components/summary-field.svelte"
    import SeparatorLabel from "$lib/components/forms/FormSeparatorLabel.svelte"
    import { completionLabel, civilStatus, employmentStatus } from "$lib/utils/forms"
    import { formatDate } from "$lib/utils/date"

    let { formSchemaData = $bindable() } = $props();
</script>

<Row gap="0.5em" class="pt-[0.5em] pb-[0.5em]">
    <CheckIcon />
    <Label class="min-h-8 text-lg pb-[0.5em] font-serif">Final</Label>
</Row>

<div class="divider">
    <h2 class="font-medium text-lg">Make sure the details are correct</h2>

    <div class="text-sm mx-auto px-3 py-2 bg-muted rounded-md border-2 grid grid-cols-[1fr_1fr] sm:grid-cols-[18em_1fr] gap-x-5 space-y-2 w-full sm:w-[80%]">
        <SeparatorLabel name="Personal Details" grid_full={true} />
        <SummaryField
            name={"Name"}
            value={`${formSchemaData.applicantLastName.value}, ${formSchemaData.applicantFirstName.value} ${formSchemaData.applicantMiddleName.value}`}
        />
        <SummaryField
            name={"Sex"}
            value={formSchemaData.applicantSex.value == "M" ? "Male" : "Female"}
        />
        <SummaryField
            name={"Date of Birt"}
            value={formatDate(formSchemaData.applicantBirthdate.value)}
        />
        <SummaryField
            name={"Birthplace"}
            value={formSchemaData.applicantBirthplace.value}
        />
        <SummaryField
            name={"Age"}
            value={formSchemaData.applicantAge.value}
        />
        <SummaryField
            name={"Citizenship"}
            value={formSchemaData.applicantCitizenship.value}
        />
        <SummaryField
            name="Civil Status"
            value={civilStatus(formSchemaData.applicantCivilStatus.value)}
        />
        <SummaryField
            name="Has Photo"
            value={formSchemaData.applicantPhoto.value ? "Yes" : "No"}
        />
        <SummaryField
            name="Mother's Maiden Name"
            value={formSchemaData.applicantMotherMaidenName.value}
        />
        <SummaryField
            name="Address"
            value={formSchemaData.applicantAddress.value}
        />
        <SummaryField
            name="Mobile"
            value={formSchemaData.applicantMobile.value}
        />
        <SummaryField
            name="Telephone"
            value={formSchemaData.applicantTelephone.value || " - "}
        />
        <SummaryField
            name="Email"
            value={formSchemaData.applicantEmail.value}
        />

        <SeparatorLabel name="Eligibility & Demographics" grid_full={true} />
        <SummaryField
            name="Is First Time"
            value={formSchemaData.isFirstTime.value ? "Yes" : "No"}
        />
        {#if !formSchemaData.isFirstTime.value}
            <SummaryField
                name="Last Examination Taken"
                value={formSchemaData.lastExaminationTaken.value}
            />
        {/if}
        <SummaryField
            name="PWD"
            value={formSchemaData.PWD.value}
        />
        <SummaryField
            name="Pregnant"
            value={formSchemaData.isPregnant.value ? "Yes" : "No"}
        />
        <SummaryField
            name="Senior Citizen"
            value={formSchemaData.isSeniorCitizen.value ? "Yes" : "No"}
        />
        {#each formSchemaData.existingExaminations.value as examinations, idx}
            <div class="pl-5 space-y-2 border-x-2 rounded-md col-span-full grid grid-cols-[8.5em_1fr] sm:grid-cols-[12em_1fr]">
                <p class="text-sm text-muted-foreground font-medium col-span-full">Existing Examination {idx + 1}</p>

                <SummaryField
                    name=" Title"
                    value={examinations.existingExaminationTitle.value}
                />
                <SummaryField
                    name=" Rating"
                    value={examinations.existingExaminationRating.value}
                />
                <SummaryField
                    name=" Date Taken"
                    value={formatDate(examinations.existingExaminationDate.value)}
                />
                <SummaryField
                    name=" Place Taken"
                    value={examinations.existingExaminationPlace.value}
                />
            </div>
        {/each}

        <SeparatorLabel name="Education" grid_full={true} />
        {#if formSchemaData.highestEducLevel.value}
            <SummaryField
                name="Highest Education Level"
                value={formSchemaData.highestEducLevel.value}
            />
            <SummaryField
                name="Degree Title"
                value={formSchemaData.titleOfDegree.value}
            />
            {#if formSchemaData.major.value}
                <SummaryField
                    name="Major"
                    value={formSchemaData.major.value}
                />
            {/if}
            <SummaryField
                name="Completion"
                value={completionLabel(formSchemaData.completion.value)}
            />
            {#if formSchemaData.completion.value == 'G'}
                <SummaryField
                    name="Graduation Date"
                    value={formatDate(formSchemaData.graduationDate.value)}
                />
            {:else}
                <SummaryField
                    name="Highest Attainment"
                    value={formSchemaData.NGHighestAttain.value}
                />
            {/if}
            <SummaryField
                name="Honors Received"
                value={formSchemaData.honorsReceived.value}
            />
            <SummaryField
                name="School Year"
                value={`${formSchemaData.schoolStartYear.value} - ${formSchemaData.schoolEndYear.value}`}
            />
            <SummaryField
                name="School Name"
                value={formSchemaData.schoolName.value}
            />
            <SummaryField
                name="School Address"
                value={formSchemaData.schoolAddress.value}
            />
        {:else}
            <SummaryField
                name=" - "
                value={" - "}
            />
        {/if}

        <SeparatorLabel name="Employment" grid_full={true} />
        <SummaryField
            name="Employment Type"
            value={formSchemaData.employmentType.value}
        />
        {#if formSchemaData.employmentType.value && formSchemaData.employmentType.value !== "U"}
            <SummaryField
                name="Employment Position"
                value={formSchemaData.employmentPosition.value}
            />
            <SummaryField
                name="Employment Years"
                value={formSchemaData.employmentYears.value}
            />
            <SummaryField
                name="Employment Status"
                value={employmentStatus(formSchemaData.employmentStatus.value)}
            />
            <SummaryField
                name="Agency Name"
                value={formSchemaData.agencyName.value}
            />
            <SummaryField
                name="Agency Address"
                value={formSchemaData.agencyAddress.value}
            />
        {:else}
            <SummaryField
                name=" - "
                value={" - "}
            />
        {/if}
    </div>

    <p class="px-5 font-light text-sm my-5">To continue your submission, please upload, or draw your signature from the provided space below. Your signature will serve as confirmation that the information, and materials you have submitted are not of your own data. By proceeeding with the submission process, you acknowledge that you have read, understood, and agreed to the terms written in our Privacy Policy, including how the information may be collected, stored, processed, and protected in accordance with applicable laws, and regulations.</p>

    <FormSignatureUpload
        bind:value={formSchemaData.signaturePhoto}
        name={"Signature"}
        title={"Upload your Signature Photo"}
        errorMessage={"Your file is over 1MB large!"}
    >
        {#snippet description()}
            - Black ink on white background
        {/snippet}
    </FormSignatureUpload>
</div>

<Separator class="mt-5" />

<style>
    .divider
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 5px;
        width: 100%;
    }
</style>
