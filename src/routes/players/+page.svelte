<script>
	import Player from '../../components/Player.svelte';
	import { fade } from 'svelte/transition'
 	 /** @type {import('./$types').PageData} */
  	export let data;
	let searchTerm = data.searchTerm;
    let teamsIndy = data.teamsIndy;
    let filteredPlayers = data.filteredPlayers;
    let playerNameH = data.playerNameH;
    let playerRegionH = data.playerRegionH;
    let playerPlatformH = data.playerPlatformH;
    let playerMMRH = data.playerMMRH;
    let playerIDH = data.playerIDH;
	function filterTeams(value) {
		if(value) {
			return teamsIndy.filter(team => team[playerNameH].toLowerCase().includes(value.toLowerCase()));
		}else {
			return [... teamsIndy];
		}
		
	}

	$: filteredPlayers = filterTeams(searchTerm);
</script>
<svelte:head>
	<title>Players</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">

	<input class='my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200' type='text' bind:value={searchTerm} placeholder='Search Players' >

	<div class='py-4 grid gap-4 md:grid-cols-6 grid-cols-2'>
		{#each filteredPlayers as player}
			<Player name={player[playerNameH]}, region={player[playerRegionH]}, platform={player[playerPlatformH]}, mmr={player[playerMMRH]}, id={player[playerIDH]}/>
		{/each}
	</div>
	
</div>