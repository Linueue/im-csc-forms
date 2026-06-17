<script lang="ts">
    import SummaryField from "./summary-field.svelte"
    import SeparatorLabel from "./forms/FormSeparatorLabel.svelte"
    import { formatDate } from "$lib/utils/date"
    import { completionLabel, civilStatus, employmentType, employmentStatus } from "$lib/utils/forms"

    let { applicant, children = null } = $props();
</script>

<div class="flex flex-row w-full flex-wrap justify-center">
    <div class="flex flex-col mr-auto max-w-[25em]">
        <h1 class="font-medium font-serif text-3xl">{applicant?.ApplicantName}</h1>
        <h2 class="font-medium text-xl text-muted-foreground">{applicant?.Sex == "M" ? "Male" : "Female"}</h2>
        <h2 class="font-medium text-[1.15em] text-muted-foreground">{applicant?.Age} years old</h2>
        {#if children}
            {@render children()}
        {/if}
    </div>
    <div class="self-end flex flex-row gap-2 p-1 items-center justify-center w-auto">
        <img
            class="w-32 rounded-md"
            src={`/api/getPhoto?url=${encodeURIComponent(applicant?.ApplicantPhotoURL)}`}
            alt="Applicant"
        />
        <img
            class="w-32 rounded-md"
            src={`/api/getPhoto?url=${encodeURIComponent(applicant?.ApplicantSignatureURL)}`}
            alt="Signature"
        />
    </div>
</div>

<div class="grid grid-cols-2 w-full pt-5 px-2 self-center gap-1">
    <SeparatorLabel name="Personal Details" grid_full={true} />
    <SummaryField name="Birthdate" value={formatDate(new Date(applicant?.Birthdate))} />
    <SummaryField name="Address" value={applicant?.PermanentMailingAddress} />
    <SummaryField name="Mother Maiden Name" value={applicant?.MotherMaidenName} />
    <SummaryField name="Civil Status" value={civilStatus(applicant?.CivilStatus)} />
    <SummaryField name="Citizenship" value={applicant?.Citizenship} />
    <SummaryField name="Mobile Number" value={applicant?.MobileNumber} />
    <SummaryField name="Telephone" value={applicant?.Telephone} />
    <SummaryField name="Email Address" value={applicant?.EmailAddress} />
    <SummaryField name="PWD" value={applicant?.PWD} />

    {#if applicant?.HighestEducLevel}
        <SeparatorLabel name="Education" grid_full={true} />

        <SummaryField name="Highest Education Level" value={applicant?.HighestEducLevel} />

        {#if applicant?.HighestEducLevel == "College"}
            <SummaryField name="Title of Degree" value={applicant?.TitleOfDegree} />
            <SummaryField name="Major" value={applicant?.Major} />
        {/if}

        <SummaryField name="Completion" value={completionLabel(applicant?.Completion)} />
        {#if applicant?.Completion == "G"}
            <SummaryField name="GraduationDate" value={formatDate(new Date(applicant?.GraduationDate))} />
        {:else}
            <SummaryField name="Highest Attained" value={applicant?.NGHighestAttained} />
        {/if}
        <SummaryField name="Honors Received" value={applicant?.HonorsReceived} />
        <SummaryField name="School Name" value={applicant?.SchoolName} />
        <SummaryField name="School Address" value={applicant?.SchoolAddress} />
    {/if}

    <SeparatorLabel name="Employment" grid_full={true} />
    <SummaryField name="Employment Type" value={employmentType(applicant?.EmploymentType)} />
    {#if applicant?.employmentType !== "U"}
        <SummaryField name="Employment Position" value={applicant?.EmploymentPosition} />
        <SummaryField name="Employment Years" value={applicant?.EmploymentYears} />
        <SummaryField name="Employment Status" value={employmentStatus(applicant?.EmploymentStatus)} />
        <SummaryField name="Agency Name" value={applicant?.AgencyName} />
        <SummaryField name="Agency Address" value={applicant?.AgencyAddress} />
    {/if}

    <SeparatorLabel name="Existing Examinations" grid_full={true} />
    {#if applicant?.existingExaminations.length !== 0}
        {#each applicant?.existingExaminations as existingExamination, idx}
            <div class="grid grid-cols-2 col-span-2 w-full px-3 self-center border-x-2 rounded-md">
                <SeparatorLabel name={`Entry ${idx + 1}`} grid_full={true} />
                <SummaryField name="Date" value={formatDate(new Date(existingExamination?.ExistingExaminationDate))} />
                <SummaryField name="Place" value={existingExamination?.ExistingExaminationPlace} />
                <SummaryField name="Rating" value={existingExamination?.ExistingExaminationRating} />
                <SummaryField name="Title" value={existingExamination?.ExistingExaminationTitle} />
            </div>
        {/each}
    {:else}
        <SummaryField name="-" value="-" />
    {/if}
</div>
