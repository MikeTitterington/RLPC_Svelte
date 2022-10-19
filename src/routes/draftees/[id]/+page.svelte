<script>
	import {sheetsP4} from '../../../stores/store'
	import Player from '../../../components/Player.svelte';
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
	let searchTerm = "";
    let league = data.league
	let teamsIndy = data.teamsIndy
	let filteredPlayers = data.filteredPlayers
	let playerNameH = data.playerNameH
	let playerRegionH = data.playerRegionH
	let playerPlatformH = data.playerPlatformH
	let playerMMRH = data.playerMMRH
	let playerIDH = data.playerIDH

	$: {
		league = data.league
		teamsIndy = data.teamsIndy
		filteredPlayers = data.filteredPlayers
	}

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
	<title>Free Agents</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">

	<input class='my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200' type='text' bind:value={searchTerm} placeholder='Search Players' >

	<div class='py-4 grid gap-8 md:gap-x-32 gap-x-4 md:grid-cols-4 grid-cols-2'>
		{#each filteredPlayers as player}
			<Player name={player[playerNameH]}, region={player[playerRegionH]}, platform={player[playerPlatformH]}, mmr={player[playerMMRH]}, id={player[playerIDH]}/>
		{/each}
	</div>
	
</div>