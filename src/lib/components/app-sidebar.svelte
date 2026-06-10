<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import Logo from "$lib/assets/logo.svelte"
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Applicants</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a href="/cms/applicant" {...props}>
                                    <span>Applicant</span>
                                </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a href="/cms/reports" {...props}>
                                    Reports
                                </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
        <Sidebar.Group />
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
