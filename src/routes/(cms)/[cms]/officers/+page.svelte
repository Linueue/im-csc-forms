<script lang="ts">
    import { type PageProps } from "./$types"
    import CollectingOfficer from "./CollectingOfficer.svelte"
    import Processor from "./Processor.svelte"

    let { data }: PageProps = $props();
</script>

<div class="px-2 my-3 w-full overflow-x-auto space-y-5">
    <CollectingOfficer collectingOfficers={data.collectingOfficers} coFields={data.coFields} />
    <Processor processors={data.processors} pFields={data.pFields} />
</div>
