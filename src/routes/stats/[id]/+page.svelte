<svelte:head>
	<title>Player Stats</title>
</svelte:head>
<script context='module'>
	
</script>
<script>
    /** @type {import('./$types').PageData} */
    export let data
    import { fade } from 'svelte/transition'
    let goals;
    let assists;
    let saves;
    let points;
    let shooting;
    let winning;
    let league;

    $: {
        goals = data.goals
        assists = data.assists
        saves = data.saves
        points = data.points
        shooting = data.shooting
        winning = data.winning
        league = data.league
    }
</script>
<div in:fade="{{ duration:1000, ease:'circ' }}">
    <h1 class='text-4xl font-bold text-center pt-4'>{league} Stats</h1>
    <div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
        {#if goals}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Goal Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Goals Per Game
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each goals as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[8]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[8]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[8]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[8]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/goals'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
        {#if assists}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Assist Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Assists Per Game
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each assists as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[9]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[9]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[9]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[9]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/assists'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
        {#if saves}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Saves Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Save Per Game
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each saves as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[10]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[10]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[10]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[10]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/saves'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
        {#if points}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Points Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Points Per Game
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each points as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[14]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[14]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[14]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[14]}</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>0.00</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/points'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
        {#if shooting}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Shooting Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Shooting %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each shooting as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[11]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[11]}%</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>100%</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[11]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[11]}%</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>100%</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/shooting'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
        {#if winning}
        <div class="flex flex-col">
            <h1 class='font-bold text-3xl p-4 text-center'>{league} League Wins Leaders</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-600">
                      <tr>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Name
                        </th>
                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">
                            Winning %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {#each winning as player}
                            {#if player[player.length-1]%2 == 0}
                                <tr class=" bg-gray-100 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[12]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[12]}%</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>100%</td>
                                    {/if}
                                </tr>
                            {:else}
                                <tr class=" bg-gray-300 border-b">
                                    <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[0]}</td>
                                    {#if player[12]}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[12]}%</td>
                                    {:else}
                                        <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>100%</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                        <tr>
                            <td colspan="2" class='bg-gray-100 border-b'>
                                <a class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold' href='/advstats/{league}/winning'>ALL Players</a>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/if}
    </div>
    
</div>
