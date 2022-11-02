<svelte:head>
	<title>Home</title>
</svelte:head>

<div class='contain text-5xl'>
	<img src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png' alt='logo' />
	<!-- <article>
		<hr>
		<p>RLPC is a 3k+ member, NA-based, league organization created in 2017. RLPC combines a competitive Rocket League scene and a traditional sports background, with a setup that includes affiliated leagues, call-ups/send-downs, MMRs caps, contracts, a draft system for new players, free agency, player trading, and more. RLPC’s goal is to offer a league where members can improve while playing and hopefully move on to Professional and Collegiate Rocket League levels.</p>
		<hr>
		<h1 class='text-center'><strong>League Structure</strong></h1>
		<p class="text-center"><strong>Major League:</strong> 1850+ | Draft League | No Team MMR Cap
<strong>AAA:</strong> 1682 MMR - 1849 MMR
<strong>AA:</strong> 1581 MMR - 1681 MMR
<strong>A:</strong> 1496 MMR - 1580 MMR
<strong>Independent:</strong> 1413 MMR - 1495 MMR
<strong>Maverick:</strong> 1289 MMR - 1412 MMR
<strong>Renegade:</strong> 1000 MMR - 1288 MMR</p>
<hr>
		<h1 class='text-center'><strong>Key Information</strong></h1>
		<p>
- Organizations have GMs and AGMs that are professionally branded.
- RLPC provides a professional-level broadcasts with casters
- Leagues below Major have overall team MMR caps and utilize a draft system for new joining players.
- Teams are not pre-made. Players join teams and teams conduct tryouts in the off-season as well as participate in a league-ran draft if they are new.
- Regular season lasts 9 weeks with 2 matches a week (1x Tuesday and 1x Thursday). Playoffs are a double-elimination tournament.</p>
<hr>
	</article> -->
</div>

<!-- <table class="min-w-full text-center">
	<caption class='text-xl  font-bold'>Recent Trades</caption>
	<thead class="border-b bg-gray-600">
		<tr>
			<th scope="col" class="text-xl font-bold text-white px-6 py-4">Date</th>
			<th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 1</th>
			<th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 1 Recieves</th>
			<th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 2</th>
			<th scope="col" class="text-xl font-bold text-white px-6 py-4">Team 2 Recieves</th>
		</tr>
	</thead>
	<tbody>
		{#each trades as trade}
		
			{#await preload(trade[org1TH]) then _}
				<tr class=" bg-gray-100 border-b">
					<td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{trade[dateTH]}</td>
					<td class='text-xl text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/org/{trade[5]}'><img class='contain' src='{trade[org1TH]}'/></a></td>
					<td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{trade[rec1TH]}</td>
					<td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap font-bold'><a href='/org/{trade[6]}'><img class='contain' src='{trade[org2TH]}'/></a></td>
					<td class='text-lg text-gray-900 px-6 py-4 whitespace-nowrap'>{trade[rec2TH]}</td>
				</tr>
			{/await}
		{/each}
	</tbody>
</table> -->
<style>
	.contain {
		height: 100%;
		width: 70%;
		margin:auto
	}
	img {
		text-align: center;
		margin: auto;
	}
	article {
  		white-space: pre-wrap;
	}
</style>