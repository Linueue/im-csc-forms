<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import SidebarItem from "./sidebar-item.svelte";
    import Logo from "$lib/assets/logo.svelte"
    import PendingIcon from "@lucide/svelte/icons/clipboard-clock"
    import ReviewedIcon from "@lucide/svelte/icons/clipboard-check"
    import OfficersIcon from "@lucide/svelte/icons/user-cog"
    import ReportsIcon from "@lucide/svelte/icons/clipboard-list"

    const navMenus = [
        {
            name: "Applicants",
            contents: [
                {
                    icon: PendingIcon,
                    name: "Pending",
                    href: "/cms/pending",
                },
                {
                    icon: ReviewedIcon,
                    name: "Reviewed",
                    href: "/cms/reviewed",
                },
                {
                    icon: OfficersIcon,
                    name: "Officers",
                    href: "/cms/officers",
                },
                {
                    icon: ReportsIcon,
                    name: "Reports",
                    href: "/cms/reports",
                    subcontents: [
                        {
                            name: "Demographics",
                            collapsible: true,
                            subcontents: [
                                {
                                    name: "First Time",
                                    href: "/cms/reports/report1",
                                },
                                {
                                    name: "Married Female",
                                    href: "/cms/reports/report2",
                                },
                                {
                                    name: "Pasig Single",
                                    href: "/cms/reports/report3",
                                },
                            ],
                        },
                        {
                            name: "Applicant Statistics",
                            collapsible: true,
                            subcontents: [
                                {
                                    name: "Distributions",
                                    href: "/cms/reports/report4",
                                },
                                {
                                    name: "Average Age",
                                    href: "/cms/reports/report5",
                                },
                                {
                                    name: "CSC Regional Office",
                                    href: "/cms/reports/report6",
                                },
                            ],
                        },
                        {
                            name: "Education Reports",
                            collapsible: true,
                            subcontents: [
                                {
                                    name: "Postgraduate",
                                    href: "/cms/reports/report7",
                                },
                                {
                                    name: "Private Sector",
                                    href: "/cms/reports/report8",
                                },
                            ],
                        },
                        {
                            name: "Examination Reports",
                            collapsible: true,
                            subcontents: [
                                {
                                    name: "Examination Ratings",
                                    href: "/cms/reports/report9",
                                },
                            ],
                        },
                        {
                            name: "Payment Records",
                            collapsible: true,
                            subcontents: [
                                {
                                    name: "Transactions",
                                    href: "/cms/reports/report10",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
        }
    ];
</script>

<Sidebar.Root collapsible="offcanvas">
    <Sidebar.Header>
        <div class="p-[0.25em]">
            <a href="/">
                <Logo width={"64"} height={"32"} />
            </a>
        </div>
    </Sidebar.Header>
    <Sidebar.Content>
        {#each navMenus as menu}
            <Sidebar.Group>
                <Sidebar.GroupLabel>{menu.name}</Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        {#each menu.contents as content}
                                <SidebarItem content={content} />
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
        {/each}
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
