<script>
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
    let schedule = [];
	let searchTerm = "";
	let filteredPlayers = [];
    let fullSchedule = data.fullSchedule
    let teams = []
    let count = 0;

    function getTeams(item) {
        if (!teams.includes(item[4])){
            teams.push(item[4])
        }
    }

    async function filterTeams(value) {
		if(value) {
            filteredPlayers = fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase());
            teams = []
            filteredPlayers.forEach(getTeams);
            console.log(teams)
            return fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase());
		}else {
            filteredPlayers = [... schedule];
			return [... schedule];
		}
		
	}
    
	$: filterTeams(searchTerm);
</script>
<svelte:head>
	<title>Mimic Sheet</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">
	<div class='py-4 grid gap-4'>
        <select bind:value={searchTerm} class="my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200 text-center bg-gray-100 text-gray-800">
            <option value="Major">Major</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="Independent">Independent</option>
        </select>
	</div>
    <div class='py-4 w-full grid gap-4 grid-cols-1 p-6 text-center rounded-md shadow-sm flex flex-col items-center'>
        {#if filteredPlayers.length > 1}
            <div class="flex flex-col">
                <div class="sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden grid gap-4 grid-cols-2">
                            <table class="min-w-50 text-center" id='myTable2'>
                                {#each teams.splice(0, teams.length/2) as teamTable}
                                    <thead class="border-b bg-gray-600">
                                        <th colspan="5" scope="col" class="text-xl font-bold text-white px-6 py-1 text-center"><img src='/logos/{teamTable}_Logo.png'></th>
                                    </thead>
                                    <tbody>
                                        {#each filteredPlayers.filter(team => team[4] == teamTable) as player}
                                            <tr class='py-4 px-6'>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[4]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[0]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[3]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[8]}</td>
                                                {#if player[10] == 'MAX'}
                                                    <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>Season {3-player[11]+1} of Max Contract</td>
                                                {:else}
                                                    <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>Season {player[10]-player[11]+1} of {player[10]}</td>
                                                {/if}
                                            </tr>
                                        {/each}
                                    </tbody>
                                {/each}
                            </table>
                            <table class="min-w-50 text-center" id='myTable2'>
                                {#each teams.splice(teams.length/2, teams.length) as teamTable}
                                    <thead class="border-b bg-gray-600">
                                        <th colspan="5" scope="col" class="text-xl font-bold text-white px-6 py-4 text-center"><img src='/logos/{teamTable}_Logo.png'></th>
                                    </thead>
                                    <tbody>
                                        {#each filteredPlayers.filter(team => team[4] == teamTable) as player}
                                            <tr class='py-4 px-6'>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[4]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[0]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[3]}</td>
                                                <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>{player[8]}</td>
                                                {#if player[10] == 'MAX'}
                                                    <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>Season {3-player[11]+1} of Max Contract</td>
                                                {:else}
                                                    <td class='text-lg text-gray-900 whitespace-nowrap bg-gray-300'>Season {player[10]-player[11]+1} of {player[10]}</td>
                                                {/if}
                                            </tr>
                                        {/each}
                                    </tbody>
                                {/each}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
<style>
    img {
        margin: auto;
        height: 50px;
        object-fit: contain;
    }
</style>
