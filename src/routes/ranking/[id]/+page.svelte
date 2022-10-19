<script>
    import { fade } from 'svelte/transition'
	import TeamPR from "../../../components/TeamPRNew.svelte";
 	 /** @type {import('./$types').PageData} */
  	export let data;
    let powerRankings = data.powerRankings;
    let league = data.league;
</script>
{#if powerRankings}
    <div class='back dark:bg-gray-800'  in:fade="{{ duration:1000, ease:'circ' }}">
        <div class='contain w-full h-full' id='image'>
            <div class='py-6 gap-2 grid md:grid-cols-4 2'>
                <h2 class='md:col-span-4 col-span-2 py'>{league} Power Rankings</h2>
                {#each powerRankings as team (team.id)}
                    <TeamPR team={team.team} logo={team.logo} standing={team.id}  top={team.top} color={team.color}/>
                {/each}
            </div>
        </div>
    </div>
{/if}

<svelte:head>
	<title>Power Rankings</title>
</svelte:head>

<style>
    @font-face {
        font-family: 'Evogria';
        src:
            local('Evogria'), url('../../Evogria.otf') format("opentype");
    }
    * {
        font-family: 'Evogria';
    }
    h2 {
        text-align: center;
        line-height: 320px;
        font-size: 50px;
        color: white;
    }
</style>