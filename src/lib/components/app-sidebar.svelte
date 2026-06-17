<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
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
                            name: "Report 1",
                            href: "/cms/reports/report1",
                        },
                        {
                            name: "Report 2",
                            href: "/cms/reports/report2",
                        },
                        {
                            name: "Report 3",
                            href: "/cms/reports/report3",
                        },
                        {
                            name: "Report 4",
                            href: "/cms/reports/report4",
                        },
                        {
                            name: "Report 5",
                            href: "/cms/reports/report5",
                        },
                        {
                            name: "Report 6",
                            href: "/cms/reports/report6",
                        },
                        {
                            name: "Report 7",
                            href: "/cms/reports/report7",
                        },
                        {
                            name: "Report 8",
                            href: "/cms/reports/report8",
                        },
                        {
                            name: "Report 9",
                            href: "/cms/reports/report9",
                        },
                        {
                            name: "Report 10",
                            href: "/cms/reports/report10",
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
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton>
                                    {#snippet child({ props })}
                                        <a href={content.href} {...props}>
                                            <content.icon />
                                            <span>{content.name}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                                {#if content.subcontents}
                                    {#each content.subcontents as subcontent}
                                        <Sidebar.MenuSub>
                                            <Sidebar.MenuSubItem>
                                                <Sidebar.MenuSubButton>
                                                    {#snippet child({ props })}
                                                        <a href={subcontent.href} {...props}>
                                                            <span>{subcontent.name}</span>
                                                        </a>
                                                    {/snippet}
                                                </Sidebar.MenuSubButton>
                                            </Sidebar.MenuSubItem>
                                        </Sidebar.MenuSub>
                                    {/each}
                                {/if}
                            </Sidebar.MenuItem>
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
        {/each}
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
