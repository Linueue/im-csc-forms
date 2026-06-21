<script lang="ts">
    import Column from "$lib/components/column.svelte"
    import * as Alert from "$lib/components/ui/alert/index.js"
    import { Button } from "$lib/components/ui/button/index.js"
    import MessageSquareWarningIcon from "@lucide/svelte/icons/message-square-warning"
    import {goto} from "$app/navigation"
    import Logo from "$lib/assets/logo.svelte"
    import { browser } from "$app/environment"

    const sfx = browser ? new Audio("/vine-boom.mp3") : null;
    function gotoApply()
    {
        goto("/application-form");
        sfx?.play();
    }

    /*
    let app: HTMLDivElement | null = $state(null);
    function handleMM(event: MouseEvent)
    {
        const coords = { x: event.clientX, y: event.clientY };
        const size = { x: window.innerWidth, y: window.innerHeight };
        const half = { x: size.x / 2, y: size.y / 2 };
        const dir = { x: coords.x - half.x, y: coords.y - half.y };
        const normalized = { x: dir.x / size.x, y: dir.y / size.y };
        if(app === null)
            return;
        const factor = 0.3;
        let dirx = normalized.x * 2;
        let diry = normalized.y * 2;
        let x = -normalized.x * 100 * factor;
        let y = -normalized.y * 100 * factor;
        const rotFactor = 0.5;
        const yaw = Math.atan2(diry, 1) * 25 * rotFactor;
        const pitch = Math.atan2(-dirx, 1) * 25 * rotFactor;
        app.style = `transform: translate(${x}px, ${y}px) rotateX(${yaw}deg) rotateY(${pitch}deg)`;
    }
    */
</script>

<!-- <svelte:window on:mousemove={handleMM} /> -->

<div class="flex flex-row content-container perspsective-normal">
    <div class="background-static"></div>

    <Column>
        <!-- p = padding -->
        <div class="p-[1em] flex justify-center">
            <Logo width={"255px"} height={"100px"} />
        </div>
        <div class="title-container">
            <Column>
                <h1>CSC Professional</h1>
                <h1>Examination 2026</h1>
                <h1 class="subtitle">Applications are now open!</h1>

                <!-- w = width, rounded = border-radius, self-center = justify-self: center, m = margin -->
                <Button class="w-[8em] rounded-2xl self-center m-[1em]" onclick={gotoApply}>Apply</Button>
                
                <!-- pt = padding top -->
                <div class="pt-[5em] self-center w-full">
                    <Alert.Root class="shadow-md">
                        <MessageSquareWarningIcon color="var(--destructive)" />
                        <Alert.Title>Disclaimer</Alert.Title>
                        <Alert.Description>
                            This website is not an official government website,
                            and is only for University purposes. Any data collected
                            is entirely fictional, thus, only for database mock data.
                            For educational purposes only.
                        </Alert.Description>
                    </Alert.Root>
                </div>
            </Column>
        </div>
    </Column>
</div>

<style>
    .subtitle
    {
        padding-top: 3rem;
        font-size: 1.5rem;
        width: 100%;
        align-content: center;
        letter-spacing: 0px;
    }

    .title-container
    {
        margin: auto;
        padding: 1.5em 3em;
        max-width: 80ch;
    }

    h1
    {
        padding: 0em;
        margin: 0em;
        line-height: 1.1em;
        font-size: 4.2em;
        font-family: var(--font-serif);
        letter-spacing: 2px;
        text-align: center;
    }

    .background-static
    {
        position: fixed;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        z-index: -1;
        background: radial-gradient(circle at 50% 150%, var(--primary), transparent 50%);
    }

    @media (width <= 48rem)
    {
        .subtitle
        {
            font-size: 1.3rem;
        }

        h1
        {
            font-size: 3em;
        }

        .title-container
        {
            padding: 1.5em 3em;
        }

        .background-static
        {
            background: radial-gradient(circle at 50% 125%, var(--primary), transparent 50%);
        }
    }

    @media (width <= 40rem)
    {
        .subtitle
        {
            padding-top: 5rem;
            font-size: 1.2rem;
        }

        h1
        {
            font-size: 2em;
        }

        .title-container
        {
            padding: 1.5em 0.5em;
        }
    }

    .content-container
    {
        padding: 0.5em;
    }
</style>
