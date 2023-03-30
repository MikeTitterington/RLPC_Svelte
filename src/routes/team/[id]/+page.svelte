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
        if (players[0]){
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
        }
        cap = parseInt(cap) - parseInt(team[0][team[0].length-1])
        players.forEach(player => {
            total += parseInt(player[3])
        });
    }
	import Player from '../../../components/Player.svelte';
</script>
<div in:fade="{{ duration:1000, ease:'circ' }}" class='my-8 py-4 w-full h-full grid gap-4 grid-cols-1 p-8 dark:bg-gray-600 text-gray-300 text-center rounded-md shadow-sm hover:shadow-md flex flex-col teamCard items-center'>
    {#if team[0]}
        <div class='py-4 grid gap-4  md:grid-cols-2 grid-cols-1 text-center'>
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
            </div>
            <div>
                <img class='object-contain m-auto w-80' src='/logos/{team[0][0].split("\/")[team[0][0].split("\/").length-1].replace(/\s/g, "_")}' alt='{team[0][5]} logo'/>
            </div>
        </div>
    {/if}
    <div class='py-4 grid gap-4 md:grid-cols-4 grid-cols-2 text-center'>
        {#each players as player}
            {#if control[player[0]]}
                <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}, goals={control[player[0]][4]}, assists={control[player[0]][5]}, saves={control[player[0]][6]}, goalspg={control[player[0]][9]}, assistspg={control[player[0]][10]}, savespg={control[player[0]][11]}, elc={player[30]}/>
            {:else}
                <Player name={player[0]}, id={player[player.length - 11]}, contract={"Season " + (parseInt(player[10])-parseInt(player[11])+1) + " of " + player[10]}, playerOp={player[player.length - 5]}, orgOp={player[player.length - 5]} region={player[1]}, platform={player[2]}, mmr={player[3]}, mmrOld={player[8]}, elc={player[30]}/>
            {/if}
        {/each}
    </div>
    <div class='grid gap-4 md:grid-cols-2 grid-cols-1'>
        <div class="bg-gray-300 text-gray-800 w-full">
            {#if players[0]}
                <h2 class='text-xl p-4'><strong>Cap Space:</strong> {total}/{cap} <strong>Left:</strong> {cap-total}</h2>
                <h2 class='text-xl p-4'><strong>Free Agent Subs Remaining:</strong> {team[1]}</h2>
                <h2 class='text-xl p-4'><strong>Waitlist Subs Remaining:</strong> {team[2]}</h2>
                <h2 class='text-xl p-4'><strong>Used Send Down:</strong> {team[0][team[0].length-6]}</h2>
            {/if}
            <h2 class='text-xl p-4'><strong>Freebee Count:</strong> {team[0][team[0].length-5]}</h2>
        </div>
        {#if teamStats}
            <div class='overflow-x-auto'>
                <table class="border-collapse border border-blue-800 bg-gray-400 text-gray-800 table-auto overflow-scroll w-full">
                    <thead class="border-b bg-gray-100">
                        <tr>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Record (Div Record)</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">FFs</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Goals | PG</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Assists | PG</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Saves | PG</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Shots | PG</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">%Goals Assisted</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Shooting %</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">GA | PG</th>
                            <th class="text-xl font-bold text-black border border-gray-400 py-4">Shots Agnst  | PG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class='border-b bg-gray-300'>
                            <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[11]}</td>
                            <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[12]}</td>
                            {#if teamStats[5] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[15]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                            {#if teamStats[6] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[16]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                            {#if teamStats[7] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[17]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                            {#if teamStats[8] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[18]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                            {#if teamStats[9] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{Math.round(parseFloat(teamStats[19]) * 100)}%</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0%</td>
                            {/if}
                            {#if teamStats[10] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{Math.round(parseFloat(teamStats[20]) * 100)}%</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>100%</td>
                            {/if}
                            {#if teamStats[11] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[21]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                            {#if teamStats[12] != '#VALUE!'}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{teamStats[22]}</td>
                            {:else}
                                <td class='border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0 | 0.00</td>
                            {/if}
                        </tr>
                    </tbody>
                </table>
            </div>
    {/if}
</div>
{#if schedule}
<div class='overflow-x-auto'>
    <table class="border-collapse border table-auto overflow-scroll w-full border-blue-800 bg-gray-300 text-gray-800">
        <thead>
            <tr>
                <th class="border border-gray-400 text-xl font-bold text-black border border-gray-400 py-4 bg-gray-200">Date</th>
                <th class="border border-gray-400 text-xl font-bold text-black border border-gray-400 py-4 bg-gray-200">Team 1</th>
                <th class="border border-gray-400 text-xl font-bold text-black border border-gray-400 py-4 bg-gray-200">Score</th>
                <th class="border border-gray-400 text-xl font-bold text-black border border-gray-400 py-4 bg-gray-200">Team 2</th>
                <th class="border border-gray-400 text-xl font-bold text-black border border-gray-400 py-4 bg-gray-200">Winner</th>
            </tr>
        </thead>
        <tbody>
            {#each schedule as game}
                {#if game[3] == team[0][5]}
                    <tr>
                        <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[0]}</td>
                        <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[3]}</td>
                        {#if game[7]}
                            {#if game[6] == team[0][5]}
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'><strong>{game[7]}</strong></td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[5]}</td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[6]}</td>
                            {:else}
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'><strong>{game[7].split('').reverse().join('')}</strong></td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[5]}</td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[6]}</td>
                            {/if}
                        {:else}
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0-0</td>
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[5]}</td>
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>No Results</td>
                        {/if}
                    </tr>
                {:else}
                    <tr>
                        <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[0]}</td>
                        <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[5]}</td>
                        {#if game[7]}
                            {#if game[6] == team[0][5]}
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'><strong>{game[7]}</strong></td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[3]}</td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[6]}</td>
                            {:else}
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'><strong>{game[7].split('').reverse().join('')}</strong></td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[3]}</td>
                                <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[6]}</td>
                            {/if}
                        {:else}
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>0-0</td>
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>{game[3]}</td>
                            <td class='border border-gray-400 border border-gray-400 text-center py-4 text-lg text-gray-900 px-6 whitespace-nowrap'>No Results</td>
                        {/if}
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

{/if}
</div>
<style>
    .teamCard{
        border: 3px black solid;
    }
</style>