<script lang="ts">
	import '$lib/../app.css';
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { goto } from "$app/navigation";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { IsMobile } from "$lib/hooks/is-mobile.svelte";
    import DarkMode from "$lib/components/dark-mode.svelte";

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen"> 
    <Sidebar.Provider>
        <AppSidebar />

        <Sidebar.Inset>
            <header>
                <div class="flex flex-row items-center p-2">
                    <Sidebar.Trigger class="p-1" />
                    <div class="m-auto"></div>
                    <DarkMode />
                </div>
            </header>

            <div class="flex flex-col flex-1">
                <main class="@container/main flex flex-col flex-1 p-5">
                    {@render children()}
                </main>
            </div>
        </Sidebar.Inset>
    </Sidebar.Provider>

    <footer class="bg-background">
        <div class="w-full h-full py-1 rounded-md flex flex-row justify-center items-center">
            <p class="text-sm text-muted-foreground">For Educational Purposes Only</p>
            <Separator orientation={"vertical"} class="py-2.5 px-[0.05em] rounded-s mx-2" />
            <a class="text-sm text-muted-foreground" href="/privacy-policy"><u>Privacy Policy</u></a>
        </div>
    </footer>
</div>
