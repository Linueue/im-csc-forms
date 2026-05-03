<script lang="ts">
    import Column from "$lib/components/column.svelte"
    import * as Alert from "$lib/components/ui/alert/index.js"
    import { Button } from "$lib/components/ui/button/index.js"
    import MessageSquareWarningIcon from "@lucide/svelte/icons/message-square-warning"
    import {goto} from "$app/navigation"
    import Logo from "$lib/assets/logo.svelte"

    function gotoApply()
    {
        goto("/application-form");
    }
</script>

<div class="flex flex-row content-container">
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
                            This website is not an official government website, and is only for University purposes. Any data that is collected shall only be for dummy data. 
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
