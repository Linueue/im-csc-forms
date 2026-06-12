<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import Logo from "$lib/assets/logo.svelte"

    const navMenus = [
        {
            name: "Applicants",
            contents: [
                {
                    name: "Pending",
                    href: "/cms/pending",
                },
                {
                    name: "Reviewed",
                    href: "/cms/reviewed",
                },
                {
                    name: "Officers",
                    href: "/cms/officers",
                },
            ],
        },
        {
            name: "Reports",
            contents: [
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
                                            <span>{content.name}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
        {/each}
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
