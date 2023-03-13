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
	let showAll = false
	let showPlaying = false
	let minMMR = 0
	let maxMMR = 99999
	let selectTeam = ''
	function filterTeams(value) {
		let temp = [... teamsIndy]
		if (showPlaying){
			temp = temp.filter(team => team[31] == false);
		}
		if(value) {
			return teamsIndy.filter(team => team[playerNameH].toLowerCase().includes(value.toLowerCase()));
		}else {
			return [... teamsIndy];
		}
		
	}

	
	function filterMore(searchTerm, showPlaying, minMMR, maxMMR, selectTeam) {
		let temp = filterTeams(searchTerm)
		console.log(temp)
		if (showPlaying){
			temp = temp.filter(team => team[31] == "FALSE");
		}
		if (selectTeam != ''){
			if (selectTeam == 'Stale'){
				temp = temp.filter(team => team[26] == "TRUE");
			}else{
				temp = temp.filter(team => team[4] == selectTeam);
			}
		}
		temp = temp.filter(team => team[3] > minMMR).filter(team => team[3] < maxMMR);
		console.log(temp)
		return temp
	}
	console.log(showAll)
	// $: filteredPlayers = filterTeams(searchTerm);
	$: filteredPlayers = filterMore(searchTerm, showPlaying, minMMR, maxMMR, selectTeam);
</script>
<svelte:head>
	<title>Players</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">

	<input class='my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200' type='text' bind:value={searchTerm} placeholder='Search Players' >
	<label class='border-2 p-1'>
		<input type=checkbox bind:checked={showAll}>
		Show More
	</label>
	<label class='border-2 p-1'>
		<input type=checkbox bind:checked={showPlaying}>
		Playing Only
	</label>
	<label class='border-2 p-1'>
		Min MMR:
		<input class='rounded-md border-2 border-gray-200' type='text' bind:value={minMMR} placeholder='Min MMR' >
	</label>
	<label class='border-2 p-1'>
		Max MMR:
		<input class='rounded-md border-2 border-gray-200' type='text' bind:value={maxMMR} placeholder='Max MMR' >
	</label>
	<select bind:value={selectTeam} class="p-1 border-2">
        <option value="" disabled selected>Team Select</option>
		<option value="Ineligible">Ineligible</option>
		<option value="Stale">Tracker Broken</option>
		<option value="Bulls">Bulls</option>
		<option value="Lions">Lions</option>
		<option value="Panthers">Panthers</option>
		<option value="Sharks">Sharks</option>
		<option value="Cobras">Cobras</option>
		<option value="Ducks">Ducks</option>
		<option value="Eagles">Eagles</option>
		<option value="Hawks">Hawks</option>
		<option value="Ascension">Ascension</option>
		<option value="Flames">Flames</option>
		<option value="Storm">Storm</option>
		<option value="Whitecaps">Whitecaps</option>
		<option value="Kings">Kings</option>
		<option value="Lumberjacks">Lumberjacks</option>
		<option value="Pirates">Pirates</option>
		<option value="Spartans">Spartans</option>
		<option value="Bulldogs">Bulldogs</option>
		<option value="Tigers">Tigers</option>
		<option value="Bobcats">Bobcats</option>
		<option value="Dolphins">Dolphins</option>
		<option value="Vipers">Vipers</option>
		<option value="Geese">Geese</option>
		<option value="Osprey">Osprey</option>
		<option value="Owls">Owls</option>
		<option value="Entropy">Entropy</option>
		<option value="Heat">Heat</option>
		<option value="Thunder">Thunder</option>
		<option value="Tundra">Tundra</option>
		<option value="Knights">Knights</option>
		<option value="Pioneers">Pioneers</option>
		<option value="Raiders">Raiders</option>
		<option value="Trojans">Trojans</option>
		<option value="Mustangs">Mustangs</option>
		<option value="Lynx">Lynx</option>
		<option value="Jaguars">Jaguars</option>
		<option value="Barracuda">Barracuda</option>
		<option value="Pythons">Pythons</option>
		<option value="Herons">Herons</option>
		<option value="Falcons">Falcons</option>
		<option value="Vultures">Vultures</option>
		<option value="Pulsars">Pulsars</option>
		<option value="Inferno">Inferno</option>
		<option value="Lightning">Lightning</option>
		<option value="Avalanche">Avalanche</option>
		<option value="Dukes">Dukes</option>
		<option value="Voyagers">Voyagers</option>
		<option value="Bandits">Bandits</option>
		<option value="Warriors">Warriors</option>
		<option value="Stallions">Stallions</option>
		<option value="Cougars">Cougars</option>
		<option value="Leopards">Leopards</option>
		<option value="Gulls">Gulls</option>
		<option value="Rattlers">Rattlers</option>
		<option value="Pelicans">Pelicans</option>
		<option value="Ravens">Ravens</option>
		<option value="Cardinals">Cardinals</option>
		<option value="Genesis">Genesis</option>
		<option value="Embers">Embers</option>
		<option value="Tempest">Tempest</option>
		<option value="The Snowmen">The Snowmen</option>
		<option value="Jesters">Jesters</option>
		<option value="Miners">Miners</option>
		<option value="Wranglers">Wranglers</option>
		<option value="Titans">Titans</option>
		<option value="Admirals">Admirals</option>
		<option value="Dragons">Dragons</option>
		<option value="Beavers">Beavers</option>
		<option value="Cyclones">Cyclones</option>
		<option value="Grizzlies">Grizzlies</option>
		<option value="Centurions">Centurions</option>
		<option value="Yellow Jackets">Yellow Jackets</option>
		<option value="Galaxy">Galaxy</option>
		<option value="Sockeyes">Sockeyes</option>
		<option value="Wolves">Wolves</option>
		<option value="Wildcats">Wildcats</option>
		<option value="Rhinos">Rhinos</option>
		<option value="Scorpions">Scorpions</option>
		<option value="Thrashers">Thrashers</option>
		<option value="Toucans">Toucans</option>
		<option value="Wizards">Wizards</option>
    </select>
	<div class='py-4 grid gap-4 md:grid-cols-6 grid-cols-2'>
		{#if showAll}
			{#each filteredPlayers as player}
				<Player name={player[playerNameH]}, region={player[playerRegionH]}, platform={player[playerPlatformH]}, mmr={player[playerMMRH]}, id={player[playerIDH]}/>
			{/each}
		{:else}
			{#each filteredPlayers.slice(0, 50) as player}
				<Player name={player[playerNameH]}, region={player[playerRegionH]}, platform={player[playerPlatformH]}, mmr={player[playerMMRH]}, id={player[playerIDH]}/>
			{/each}
		{/if}
	</div>
	
</div>