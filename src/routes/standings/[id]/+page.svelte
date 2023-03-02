<svelte:head>
	<title>Standings</title>
</svelte:head>
<script>
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
    let 
        division1,
        division1Name,
        division2Name,
        division3Name,
        division4Name,
        division2,
        division3,
        division4,
        league
    $: division1 = data.division1
    $: division1Name = data.division1Name
    $: division2Name = data.division2Name
    $: division3Name = data.division3Name
    $: division4Name = data.division4Name
    $: division2 = data.division2
    $: division3 = data.division3
    $: division4 = data.division4
    $: league = data.league
    function preload(src) {
        return
        return new Promise(function(resolve) {
            let img = new Image()
            img.onload = resolve
            img.src = src
        })
    }
 	
</script>
{#key data}
<div in:fade="{{ duration:1000, ease:'circ' }}">
    <h1 class='text-4xl font-bold text-center pt-4'>{league} Standings</h1>
    {#if league == "Major"}
        {#if division1}
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Logo</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Record (Div Record)</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Forfeits</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">W/L Streak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each division1 as team}
                                        <tr class=" bg-gray-100 border-b">
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'><a href='/team/{team[1]}'><img src='../logos/{team[0].split('\/')[team[0].split('\/').length-1]}' class='m-auto object-contain w-40 h-40 items-center' alt='team logo'/></a></td>
                                            <td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/team/{team[1]}'>{team[1]}</a></td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[3]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[4]}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {:else}
        <div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
            {#if division1}
                <div class="flex flex-col">
                    <h1 class='font-bold text-3xl p-4 text-center'>{division1Name}</h1>
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-center">
                                    <thead class="border-b bg-gray-600">
                                        <tr>
                                            <th scope="col" class="text-xl font-bold text-white px-6 py-4">Logo</th>
                                            <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team</th>
                                            <th scope="col" class="text-xl font-bold text-white px-6 py-4">Record (Div Record)</th>
                                            <th scope="col" class="text-xl font-bold text-white px-6 py-4">Forfeits</th>
                                            <th scope="col" class="text-xl font-bold text-white px-6 py-4">W/L Streak</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each division1 as team}
                                            <tr class=" bg-gray-100 border-b">
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'><a href='/team/{team[1]}'><img src='../logos/{team[0].split('\/')[team[0].split('\/').length-1]}' class='m-auto object-contain w-40 h-40 items-center' alt='team logo'/></a></td>
                                                <td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/team/{team[1]}'>{team[1]}</a></td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[3]}</td>
                                                <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[4]}</td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            {#if division2}
            <div class="flex flex-col">
                <h1 class='font-bold text-3xl p-4 text-center'>{division2Name}</h1>
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Logo</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Record (Div Record)</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Forfeits</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">W/L Streak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each division2 as team}
                                        <tr class=" bg-gray-100 border-b">
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'><a href='/team/{team[1]}'><img src='../logos/{team[0].split('\/')[team[0].split('\/').length-1]}' class='m-auto object-contain w-40 h-40 items-center' alt='team logo'/></a></td>
                                            <td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/team/{team[1]}'>{team[1]}</a></td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[3]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[4]}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            {#if division3}
            <div class="flex flex-col">
                <h1 class='font-bold text-3xl p-4 text-center'>{division3Name}</h1>
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Logo</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Record (Div Record)</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Forfeits</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">W/L Streak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each division3 as team}
                                        <tr class=" bg-gray-100 border-b">
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'><a href='/team/{team[1]}'><img src='../logos/{team[0].split('\/')[team[0].split('\/').length-1]}' class='m-auto object-contain w-40 h-40 items-center' alt='team logo'/></a></td>
                                            <td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/team/{team[1]}'>{team[1]}</a></td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[3]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[4]}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            {#if division4}
            <div class="flex flex-col">
                <h1 class='font-bold text-3xl p-4 text-center'>{division4Name}</h1>
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-600">
                                    <tr>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Logo</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Team</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Record (Div Record)</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">Forfeits</th>
                                        <th scope="col" class="text-xl font-bold text-white px-6 py-4">W/L Streak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each division4 as team}
                                        <tr class=" bg-gray-100 border-b">
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'><a href='/team/{team[1]}'><img src='../logos/{team[0].split('\/')[team[0].split('\/').length-1]}' class='m-auto object-contain w-40 h-40 items-center' alt='team logo'/></a></td>
                                            <td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/team/{team[1]}'>{team[1]}</a></td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[2]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[3]}</td>
                                            <td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{team[4]}</td>
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
    {/if}
</div>
{/key}