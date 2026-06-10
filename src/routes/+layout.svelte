<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();
</script>

<!-- For dark mode -->
<ModeWatcher />
<Toaster position="bottom-center" richColors />

{@render children()}
