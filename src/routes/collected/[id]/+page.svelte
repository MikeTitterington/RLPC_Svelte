<svelte:head>
	<title>Team Stats</title>
</svelte:head>
<script context='module'>
    import { fade } from 'svelte/transition'
    function sortTable(n) {
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
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
            }
        }
    }
</script>
<script>
    /** @type {import('./$types').PageData} */
    export let data
    let stats = data.stats
    let League = data.League
    $: {
        stats = data.stats
        League = data.League
    }
</script>

<div class="flex flex-col" in:fade="{{ duration:1000, ease:'circ' }}">
    <h1 class='font-bold text-3xl p-4 text-center'>{League} League Teams Leaderboard</h1>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-center" id="myTable2">
            <thead class="border-b bg-gray-600">
              <tr>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTableN(0)}>Name</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(1)}>Record (Div Record)</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(2)}>FFs</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(3)}>Goals | PG</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(4)}>Assists | PG</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(5)}>Saves | PG</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(6)}>Shots | PG</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(7)}>%Goals Assisted</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(8)}>Shooting %</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(9)}>GA | PG</th>
                <th scope="col"  class="text-xl font-bold text-white px-6 py-4" on:click={() => sortTable(10)}>Shots Agnst  | PG</th>
              </tr>
            </thead>
            <tbody>
                {#each stats as team}
                    <tr class=" bg-gray-100 border-b">
                        <td class='text-gray-900 px-6 py-4 whitespace-nowrap text-xl font-bold'><a href='/team/{team[0]}'>{team[0]}</a></td>
                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[1]}</td>
                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                        {#if team[5] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[5].split(' | ')[1]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                        {#if team[6] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[6].split(' | ')[1]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                        {#if team[7] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[7].split(' | ')[1]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                        {#if team[8] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[8].split(' | ')[1]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                        {#if team[9] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[9]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0%</td>
                        {/if}
                        {#if team[10] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[10]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>100%</td>
                        {/if}
                        {#if team[11] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[11].split(' | ')[1]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                        {#if team[12] && team[12] != '#VALUE!' && team[12].includes('|')}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[12].split(' | ')[1]}</td>
                        {:else if team[12] && team[12] != '#VALUE!'}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[12]}</td>
                        {:else}
                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0 | 0.00</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

