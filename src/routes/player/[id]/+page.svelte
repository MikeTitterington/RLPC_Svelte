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
</script>
<svelte:head>
	<title>{name}</title>
</svelte:head>
<div transition:fade="{{ duration:1000, ease:'circ' }}">
    {#if player}
    <h1 class='text-4xl font-bold text-center'>{name.replace(/[^\w\s]/gi, '')}</h1>
    <div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
        {#if  stats17 && stats17 != [] && stats17[0] && stats17[0][1] > 0}
            <div class='p-6 bg-gray-600  text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center' transition:fade="{{ duration:1000, ease:'circ' }}">
                <h1 class='text-2xl font-bold'>Season 17 Stats</h1>
                <h2>Series Played: {stats17[0][1]} ({stats17[0][2]} Games)</h2>
                <h2>Goals Per Game: {stats17[0][8]} ({stats17[0][3]})</h2>
                <h2>Assists Per Game: {stats17[0][9]} ({stats17[0][4]})</h2>
                <h2>Saves Per Game: {stats17[0][10]} ({stats17[0][5]})</h2>
                <h2>Shooting %: {stats17[0][11]}</h2>
                <h2>Winning %: {stats17[0][12]}</h2>
            </div>
        {/if}
        {#if gameStats && gameStats != [] && gameStats[0]}
            <div class='p-6 bg-gray-600  text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center' transition:fade="{{ duration:1000, ease:'circ' }}">
                <h1 class='text-2xl font-bold'>Recent Games</h1>
                <table class="border-collapse border table-fixed border-blue-800">
                    <thead>
                        <tr>
                            <th class="w-1/6 border border-gray-400">Matchup</th>
                            <th class="w-1/6 border border-gray-400">Goals</th>
                            <th class="w-1/6 border border-gray-400">Assists</th>
                            <th class="w-1/6 border border-gray-400">Saves</th>
                            <th class="w-1/6 border border-gray-400">Shots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each gameStats as game}
                            <tr>
                                <td class='border border-gray-400'>{game[0]}</td>
                                <td class='border border-gray-400'>{game[6]}</td>
                                <td class='border border-gray-400'>{game[7]}</td>
                                <td class='border border-gray-400'>{game[8]}</td>
                                <td class='border border-gray-400'>{game[9]}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        <div class='p-6 bg-gray-600  text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
            <!-- <img class='h-1/6 w-1/6 object-contain' src='{logo}' alt='{name.replace(/[^\w\s]/gi, '')} logo'/> -->
            <h1 class='text-2xl font-bold'>Player Info</h1>
            <h2>Region: {region.replace(/[^\w\s]/gi, '')}</h2>
            <h2>Platform: {platform.replace(/[^\w\s]/gi, '')}</h2>
            <h2>League: {player[0][5]}</h2>
            <h2>RLPC MMR (Tracker MMR): {mmr.replace(/[^\w\s]/gi, '')} ({mmrOld.replace(/[^\w\s]/gi, '')})</h2>
            
            {#if trackers && trackers != [] && trackers[0] && trackers[0][17]}
                <h1 class='text-2xl font-bold'>Trackers</h1>
                {#each trackers[0][17].split(",") as game}
                    <h2><a href='{game}'  target="_blank" rel="noopener noreferrer"> - {game}</a></h2>
                {/each}
            {/if}
        </div>
        
        {#if stats17 && stats17 != [] && stats17[0] && stats17[0][1] > 0 && teamimage && teamimage[0]}
            <div class='playerCard items-center text-center bg-gray-600'>
                <img alt='team logo' src='{teamimage[0][0]}'/>
                <h1 class='text-4xl font-bold name'>{name}</h1>
                <h1 class='text-xl font-bold'>{mmr.replace(/[^\w\s]/gi, '')} ({mmrOld.replace(/[^\w\s]/gi, '')})</h1>
                <div class='text-xl stats'>
                    <h2><strong>Goals Per Game:</strong>  {stats17[0][8]} ({stats17[0][3]})</h2>
                    <h2><strong>Assists Per Game:</strong> {stats17[0][9]} ({stats17[0][4]})</h2>
                    <h2><strong>Saves Per Game:</strong> {stats17[0][10]} ({stats17[0][5]})</h2>
                    <h2><strong>Shooting %:</strong> {stats17[0][11]}</h2>
                </div>
            </div>
        {/if}
    </div>
{:else}
<h1 class='text-4xl font-bold'>Player not found</h1>
{/if}

</div>
<style>
    img {
        height: 40%;
        margin: auto;
    }
    .name {
        padding-top: 10px;
    }
    .stats {
        padding-top: 10px;
        height: 50%;
        line-height: 40px;
    }
    .playerCard{
        border: 3px black solid;
        border-radius: 20px;
        object-fit: contain;
        height: 500px;
        width: 300px;
        padding: 10px;
    }
</style>