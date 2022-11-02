<script context='module'>

</script>
<script>
    import { fade } from 'svelte/transition'
 	 /** @type {import('./$types').PageData} */
  	export let data;
    let fullSchedule = data.fullSchedule
    let scheduleDateH = data.scheduleDateH
    let scheduleWinnerH = data.scheduleWinnerH
    let scheduleScoreH = data.scheduleScoreH
    let teams = data.teams
    let schedule = [];
	let searchTerm = "";
	let filteredTeams = [];
    async function filterTeams(value) {
		if(value) {
            filteredTeams = fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase() || team[3].toLowerCase() == value.toLowerCase());
            let i = 1
            return fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase() || team[3].toLowerCase() == value.toLowerCase()).forEach(element => {
                if (element.length == 6){
                    element.push("No Results")
                    element.push("0 - 0")
                    element.push("N")
                    element.push("N")
                }
                if(i%2==0){
                    element.push("bg-gray-100")
                }else{
                    element.push("bg-gray-300")
                }
                i = i+1
            });
		}else {
            filteredTeams = [... schedule];
			return [... schedule];
		}
		
	}
    
	$: filterTeams(searchTerm);
</script>
<svelte:head>
	<title>Schedules</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">
    <select bind:value={searchTerm} class="my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200 text-center bg-gray-100 text-gray-800">
        {#each teams as team}
            <option value="{team[5]}">{team[5]}</option>
        {/each}
    </select>
    <div class='py-4 w-full grid gap-4 grid-cols-1 p-6 text-center rounded-md shadow-sm flex flex-col items-center overflow-x-auto'>
        {#if filteredTeams.length > 1}
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Date</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 1</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Score</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 2</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each filteredTeams as game}
                                        {#if game[3] == searchTerm.split('-')[0]}
                                            <tr class="{game[game.length-1]} border-b">
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleDateH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[3]}</td>
                                                {#if game[scheduleScoreH]}
                                                    {#if game[scheduleWinnerH] == searchTerm.split('-')[0]}
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleScoreH]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[5]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleWinnerH]}</td>
                                                    {:else}
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleScoreH].split('').reverse().join('')}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[5]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleWinnerH]}</td>
                                                    {/if}
                                                {:else}
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0-0</td>
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[5]}</td>
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>No Results</td>
                                                {/if}
                                            </tr>
                                        {:else}
                                            <tr class="{game[game.length-1]} border-b">
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleDateH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[5]}</td>
                                                {#if game[scheduleScoreH]}
                                                    {#if game[scheduleWinnerH] == searchTerm.split('-')[0]}
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleScoreH]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[3]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleWinnerH]}</td>
                                                    {:else}
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleScoreH].split('').reverse().join('')}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[3]}</td>
                                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[scheduleWinnerH]}</td>
                                                    {/if}
                                                {:else}
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0-0</td>
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{game[3]}</td>
                                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>No Results</td>
                                                {/if}
                                            </tr>
                                        {/if}
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    
</div>
