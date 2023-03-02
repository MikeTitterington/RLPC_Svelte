<svelte:head>
	<title>Home</title>
</svelte:head>
<script>
	import Article from '../components/Article.svelte';
	import Ticker from 'svelte-ticker';
    import { fade } from 'svelte/transition'
 	 /** @type {import('./$types').PageData} */
  	export let data;
    let fullSchedule = data.fullSchedule
    let scheduleDateH = data.scheduleDateH
    let scheduleWinnerH = data.scheduleWinnerH
    let scheduleScoreH = data.scheduleScoreH
    let teams = data.teams
	let articles = data.articles
    let schedule = [];
	let searchTerm = "";
	let filteredTeams = [];
    async function filterTeams(value) {
		if(value) {
            filteredTeams = fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase() || team[3].toLowerCase() == value.toLowerCase());
            let i = 1
            return fullSchedule.filter(team => team[5].toLowerCase() == value.toLowerCase() || team[3].toLowerCase() == value.toLowerCase()).forEach(element => {
                if (element.length == 6){
                    element.push("No Results")
                    element.push("0 - 0")
                    element.push("N")
                    element.push("N")
                }
                if(i%2==0){
                    element.push("bg-gray-100")
                }else{
                    element.push("bg-gray-300")
                }
                i = i+1
            });
		}else {
            filteredTeams = [... schedule];
			return [... schedule];
		}
		
	}
</script>
<div class='text-xl overflow-x-hidden'>
	<div class='hidden md:flex h-20 text-lg overflow-hidden ticker z-0'>
		{#each fullSchedule as game}
			{#if game[scheduleScoreH]}
				<div class='grid gap-4 grid-cols-2 border border-blue-800 float-left dark:bg-gray-300 dark:text-gray-800 w-96'>
					<div class='grid grid-cols-1 px-2 flex flex-col h-100 m-auto text-center'>
						<div class='flex flex-col'>{game[3]}</div>
						<div>{game[5]}</div>
					</div>
					<div class='flex flex-col h-100 m-auto'>{game[scheduleScoreH]}</div>
				</div>
				
			{:else}
				<div class='grid gap-4 grid-cols-2 border border-blue-800 float-left dark:bg-gray-300 dark:text-gray-800 w-96 mx-1'>
					<div class='grid grid-cols-1 px-2 flex flex-col h-100 m-auto text-center'>
						<div class='flex flex-col'>{game[3]}</div>
						<div>{game[5]}</div>
					</div>
					<div class='flex flex-col h-100 m-auto'>0-0</div>
				</div>
			{/if}
		{/each}
	</div>
	<img class='h-96' src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png' alt='logo' />
	<p class='text-2xl text-center'>The RLPC is a 3k+ member, NA-based, league organization created in 2017. RLPC combines a competitive Rocket League scene and a traditional sports background, with a setup that includes affiliated leagues, call-ups/send-downs, MMRs caps, contracts, a draft system for new players, free agency, player trading, and more. RLPC’s goal is to offer a league where members can improve while playing and hopefully move on to Professional and Collegiate Rocket League levels.</p><br><br>
	<h2 class='text-center'>Recent News Articles</h2>
	<div class='py-4 grid gap-4 md:grid-cols-6 grid-cols-2 m-4'>
		{#each articles as article}
			<Article name={article[1]} id={article[0]} date={article[2]}/>
		{/each}
	</div>
</div>
<style>
	.ticker {
		width: 400%;
        animation: slide 120s linear infinite;
	}
	img {
		text-align: center;
		margin: auto;
	}
	@keyframes slide {
        0% {
            transform: translate3d(0px, 0, 0);
        }

        100% {
            transform: translate3d(-6000px, 0, 0);
            /* The image width */
        }
    }
</style>