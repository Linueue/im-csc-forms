<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import SidebarItem from "./sidebar-item.svelte";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let { content } = $props();
</script>

{#if content.collapsible}
<Collapsible.Root class="group/collapsible">
    <Sidebar.MenuSubItem>
        <Collapsible.Trigger>
            {#snippet child({ props })}
                <Sidebar.MenuSubButton {...props}>
                    {#snippet child({ props: props2 })}
                        <a href={content.href} {...props2}>
                            <content.icon />
                            <span>{content.name}</span>
                        <ChevronRightIcon class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </a>
                    {/snippet}
                </Sidebar.MenuSubButton>
            {/snippet}
        </Collapsible.Trigger>
        <Collapsible.Content>
            {#if content.subcontents}
                <Sidebar.MenuSub>
                    {#each content.subcontents as subcontent}
                        <SidebarItem content={subcontent} />
                    {/each}
                </Sidebar.MenuSub>
            {/if}
        </Collapsible.Content>
    </Sidebar.MenuSubItem>
</Collapsible.Root>
{:else}
<Sidebar.MenuSubItem>
    <Sidebar.MenuSubButton>
        {#snippet child({ props })}
            <a href={content.href} {...props}>
                <content.icon />
                <span>{content.name}</span>
            </a>
        {/snippet}
    </Sidebar.MenuSubButton>
    {#if content.subcontents}
        <Sidebar.MenuSub>
            {#each content.subcontents as subcontent}
                <SidebarItem content={subcontent} />
            {/each}
        </Sidebar.MenuSub>
    {/if}
</Sidebar.MenuSubItem>
{/if}
