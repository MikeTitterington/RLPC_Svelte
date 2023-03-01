<svelte:head>
	<title>Team Stats</title>
</svelte:head>
<script>
    import { fade } from 'svelte/transition'
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data
    let article
    $: {
        article = data.article
    }
</script>

<div class="flex flex-col text-xl my-8" in:fade="{{ duration:1000, ease:'circ' }}">
    <SvelteMarkdown source={article} />
</div>

