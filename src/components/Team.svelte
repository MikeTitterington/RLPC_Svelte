<script>
    import { fade } from 'svelte/transition'
    export let name;
    export let logo;
    let hovering = true;
    function enter() {
        hovering = false;
    }

    function leave() {
        hovering = true;
    }
</script>
<div transition:fade="{{ duration:1000, ease:'circ' }}" on:mouseenter={enter} on:click={enter} on:mouseleave={leave} class='m-auto h-full w-full p-6 bg-gray-100 text-gray-800 items-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
    <a href='/org/{name.replace(/[^\w\s]/gi, '')}'><img class='h-96 object-contain'src='{logo.replace(',', '')}' alt='{name.replace(/[^\w\s]/gi, '')} logo'/></a>
</div>

