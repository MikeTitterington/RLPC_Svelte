
<svelte:head>
	<title>Full Stats</title>
</svelte:head>
<script>
    /** @type {import('./$types').PageData} */
    export let data
    let statsAdv = data.statsAdv
    let stat = data.stat
    let statName = data.statName
    let statTemp = data.statTemp
    let League = data.League
    import { fade } from 'svelte/transition'
</script>
<div transition:fade="{{ duration:1000, ease:'circ' }}">
    <div class='dark:bg-gray-600 p-2 w-full mt-4'>
        <h1 class='text-4xl font-bold text-center pt-4'>{League} League {statName} Leaderboard</h1>
        <div class='py-4 grid gap-4 md:grid-cols-1 grid-cols-1 items-center text-center w-full'>
            {#if statsAdv}
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Name</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">{statName}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each statsAdv as player}
                                        <tr class=" bg-gray-100 border-b">
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap font-bold'>{player[0]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{player[stat]}</td>
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
    
</div>
