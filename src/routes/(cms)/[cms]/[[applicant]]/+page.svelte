<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js"
    import { type PageProps } from "./$types"
    import { formatDate } from "$lib/utils/date"
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js"
    import * as Dialog from "$lib/components/ui/dialog/index.js"
    import LoadingIcon from "@lucide/svelte/icons/loader-circle"
    import SummaryField from "$lib/components/summary-field.svelte"

    let { data }: PageProps = $props();

    let selectedApplicant: Record<string, string> | null = $state(null);
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
                <div>
                    {#if isLoading && !selectedApplicant}
                        <div class="flex flex-col items-center py-[15em] gap-3">
                            <LoadingIcon class="animate-spin" />
                            <div>
                                Loading Applicant...
                            </div>
                        </div>
                    {:else}
                        <div class="flex flex-col">
                            <h1 class="font-medium font-serif text-3xl">{selectedApplicant?.ApplicantName}</h1>
                            <h2 class="font-medium text-xl text-muted-foreground">{selectedApplicant?.Sex == "M" ? "Male" : "Female"}</h2>
                            <h2 class="font-medium text-[1.15em] text-muted-foreground">{selectedApplicant?.Age} years old</h2>


    <!--
    ApplicantNo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    IsFirstTime BOOLEAN NOT NULL,
    LastExaminationTaken DATE,
    CSCRegionalOffice VARCHAR(10),
    ExaminationDate DATE,
    Examinationplace VARCHAR(50),
    VerifiedAgainst VARCHAR(10),
    ApplicantPhotoURL VARCHAR(255) NOT NULL,
    ApplicantSignatureURL VARCHAR(255) NOT NULL,
    ApplicantName VARCHAR(100) NOT NULL,
    Age INT NOT NULL,
    Birthdate DATE NOT NULL,
    Sex CHAR(1) NOT NULL,
    Birthplace VARCHAR(50) NOT NULL,
    Citizenship VARCHAR(50) NOT NULL,
    MotherMaidenName VARCHAR(50) NOT NULL,
    PermanentMailingAddress VARCHAR(100) NOT NULL,
    CivilStatus VARCHAR(2) NOT NULL,
    IsPregnant BOOLEAN NOT NULL,
    IsSeniorCitizen BOOLEAN NOT NULL,
    PWD VARCHAR(50),
    MobileNumber VARCHAR(11) NOT NULL,
    Telephone VARCHAR(15),
    EmailAddress VARCHAR(50),
    EmploymentType VARCHAR(3),
    HighestEducLevel VARCHAR(50),
    Completion VARCHAR(2),
    GraduationDate DATE,
    HonorsReceived VARCHAR(20),
    NGHighestAttained VARCHAR(25),
    TitleOfDegree VARCHAR(50),
    Major VARCHAR(50),
    SchoolStartYear INT,
    SchoolEndYear INT,
    SchoolID INT,
-->

                            <div class="grid grid-cols-2 w-full pt-5 self-center gap-1">
                                <SummaryField name="Birthdate" value={formatDate(new Date(selectedApplicant?.Birthdate!))} />
                                <SummaryField name="Address" value={selectedApplicant?.PermanentMailingAddress} />
                                <SummaryField name="Mobile Number" value={selectedApplicant?.MobileNumber} />
                                <SummaryField name="Telephone" value={selectedApplicant?.Telephone} />
                                <SummaryField name="Email Address" value={selectedApplicant?.EmailAddress} />
                                <SummaryField name="Mother Maiden Name" value={selectedApplicant?.MotherMaidenName} />
                                <SummaryField name="PWD" value={selectedApplicant?.PWD} />
                            </div>
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
