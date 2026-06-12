<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { type PageProps } from "./$types"
    import { formatDate } from "$lib/utils/date"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import SeparatorLabel from "$lib/components/forms/FormSeparatorLabel.svelte"
    import LoadingIcon from "@lucide/svelte/icons/loader-circle"
    import SummaryField from "$lib/components/summary-field.svelte"
    import PostDetails from "./PostDetails.svelte"
    import { completionLabel, civilStatus, employmentStatus, employmentType } from "$lib/utils/forms"

    let { data }: PageProps = $props();

    let selectedApplicant: Record<string, any> | null = $state(null);
    let isLoading = $state(false);

    async function openReview(applicant: string)
    {
        selectedApplicant = null;
        isLoading = true;

        const params = new URLSearchParams({
            applicantNo: applicant
        });

        const response = await fetch(`/api/getApplicantDetails?${params.toString()}`);

        const result: Record<string, any> = await response.json();
        selectedApplicant = result.applicant;
        selectedApplicant!.existingExaminations = result.existingExaminations;
        isLoading = false;
    }
</script>

<div class="text-xl font-medium">
    Pending Applications
</div>

<div class="px-2 my-3 w-full overflow-x-auto">
    <Table.Root>
        <Dialog.Root>
            <Table.Header>
                <Table.Row>
                    {#each data.fields as field}
                        <Table.Head class="max-w-[25em]">{field}</Table.Head>
                    {/each}
                    <Table.Head class="max-w-[25em] text-center">Action</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each data.applicants as applicant}
                    <Table.Row>
                        {#each data.fields as field}
                            <Table.Cell class="font-normal text-muted-foreground">
                                {#if ["Birthdate", "LastExaminationTaken", "ExaminationDate"].includes(field)}
                                    {formatDate(applicant[field])}
                                {:else}
                                    {applicant[field]}
                                {/if}
                            </Table.Cell>
                        {/each}
                        <Table.Cell class="font-normal text-muted-foreground flex align-center justify-center">
                            <Dialog.Trigger
                                type="button"
                                class={buttonVariants({ variant: "outline" })}
                                onclick={
                                    () => {
                                        openReview(applicant.ApplicantNo);
                                    }
                                }
                            >
                                Review
                            </Dialog.Trigger>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>

            <Dialog.Content class="sm:max-w-[80ch]">
                <Dialog.Header>
                    <Dialog.Title>Review</Dialog.Title>
                    <Dialog.Description>
                        Review, and Approve the Application
                    </Dialog.Description>
                </Dialog.Header>
                <div class="overflow-y-auto max-h-[75vh]">
                    {#if isLoading && !selectedApplicant}
                        <div class="flex flex-col items-center py-[15em] gap-3">
                            <LoadingIcon class="animate-spin" />
                            <div>
                                Loading Applicant...
                            </div>
                        </div>
                    {:else}
                        <div class="flex flex-col">
                            <div class="flex flex-row w-full flex-wrap">
                                <div class="flex flex-col mr-auto">
                                    <h1 class="font-medium font-serif text-3xl">{selectedApplicant?.ApplicantName}</h1>
                                    <h2 class="font-medium text-xl text-muted-foreground">{selectedApplicant?.Sex == "M" ? "Male" : "Female"}</h2>
                                    <h2 class="font-medium text-[1.15em] text-muted-foreground">{selectedApplicant?.Age} years old</h2>
                                </div>
                                <img
                                    class="w-32 rounded-md self-end"
                                    src={`/api/getPhoto?url=${encodeURIComponent(selectedApplicant?.ApplicantPhotoURL)}`}
                                    alt="Applicant"
                                />
                                <img
                                    class="w-32 rounded-md mx-auto col-span-full"
                                    src={`/api/getPhoto?url=${encodeURIComponent(selectedApplicant?.ApplicantSignatureURL)}`}
                                    alt="Signature"
                                />
                            </div>

                            <div class="grid grid-cols-2 w-full pt-5 px-2 self-center gap-1">
                                <SeparatorLabel name="Personal Details" grid_full={true} />
                                <SummaryField name="Birthdate" value={formatDate(new Date(selectedApplicant?.Birthdate))} />
                                <SummaryField name="Address" value={selectedApplicant?.PermanentMailingAddress} />
                                <SummaryField name="Mother Maiden Name" value={selectedApplicant?.MotherMaidenName} />
                                <SummaryField name="Civil Status" value={civilStatus(selectedApplicant?.CivilStatus)} />
                                <SummaryField name="Citizenship" value={selectedApplicant?.Citizenship} />
                                <SummaryField name="Mobile Number" value={selectedApplicant?.MobileNumber} />
                                <SummaryField name="Telephone" value={selectedApplicant?.Telephone} />
                                <SummaryField name="Email Address" value={selectedApplicant?.EmailAddress} />
                                <SummaryField name="PWD" value={selectedApplicant?.PWD} />

                                {#if selectedApplicant?.HighestEducLevel}
                                    <SeparatorLabel name="Education" grid_full={true} />

                                    <SummaryField name="Highest Education Level" value={selectedApplicant?.HighestEducLevel} />
                                    <SummaryField name="Completion" value={completionLabel(selectedApplicant?.Completion)} />
                                    <SummaryField name="GraduationDate" value={formatDate(new Date(selectedApplicant?.GraduationDate))} />
                                    <SummaryField name="School Name" value={selectedApplicant?.SchoolName} />
                                    <SummaryField name="School Address" value={selectedApplicant?.SchoolAddress} />
                                {/if}

                                <SeparatorLabel name="Employment" grid_full={true} />
                                <SummaryField name="Employment Type" value={employmentType(selectedApplicant?.EmploymentType)} />
                                {#if selectedApplicant?.employmentType !== "U"}
                                    <SummaryField name="Employment Position" value={selectedApplicant?.EmploymentPosition} />
                                    <SummaryField name="Employment Years" value={selectedApplicant?.EmploymentYears} />
                                    <SummaryField name="Employment Status" value={employmentStatus(selectedApplicant?.EmploymentStatus)} />
                                    <SummaryField name="Agency Name" value={selectedApplicant?.AgencyName} />
                                    <SummaryField name="Agency Address" value={selectedApplicant?.AgencyAddress} />
                                {/if}

                                <SeparatorLabel name="Existing Examinations" grid_full={true} />
                                {#if selectedApplicant?.existingExaminations}
                                    {#each selectedApplicant?.existingExaminations as existingExamination, idx}
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

                            <PostDetails collectingOfficers={data.collectingOfficers} processors={data.processors} />
                        </div>
                    {/if}
                </div>
                <Dialog.Footer>
                    <Dialog.Close
                        type="button"
                        class={buttonVariants({ variant: "outline" })}
                    >
                        Cancel
                    </Dialog.Close>
                    <Button type="submit">Save changes</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    </Table.Root>
</div>
