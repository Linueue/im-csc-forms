<script lang="ts">
  import type { PageData } from "./$types.js";
  import ApplicationForm from "./application-form.svelte";
  let { data }: { data: PageData } = $props();
</script>
 
<ApplicationForm {data} />
