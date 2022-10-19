<script>
    import { fade } from 'svelte/transition'
    export let name;
    export let region;
    export let platform;
    export let mmr;
</script>
<div transition:fade="{{ duration:1000, ease:'circ' }}" class='p-6 bg-gray-400 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
    <h2 class='text-2xl font-bold'>{name.replace(/[^\w\s]/gi, '')}</h2>
    <h2>{region.replace(/[^\w\s]/gi, '')}</h2>
    <h2>{platform.replace(/[^\w\s]/gi, '')}</h2>
    <h2>{mmr.replace(/[^\w\s]/gi, '')}</h2>
</div>

<style>
    div {
        cursor: move;
		user-select: none;
		-webkit-user-select: none;
    }
</style>
