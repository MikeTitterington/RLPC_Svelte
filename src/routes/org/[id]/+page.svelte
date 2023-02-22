<svelte:head>
    {#if team[0][5]}
	    <title>{team[0][5]}</title>
    {/if}
</svelte:head>
<script context='module'>
    import { fade } from 'svelte/transition'
</script>
<script>
    /** @type {import('./$types').PageData} */
    export let data
    let team = data.team
    let players = data.players
    let control = data.control
    let teamStats = data.teamStats
    let schedule = data.schedule
    let majorCap = data.majorCap
    let aaaCap = data.aaaCap
    let aaCap = data.aaCap
    let aCap = data.aCap
    let indyCap = data.indyCap
    let mavCap = data.mavCap
    let majorTotal = 0
    let aaaTotal = 0
    let aaTotal = 0
    let aTotal = 0
    let indyTotal = 0
    let mavTotal = 0
    console.log(team)
    $: {
        majorCap = data.majorCap
        aaaCap = data.aaaCap
        aaCap = data.aaCap
        aCap = data.aCap
        indyCap = data.indyCap
        mavCap = data.mavCap
    }
    players.forEach(player => {
        if(player[5] == 'Major'){
            majorTotal += parseInt(player[3])
        }else if(player[5] == 'AAA'){
            aaaTotal += parseInt(player[3])
        }else if(player[5] == 'AA'){
            aaTotal += parseInt(player[3])
        }else if(player[5] == 'A'){
            aTotal += parseInt(player[3])
        }else if(player[5] == 'Independent'){
            indyTotal += parseInt(player[3])
        }else if(player[5] == 'Maverick'){
            mavTotal += parseInt(player[3])
        }
    });
	import Player from '../../../components/Player.svelte';
    let majorCheck = false;
    players.forEach(element => {
        if (element[4] == team[0][5]){
            majorCheck = true
        }
    });
</script>
<div in:fade="{{ duration:1000, ease:'circ' }}" class='my-8 py-4 w-full h-full grid gap-4 grid-cols-1 p-8 dark:bg-gray-600 text-gray-300 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
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
                    {#if team[0][22][9]}
                    <h2 class='text-xl p-4'> {team[0][22][3]}</h2>
                    {:else}
                    <h2 class='text-xl p-4'> {team[0][24][3]}</h2>
                    {/if}
                    <h2 class='font-bold text-2xl p-4 -mb-5'>
                        S20 Picks:</h2>
                        {#if team[0][22][9]}
                        <h2 class='text-xl p-4'> {team[0][22][9]}</h2>
                        {:else}
                        <h2 class='text-xl p-4'> {team[0][24][9]}</h2>
                        {/if}
            </div>
        </div>
        {#if team[0][5] && majorCheck}
            <a href='/team/{team[0][5]}'><div class='py-4 grid gap-4 md:grid-cols-3 grid-cols-1 text-center place-items-center bg-gray-300 text-gray-800'>
                <div>
                    <h1 class='font-bold text-3xl p-4'>{team[0][5]}</h1>
                    <!-- {#if team[0][6] == "Major"}
                        <h1 class='font-bold text-xl p-4'>{majorTotal}</h1>
                    {:else}
                        <h1 class='font-bold text-xl p-4'>{indyTotal}/{parseInt(indyCap)} Left: {parseInt(indyCap)-indyTotal}</h1>
                    {/if} -->
                </div>
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
                <div>
                    <h1 class='font-bold text-3xl p-4'>{team[0][13]}</h1>
                    <!-- {#if team[0][6] == "Major"}
                        <h1 class='font-bold text-xl p-4'>{aaaTotal}/{parseInt(aaaCap)} Left: {parseInt(aaaCap)-aaaTotal}</h1>
                    {:else}
                        <h1 class='font-bold text-xl p-4'>{mavTotal}/{parseInt(mavCap)} Left: {parseInt(mavCap)-mavTotal}</h1>
                    {/if} -->
                </div>
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
                <div>
                    <h1 class='font-bold text-3xl p-4'>{team[0][14]}</h1>
                    <!-- <h1 class='font-bold text-xl p-4'>{aaTotal}/{parseInt(aaCap)} Left: {parseInt(aaCap)-aaTotal}</h1> -->
                </div>
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
                <div>
                    <h1 class='font-bold text-3xl p-4'>{team[0][15]}</h1>
                    <!-- <h1 class='font-bold text-xl p-4'>{aTotal}/{parseInt(aCap)} Left: {parseInt(aCap)-aTotal}</h1> -->
                </div>
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
