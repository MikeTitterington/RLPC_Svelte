<script>
	import Article from '../../components/Article.svelte';
	import { fade } from 'svelte/transition'
 	 /** @type {import('./$types').PageData} */
  	export let data;
	let articles
	$: articles = data.articles
</script>
<svelte:head>
	<title>Players</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">

	<div class='py-4 grid gap-4 md:grid-cols-6 grid-cols-2'>
		{#each articles as article}
			<Article name={article[1]} id={article[0]} date={article[2]}/>
		{/each}
	</div>
	
</div>