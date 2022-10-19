<svelte:head>
    {#if team[0][5]}
	    <title>{team[0][5]}</title>
    {/if}
</svelte:head>
<script>
    import { fade } from 'svelte/transition'
    /** @type {import('./$types').PageData} */
    export let data
    let team = data.team
    let players = data.players
    let control = data.control
    let teamStats = data.teamStats
    let schedule = data.schedule
	import Player from '../../../components/Player.svelte';
    let majorCheck = false;
    players.forEach(element => {
        if (element[4] == team[0][5]){
            majorCheck = true
        }
    });
</script>
<div transition:fade="{{ duration:1000, ease:'circ' }}" class='my-8 py-4 w-full h-full grid gap-4 grid-cols-1 p-8 dark:bg-gray-600 text-gray-300 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
    {#if team[0]}
        <div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center'>
            <div class='text-center items-center'>
                <h1 class='font-bold text-5xl p-4'>{team[0][5]}</h1>
                <h2 class='font-bold text-3xl p-4'>GM: {team[0][9]}</h2>
                {#if team[0][10]}
                    <h2 class='font-bold text-3xl p-4'>AGM: {team[0][10]}</h2>
                {/if}
            </div>
            <div>
                <img class='object-contain m-auto' src='{team[0][0]}' alt='{team[0][5]} logo'/>
            </div>
            <div>
                <h2 class='font-bold text-2xl p-4 -mb-5'>
                    S19 Picks:</h2>
                    {#if team[0][14][9]}
                    <h2 class='text-xl p-4'> {team[0][14][3]}</h2>
                    {:else}
                    <h2 class='text-xl p-4'> {team[0][16][3]}</h2>
                    {/if}
                    <h2 class='font-bold text-2xl p-4 -mb-5'>
                        S20 Picks:</h2>
                        {#if team[0][14][9]}
                        <h2 class='text-xl p-4'> {team[0][14][9]}</h2>
                        {:else}
                        <h2 class='text-xl p-4'> {team[0][16][9]}</h2>
                        {/if}
            </div>
        </div>
        {#if team[0][5] && majorCheck}
            <a href='/team/{team[0][5]}'><div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center bg-gray-300 text-gray-800'>
                <h1 class='font-bold text-3xl p-4'>{team[0][5]}</h1>
                <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-1 text-center col-span-2'>
                    {#each players as player}
                        {#if player[4] == team[0][5]}
                            <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}/>
                        {/if}
                    {/each}
                </div>
            </div></a>
        {/if}
        
        {#if team[0][13]}
            <a href='/team/{team[0][13]}'><div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center bg-gray-300 text-gray-800'>
                <h1 class='font-bold text-3xl p-4'>{team[0][13]}</h1>
                <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-1 text-center col-span-2'>
                    {#each players as player}
                        {#if player[4] == team[0][13]}
                            <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}/>
                        {/if}
                    {/each}
                </div>
            </div></a>
        {/if}
        
        {#if team[0][14] && team[0][14][0] != team[0][9]}
            <a href='/team/{team[0][14]}'><div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center bg-gray-300 text-gray-800'>
                <h1 class='font-bold text-3xl p-4'>{team[0][14]}</h1>
                <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-1 text-center col-span-2'>
                    {#each players as player}
                        {#if player[4] == team[0][14]}
                            <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}/>
                        {/if}
                    {/each}
                </div>
            </div></a>
        {/if}
        {#if team[0][15]}
            <a href='/team/{team[0][15]}'><div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center bg-gray-300 text-gray-800'>
                <h1 class='font-bold text-3xl p-4'>{team[0][15]}</h1>
                <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-1 text-center col-span-2'>
                    {#each players as player}
                        {#if player[4] == team[0][15]}
                            <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}/>
                        {/if}
                    {/each}
                </div>
            </div></a>
        {/if}
    {/if}
</div>

<style>
    img {
        max-height: 300px;
    }
</style>