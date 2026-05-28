<script lang="ts">
	import '../app.css';
    import {goto} from "$app/navigation"
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { IsMobile } from "$lib/hooks/is-mobile.svelte";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import Logo from "$lib/assets/logo.svelte"

    const isMobile = new IsMobile();

	let { children } = $props();
</script>

<!-- For dark mode -->
<ModeWatcher />

<div class="flex flex-col min-h-screen">
<header class="sticky flex flex-row justify-between top-0 z-50 bg-background">
    <div class="p-[0.5em]">
        <a href="/">
            <Logo width={"64"} height={"32"} />
        </a>
    </div>

    <div class="flex flex-row justify-end">
        <NavigationMenu.Root viewport={isMobile.current} class="w-full">
            <NavigationMenu.List class="flex flex-row items-center justify-between gap-1 p-[0.5em] w-full">
                <NavigationMenu.Item>
                    <NavigationMenu.Link onSelect={() => goto("/application-form")} class={`${buttonVariants({ variant: "default", size: "default" })} px-[1em] bg-primary`}>
                        Apply
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link class="px-[1em]">About</NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <Button onclick={toggleMode} variant="outline" size="icon">
                        <SunIcon class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
                        <MoonIcon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
                    </Button>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    </div>
</header>

<main class="flex-1">
{@render children()}
</main>

<footer class="bg-background">
    <div class="w-full h-full py-1 rounded-md flex flex-row justify-center items-center">
        <p class="text-sm text-muted-foreground">For Educational Purposes Only</p>
        <Separator orientation={"vertical"} class="py-2.5 px-[0.05em] rounded-s mx-2" />
        <a class="text-sm text-muted-foreground" href="/privacy-policy"><u>Privacy Policy</u></a>
    </div>
</footer>
</div>
