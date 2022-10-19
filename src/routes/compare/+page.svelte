<script>
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
    let schedule = [];
	let searchTerm = "";
	let filteredPlayers = [];
	let searchTerm2 = "";
	let filteredPlayers2 = [];
    let fullSchedule = data.fullSchedule
    let teams = data.teams
    let schedulePlayerH = data.schedulePlayerH
    let scheduleGoalsH = data.scheduleGoalsH
    let scheduleAssistsH = data.scheduleAssistsH
    let scheduleSavesH = data.scheduleSavesH
    let scheduleShootingH = data.scheduleShootingH
    let scheduleWinningH = data.scheduleWinningH

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "desc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (parseFloat(x.innerHTML.replace("%", "")) > parseFloat(y.innerHTML.replace("%", ""))) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            } else if (dir == "desc") {
                if (parseFloat(x.innerHTML.replace("%", "")) < parseFloat(y.innerHTML.replace("%", ""))) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
                } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    
    function sortTableN(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            }
            }
            if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
            } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "desc") {
                dir = "asc";
                switching = true;
            }
            }
        }
    }

    async function filterTeams(value) {
		if(value) {
            filteredPlayers = fullSchedule.filter(team => team[0].toLowerCase() == value.toLowerCase());
            return fullSchedule.filter(team => team[0].toLowerCase() == value.toLowerCase());
		}else {
            filteredPlayers = [... schedule];
			return [... schedule];
		}
		
	}
    async function filterTeams2(value) {
		if(value) {
            filteredPlayers2 = fullSchedule.filter(team => team[0].toLowerCase() == value.toLowerCase());
            return fullSchedule.filter(team => team[0].toLowerCase() == value.toLowerCase());
		}else {
            filteredPlayers2 = [... schedule];
			return [... schedule];
		}
		
	}
    
	$: filterTeams(searchTerm);
	$: filterTeams2(searchTerm2);
</script>
<svelte:head>
	<title>Compare Teams</title>
</svelte:head>
<div transition:fade="{{ duration:1000, ease:'circ' }}">
	<div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-2'>
        <select bind:value={searchTerm} class="my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200 text-center bg-gray-100 text-gray-800">
            {#each teams as team}
                <option value="{team[5]}">{team[5]}</option>
            {/each}
        </select>
        <select bind:value={searchTerm2} class="my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200 text-center bg-gray-100 text-gray-800">
            {#each teams as team}
                <option value="{team[5]}">{team[5]}</option>
            {/each}
        </select>
	</div>
    
    <div class='py-4 w-full grid gap-4 grid-cols-1 p-6 text-center rounded-md shadow-sm flex flex-col items-center'>
        {#if filteredPlayers.length > 1}
            <div class="flex flex-col">
                <div class="sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center" id='myTable2'>
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTableN(0)}>Team</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTableN(1)}>Player</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(2)}>Goals</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(3)}>Assists</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(4)}>Saves</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(5)}>Shooting %</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(5)}>Winning %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each filteredPlayers as player}
                                        <tr>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[0]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[schedulePlayerH]}</td>
                                            {#if player[scheduleGoalsH]}
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleGoalsH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleAssistsH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleSavesH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleShootingH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleWinningH]}</td>
                                            {:else}
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00%</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00%</td>
                                            {/if}
                                            
                                        </tr>
                                    {/each}
                                    {#each filteredPlayers2 as player}
                                        <tr>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[0]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[schedulePlayerH]}</td>
                                            {#if player[scheduleGoalsH]}
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleGoalsH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleAssistsH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleSavesH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleShootingH]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>{player[scheduleWinningH]}</td>
                                            {:else}
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00%</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap bg-gray-300'>0.00%</td>
                                            {/if}
                                        </tr>
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
