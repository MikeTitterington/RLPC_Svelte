<svelte:head>
    {#if team[0][5]}
	    <title>{team[0][5]}</title>
    {/if}
</svelte:head>
<script>
    /** @type {import('./$types').PageData} */
    export let data
    import { fade } from 'svelte/transition'
    let team;
    let players;
    let schedule;
    let teamStats;
    let control;
    let majorCap, aaaCap, aaCap, aCap, indyCap, mavCap

    let total = 0
    let cap = 0
    $: {
        team = data.team
        players = data.players
        schedule = data.schedule
        teamStats = data.teamStats
        control = data.control
        majorCap = data.majorCap
        aaaCap = data.aaaCap
        aaCap = data.aaCap
        aCap = data.aCap
        indyCap = data.indyCap
        mavCap = data.mavCap
        if (players[0][5] == 'Major'){
            cap = majorCap
        } else if (players[0][5] == 'AAA'){
            cap = aaaCap
        } else if (players[0][5] == 'AA'){
            cap = aaCap
        } else if (players[0][5] == 'A'){
            cap = aCap
        } else if (players[0][5] == 'Independent'){
            cap = indyCap
        } else if (players[0][5] == 'Maverick'){
            cap = mavCap
        }
        cap = parseInt(cap) - parseInt(team[0][team[0].length-1])
        players.forEach(player => {
            total += parseInt(player[3])
        });
    }
	import Player from '../../../components/Player.svelte';
</script>
<div in:fade="{{ duration:1000, ease:'circ' }}" class='my-8 py-4 w-full h-full grid gap-4 grid-cols-1 p-8 dark:bg-gray-600 text-gray-300 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center'>
    {#if team[0]}
        <div class='py-4 grid gap-4 grid-cols-2 text-center'>
            <div class='text-center items-center'>
                <h1 class='font-bold text-5xl p-4'>{team[0][5]}</h1>
                <h2 class='font-bold text-3xl p-4'>GM: {team[0][9]}</h2>
                {#if team[0][10]}
                    <h2 class='font-bold text-3xl p-4'>AGM: {team[0][10]}</h2>
                {/if}
                {#if team[0][11]}
                    <h2 class='font-bold text-3xl p-4'>Captain: {team[0][11]}</h2>
                {/if}
                {#if team[0][12]}
                    <h2 class='font-bold text-xl p-4'><a href='/team/{team[0][12]}'>{team[0][12]}</a></h2>
                {/if}
                {#if team[0][13]}
                    <h2 class='font-bold text-xl p-4'><a href='/team/{team[0][13]}'>{team[0][13]}</a></h2>
                {/if}
                {#if team[0][14]}
                    <h2 class='font-bold text-xl p-4'><a href='/team/{team[0][14]}'>{team[0][14]}</a></h2>
                {/if}
                {#if team[0][15]}
                    <h2 class='font-bold text-xl p-4'><a href='/team/{team[0][15]}'>{team[0][15]}</a></h2>
                {/if}
                {#if team[0][15]}
                    <h2 class='font-bold text-xl p-4'>Cap Space: {total}/{cap} Left: {cap-total}</h2>
                {/if}
            </div>
            <div>
                <img class='object-contain m-auto' src='{team[0][0]}' alt='{team[0][5]} logo'/>
            </div>
        </div>
    {/if}
    <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-2 text-center'>
        {#each players as player}
            <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}, goals={control[player[0]][4]}, assists={control[player[0]][5]}, saves={control[player[0]][6]}, goalspg={control[player[0]][9]}, assistspg={control[player[0]][10]}, savespg={control[player[0]][11]}/>
        {/each}
    </div>
    {#if schedule}
        <div class='overflow-x-auto'>
            <table class="border-collapse border table-auto overflow-scroll w-full border-blue-800 bg-gray-400 text-gray-800">
                <thead>
                    <tr>
                        <th class="border border-gray-400">Date</th>
                        <th class="border border-gray-400">Team 1</th>
                        <th class="border border-gray-400">Score</th>
                        <th class="border border-gray-400">Team 2</th>
                        <th class="border border-gray-400">Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {#each schedule as game}
                        {#if game[3] == team[0][5]}
                            <tr>
                                <td class='border border-gray-400'>{game[0]}</td>
                                <td class='border border-gray-400'>{game[3]}</td>
                                {#if game[7]}
                                    {#if game[6] == team[0][5]}
                                        <td class='border border-gray-400'>{game[7]}</td>
                                        <td class='border border-gray-400'>{game[5]}</td>
                                        <td class='border border-gray-400'>{game[6]}</td>
                                    {:else}
                                        <td class='border border-gray-400'>{game[7].split('').reverse().join('')}</td>
                                        <td class='border border-gray-400'>{game[5]}</td>
                                        <td class='border border-gray-400'>{game[6]}</td>
                                    {/if}
                                {:else}
                                    <td class='border border-gray-400'>0-0</td>
                                    <td class='border border-gray-400'>{game[5]}</td>
                                    <td class='border border-gray-400'>No Results</td>
                                {/if}
                            </tr>
                        {:else}
                            <tr>
                                <td class='border border-gray-400'>{game[0]}</td>
                                <td class='border border-gray-400'>{game[5]}</td>
                                {#if game[7]}
                                    {#if game[6] == team[0][5]}
                                        <td class='border border-gray-400'>{game[7]}</td>
                                        <td class='border border-gray-400'>{game[3]}</td>
                                        <td class='border border-gray-400'>{game[6]}</td>
                                    {:else}
                                        <td class='border border-gray-400'>{game[7].split('').reverse().join('')}</td>
                                        <td class='border border-gray-400'>{game[3]}</td>
                                        <td class='border border-gray-400'>{game[6]}</td>
                                    {/if}
                                {:else}
                                    <td class='border border-gray-400'>0-0</td>
                                    <td class='border border-gray-400'>{game[3]}</td>
                                    <td class='border border-gray-400'>No Results</td>
                                {/if}
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
        
    {/if}
    {#if teamStats}
        <div class='overflow-x-auto'>
            <table class="border-collapse border border-blue-800 bg-gray-400 text-gray-800 table-auto overflow-scroll w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-400">Record (Div Record)</th>
                        <th class="border border-gray-400">FFs</th>
                        <th class="border border-gray-400">Goals | PG</th>
                        <th class="border border-gray-400">Assists | PG</th>
                        <th class="border border-gray-400">Saves | PG</th>
                        <th class="border border-gray-400">Shots | PG</th>
                        <th class="border border-gray-400">%Goals Assisted</th>
                        <th class="border border-gray-400">Shooting %</th>
                        <th class="border border-gray-400">GA | PG</th>
                        <th class="border border-gray-400">Shots Agnst  | PG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class='border border-gray-400 text-center'>{teamStats[1]}</td>
                        <td class='border border-gray-400 text-center'>{teamStats[2]}</td>
                        {#if teamStats[5] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[5]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                        {#if teamStats[6] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[6]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                        {#if teamStats[7] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[7]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                        {#if teamStats[8] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[8]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                        {#if teamStats[9] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[9]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0%</td>
                        {/if}
                        {#if teamStats[10] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[10]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>100%</td>
                        {/if}
                        {#if teamStats[11] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[11]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                        {#if teamStats[12] != '#VALUE!'}
                            <td class='border border-gray-400 text-center'>{teamStats[12]}</td>
                        {:else}
                            <td class='border border-gray-400 text-center'>0 | 0.00</td>
                        {/if}
                    </tr>
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    img {
        max-height: 500px;
    }
</style>