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
                    name: "SQL 1",
                    href: "/cms/reports",
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
