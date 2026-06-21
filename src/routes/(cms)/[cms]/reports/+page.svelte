<script lang="ts">
    const reports = [
        {
            name: "Applicant Demographics",
            subcontents: [
                {
                    name: "First Time Applicants",
                    href: "/cms/reports/report1",
                },
                {
                    name: "Married Female Applicants",
                    href: "/cms/reports/report2",
                },
                {
                    name: "Pasig Single Applicants",
                    href: "/cms/reports/report3",
                },
            ],
        },
        {
            name: "Applicant Statistics",
            subcontents: [
                {
                    name: "Employment Type Distributions",
                    href: "/cms/reports/report4",
                },
                {
                    name: "Average Age by Civil Status",
                    href: "/cms/reports/report5",
                },
                {
                    name: "CSC Regional Office Applicants",
                    href: "/cms/reports/report6",
                },
            ],
        },
        {
            name: "Education Reports",
            subcontents: [
                {
                    name: "Postgraduate Applicants",
                    href: "/cms/reports/report7",
                },
                {
                    name: "Private Sector University Graduates",
                    href: "/cms/reports/report8",
                },
            ],
        },
        {
            name: "Examination Reports",
            subcontents: [
                {
                    name: "Previous Examination Ratings",
                    href: "/cms/reports/report9",
                },
            ],
        },
        {
            name: "Payment Reports",
            subcontents: [
                {
                    name: "Collecting Officer Transactions",
                    href: "/cms/reports/report10",
                },
            ],
        },
    ];
</script>

<div class="px-2 my-3 overflow-x-auto">
    <div class="font-medium font-serif">
        Reports/Analytics
    </div>
    <div class="font-sm text-muted-foreground">
        Summarized, and filtered information generated from applicant records stored in the database.
    </div>

    <div class="flex flex-col w-full justify-center items-center">
        {#each reports as report}
            <div class="flex flex-col w-full">
                <div class="font-medium pt-5">
                    {report.name}
                </div>
                <div class="flex flex-col gap-1 py-1 border-l-2 pl-3 ml-2">
                    {#each report.subcontents as subcontent}
                        <a class="text-muted-foreground text-sm" href={subcontent.href}>
                            <u>{subcontent.name}</u>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
