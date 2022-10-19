<script>
    import { fade } from 'svelte/transition'
    export let name;
    export let region;
    export let platform;
    export let mmr;
    export let mmrOld;
    export let id;
    export let goals;
    export let assists;
    export let saves;
    export let contract;
    export let playerOp;
    export let orgOp;
    export let goalspg = "0.00";
    export let assistspg = "0.00";
    export let savespg = "0.00";
    if (contract && contract.includes("MAX")){
        contract = "MAX"
    }
    if (goalspg == ',' || !goalspg) {
        goalspg = "0.00"
    }
    if (assistspg == ',' || !assistspg) {
        assistspg = "0.00"
    }
    if (savespg == ',' || !savespg) {
        savespg = "0.00"
    }
    let hovering = false;
    function enter() {
        hovering = true;
    }

    function leave() {
        hovering = false;
    }
</script>
<a transition:fade="{{ duration:1000, ease:'circ' }}"  on:mouseenter={enter} on:click={enter} on:mouseleave={leave} class='p-6 bg-gray-400 text-gray-800 text-center rounded-md shadow-md hover:shadow-lg flex flex-col items-center' href='/player/{id.replace(",", "")}'>
    {#if hovering && goals}
        <h2 class='text-2xl font-bold'>{name.replace(/[^\w\s]/gi, '')}</h2>
        <h2>Goals: {goals.replace(",", "")} | {goalspg.replace(",", "")}</h2>
        <h2>Assists: {assists.replace(",", "")} | {assistspg.replace(",", "")}</h2>
        <h2>Saves: {saves.replace(",", "")} | {savespg.replace(",", "")}</h2>
    {:else}
        <h2 class='text-2xl font-bold'>{name.replace(/[^\w\s]/gi, '')}</h2>
        <h2>{region.replace(/[^\w\s]/gi, '')}</h2>
        <h2>{platform.replace(/[^\w\s]/gi, '')}</h2>
        {#if contract}
            <h2>{contract} PO: {playerOp} OO: {orgOp}</h2>
        {/if}
        {#if mmrOld}
            <h2>{mmr.replace(/[^\w\s]/gi, '')} ({mmrOld.replace(/[^\w\s]/gi, '')})</h2>
        {:else}
            <h2>{mmr.replace(/[^\w\s]/gi, '')}</h2>
        {/if}
    {/if}
</a>