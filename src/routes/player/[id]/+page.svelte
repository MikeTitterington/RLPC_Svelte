<script>
    import { fade } from 'svelte/transition'
 	 /** @type {import('./$types').PageData} */
  	export let data;
    let player = data.player
    let playerId = data.playerId
    let trackers = data.trackers
    let stats17 = data.stats17
    let teamimage = data.teamimage
    let player17 = data.player17
    let headers = data.headers
    let name = data.name
    let region = data.region
    let platform = data.platform
    let mmr = data.mmr
    let mmrOld = data.mmrOld
    let gameStats = data.gameStats;
    console.log(player[0][4])
</script>
<svelte:head>
	<title>{name}</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">
    {#if player}
    <div class='py-4'>
        <div class='playerCard items-center text-center bg-gray-600 w-full py-40 grid gap-4 md:grid-cols-3 grid-cols-1'>
            <div class='pl-6'>
                <h1 class='text-6xl font-bold name'>{name}</h1>
                {#if player[0][10].includes("MAX")}
                    <h2 class='pt-4'>Contract: Max Contract with {player[0][4]}</h2>
                {/if}
                {#if player[0][10].length > 0 && !player[0][10].includes("MAX")}
                    <h2 class='pt-4'>Contract: Season {(parseInt(player[0][10])-parseInt(player[0][11])+1)} of {player[0][10]} with {player[0][4]}</h2>
                {/if}
                {#if player[0][10].length == 0 && !player[0][10].includes("MAX")}
                    <h2 class='pt-4'>Contract: None</h2>
                {/if}
                <h2>Region: {region.replace(/[^\w\s]/gi, '')}</h2>
                <h2>Platform: {platform.replace(/[^\w\s]/gi, '')}</h2>
                <h2>League: {player[0][5]}</h2>
                <h2>RLPC MMR (Tracker MMR): {mmr.replace(/[^\w\s]/gi, '')} ({mmrOld.replace(/[^\w\s]/gi, '')})</h2>
            </div>
            {#if stats17[0]}
                {#if player[0][4].includes('Free')}
                    <div>
                        <img class='h-80 m-auto' alt='logo' src='../../logos/RLPC_Logo.png'/>
                        <div class='text-xl stats'>
                            <h2><strong>Goals Per Game:</strong>  {stats17[0][8]} ({stats17[0][3]})</h2>
                            <h2><strong>Assists Per Game:</strong> {stats17[0][9]} ({stats17[0][4]})</h2>
                            <h2><strong>Saves Per Game:</strong> {stats17[0][10]} ({stats17[0][5]})</h2>
                            <h2><strong>Shooting %:</strong> {stats17[0][11]}</h2>
                        </div>
                    </div>
                {:else if player[0][4]}
                    <div>
                        <img class='h-80 m-auto' alt='logo' src='../logos/{player[0][4].split('\/')[player[0][4].split('\/').length-1]}_Logo.png'/>
                        <div class='text-xl stats'>
                            <h2><strong>Goals Per Game:</strong>  {stats17[0][8]} ({stats17[0][3]})</h2>
                            <h2><strong>Assists Per Game:</strong> {stats17[0][9]} ({stats17[0][4]})</h2>
                            <h2><strong>Saves Per Game:</strong> {stats17[0][10]} ({stats17[0][5]})</h2>
                            <h2><strong>Shooting %:</strong> {stats17[0][11]}</h2>
                        </div>
                    </div>
                {:else} 
                    <div>
                        <img class='h-80 m-auto' alt='logo' src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png'/>
                        <div class='text-xl stats'>
                            <h2><strong>Goals Per Game:</strong>  {stats17[0][8]} ({stats17[0][3]})</h2>
                            <h2><strong>Assists Per Game:</strong> {stats17[0][9]} ({stats17[0][4]})</h2>
                            <h2><strong>Saves Per Game:</strong> {stats17[0][10]} ({stats17[0][5]})</h2>
                            <h2><strong>Shooting %:</strong> {stats17[0][11]}</h2>
                        </div>
                    </div>
                {/if}
            {:else}
                
                {#if player[0][4].includes('Free')}
                    <img class='h-80 m-auto' alt='logo' src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png'/>
                {:else if player[0][4]}
                    <img class='h-80 m-auto' alt='logo' src='../logos/{player[0][4].split('\/')[player[0][4].split('\/').length-1]}_Logo.png'/>
                {:else} 
                    <img class='h-80 m-auto' alt='logo' src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png'/>
                {/if}
            {/if}
            <div>
                {#if gameStats && gameStats != [] && gameStats[0]}
                    <div class='pr-6 bg-gray-600  text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center' in:fade="{{ duration:1000, ease:'circ' }}">
                        <h1 class='text-2xl font-bold'>Recent Games</h1>
                        <table class="border-collapse border table-fixed border-gray-900">
                            <thead class='bg-gray-900'>
                                <tr>
                                    <th class="text-xl font-bold text-white px-6 py-4">Matchup</th>
                                    <th class="text-xl font-bold text-white px-6 py-4">Goals</th>
                                    <th class="text-xl font-bold text-white px-6 py-4">Assists</th>
                                    <th class="text-xl font-bold text-white px-6 py-4">Saves</th>
                                    <th class="text-xl font-bold text-white px-6 py-4">Shots</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each gameStats as game}
                                    <tr class='border-collapse border bg-gray-100 border-gray-900'>
                                        <td class='text-lg text-gray-900 px-6 whitespace-nowrap'>{game[0]}</td>
                                        <td class='text-lg text-gray-900 px-6 whitespace-nowrap'>{game[6]}</td>
                                        <td class='text-lg text-gray-900 px-6 whitespace-nowrap'>{game[7]}</td>
                                        <td class='text-lg text-gray-900 px-6 whitespace-nowrap'>{game[8]}</td>
                                        <td class='text-lg text-gray-900 px-6 whitespace-nowrap'>{game[9]}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                {:else}
                    <h3 class='text-2xl font-bold'> No Recent Games Found</h3>
                {/if}
            </div>
        </div>
        {#if trackers && trackers != [] && trackers[0] && trackers[0][17]}
            <h1 class='text-2xl font-bold text-center'>Trackers</h1>
            {#each trackers[0][17].split(",") as game}
                <h2 class=' text-center'><a href='{game}'  target="_blank" rel="noopener noreferrer"> - {game}</a></h2>
            {/each}
        {/if}
    </div>
{:else}
<h1 class='text-4xl font-bold'>Player not found</h1>
{/if}

</div>
<style>
    .playerCard{
        border: 3px black solid;
        object-fit: contain;
    }
</style>