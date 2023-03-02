<script>
	import Team from '../../components/Team.svelte';
	let allTeams = [];
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
	let searchTerm = "";
	let filteredTeams = [... allTeams];
	let aff1H, aff2H, aff3H, teamNameH
	$: {
		aff1H = data.aff1H
		aff2H = data.aff2H
		aff3H = data.aff3H
		teamNameH = data.teamNameH
		allTeams = data.allTeams
	}
	export let logoH = 0

	function filterTeams(value) {
		if(value) {
			let filter = allTeams.filter(team => team[teamNameH].toLowerCase().includes(value.toLowerCase()));
			filter = filter.concat(allTeams.filter(team => team[aff1H].toLowerCase().includes(value.toLowerCase())))
			filter = filter.concat(allTeams.filter(team => team[aff2H] && team[aff2H].toLowerCase().includes(value.toLowerCase())))
			filter = filter.concat(allTeams.filter(team => team[aff3H] && team[aff3H].toLowerCase().includes(value.toLowerCase())))
			return filter;
		}else {
			return [... allTeams];
		}
		
	}
	
    function preload(src) {
        return new Promise(function(resolve) {
            let img = new Image()
            img.onload = resolve
            img.src = src
        })
    }
	
	$: filteredTeams = filterTeams(searchTerm);
</script>

<svelte:head>
	<title>Teams</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">
	<input class='my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200' type='text' bind:value={searchTerm} placeholder='Search Teams' >

	<div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-2'>
		{#each filteredTeams as team}
			{#if team[aff2H]}
				<Team name={team[teamNameH]}, logo='logos/{team[logoH].split("\/")[team[logoH].split("\/").length-1]}', aaa={team[aff1H]}, aa={team[aff2H]}, a={team[aff3H]} />
			{:else}
				<Team name={team[teamNameH]}, logo='logos/{team[logoH].split("\/")[team[logoH].split("\/").length-1]}', aaa={team[aff1H]} />
			{/if}
		{/each}
	</div>
</div>


