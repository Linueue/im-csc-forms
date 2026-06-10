<script lang="ts">
	import '$lib/../app.css';
    import { Button } from "$lib/components/ui/button/index.js";
    import { toggleMode } from "mode-watcher";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
</script>

<Button onclick={toggleMode} variant="outline" size="icon">
    <SunIcon class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
    <MoonIcon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
</Button>
