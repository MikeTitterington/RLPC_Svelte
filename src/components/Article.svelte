<script>
    import { fade } from 'svelte/transition'
    export let name;
    export let id;
    export let date;
    
    let hovering = false;
    function enter() {
        hovering = true;
    }

    function leave() {
        hovering = false;
    }
</script>
<a  data-sveltekit-preload-data="hover" in:fade="{{ duration:1000, ease:'circ' }}"  on:mouseenter={enter} on:click={enter} on:mouseleave={leave} class='p-6 bg-gray-400 text-gray-800 text-center rounded-md shadow-md hover:shadow-lg flex flex-col items-center' href='/article/{id}'>
    <h2 class='text-2xl font-bold'>{name.replace(/[^\w\s]/gi, '')}</h2>
    <h3 class='text-xl'>{date}</h3>
</a>