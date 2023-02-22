<script>
	import '../app.css';
  	import { onMount } from "svelte";
  	import { scale } from 'svelte/transition';
	import Spinner from "../components/Spinner.svelte"
	import {season,sheetsP4,sheetsIndy,showStatsD,showStandD,showLeague,showStats,showCollected,showStandings,showStatsm,showCollectedm,showStandingsm,showBuilderm,showBuilder,showPower,showPowerm,defaultLeague,showDraftee,showFreeAgent,showDrafteem,showFreeAgentm} from '../stores/store.js'
	let showMobileMenu = false;
	let showAboutD = false;
	import { navigating } from '$app/stores'
	const navItems = [
		{label: "Home", href:'/'},
		// {label: "Teams", href:"/teams"},
		// {label: "Players", href:"/players"},
		// {label: "Team Builder", href:"/teambuilder/Major"},
		// {label: "Player Stats", href:"/stats/Major"},
		// {label: "Team Stats", href:"/collected/Major"},
		// {label: "Standings", href:"/standings/Major"},
		// {label: "Schedules", href:"/schedules"},
		// {label: "Power Rankings", href:"/ranking/Major"},
		// {label: "Join", href:"https://discord.gg/BUDpvq7egk"},
		// {label: "Donate", href:"https://streamlabs.com/rlpcofficial/tip"},
		// {label: "Submit Logs", href:"https://rlpcgamelogs.com"}
	]
	const navItemsO = [
		// {label: "Home", href:'/'},
		// {label: "Teams", href:"/teams"},
		// {label: "Players", href:"/players"},
		// {label: "Team Builder", href:"/teambuilder/Major"},
		// {label: "Player Stats", href:"/stats/Major"},
		// {label: "Team Stats", href:"/collected/Major"},
		// {label: "Standings", href:"/standings/Major"},
		// {label: "Schedules", href:"/schedules"},
		// {label: "Power Rankings", href:"/ranking/Major"},
		{label: "Twitch", href:"https://www.twitch.tv/rlpcofficial"},
		{label: "Join", href:"https://discord.gg/BUDpvq7egk"},
		{label: "Donate", href:"https://streamlabs.com/rlpcofficial/tip"},
		{label: "Submit Logs", href:"https://rlpcgamelogs.com"},
		{label: "Rules", href:"/rules"},
		// {label: "Sheets", href:"/sheets"}
	]
	const navItemsm = [
		{label: "Home", href:'/'},
		{label: "Teams", href:"/teams"},
		{label: "Players", href:"/players"},
		{label: "Rules", href:"/rules"},
		// {label: "Team Builder", href:"/teambuilder/Major"},
		// {label: "Player Stats", href:`/stats/${$defaultLeague}`},
		// {label: "Team Stats", href:`/collected/${$defaultLeague}`},
		{label: "Standings", href:`/standings/${$defaultLeague}`},
		{label: "Schedules", href:"/schedules"},
		{label: "Power Rankings", href:`/ranking/${$defaultLeague}`},
		{label: "Join", href:"https://discord.gg/BUDpvq7egk"},
		{label: "Donate", href:"https://streamlabs.com/rlpcofficial/tip"},
		{label: "Submit Logs", href:"https://rlpcgamelogs.com"},
		// {label: "Sheets", href:"/sheets"}

	]
	const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);
	const mediaQueryHandler = e => {
    // Reset mobile state
    if (!e.matches) {
		showMobileMenu = false;
		}
	};
	function handleClick(label) {
		$showStats = false;
		$showCollected = false;
		$showStandings = false;
		$showBuilder = false;
		$showPower = false;
		$showStatsD = false;
		$showLeague = false;
		$showDraftee = false;
		$showFreeAgent = false;
		$showStatsm = false;
		$showCollectedm = false;
		$showStandingsm = false;
		$showBuilderm = false;
		$showPowerm = false;
		$showStatsD = false;
		$showLeague = false;
		$showDrafteem = false;
		$showFreeAgentm = false;
		if(label == 'Player Stats'){
			$showStats = true;
		} else if (label == 'Team Stats'){
			$showCollected = true;
		} else if (label == 'Standings'){
			$showStandings = true;
		} else if (label == 'Team Builder'){
			$showBuilder = true;
		} else if (label == 'Power Rankings'){
			$showPower = true;
		} else if(label == `/stats/${$defaultLeague}`){
			$showStatsm = true;
		} else if (label == `/collected/${$defaultLeague}`){
			$showCollectedm = true;
		} else if (label == `/standings/${$defaultLeague}`){
			$showStandingsm = true;
		} else if (label == `/teambuilder/${$defaultLeague}`){
			$showBuilderm = true;
		} else if (label == `/ranking/${$defaultLeague}`){
			$showPowerm = true;
		} else if (label == `DrafteeSwitch`){
			$showDraftee = true;
		} else if (label == `FreeSwitch`){
			$showFreeAgent = true;
		} else if (label == `DrafteeSwitchm`){
			$showDrafteem = true;
		} else if (label == `FreeSwitchm`){
			$showFreeAgentm = true;
		}
	}
	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

	// Attach media query listener on mount hook
	onMount(() => {
		const mediaListener = window.matchMedia("(max-width: 767px)");

		mediaListener.addListener(mediaQueryHandler);
		const handleOutsideClick = (event) => {
		if (show && !menu.contains(event.target)) {
			show = false;
		}
		};

		const handleEscape = (event) => {
		if (show && event.key === 'Escape') {
			show = false;
		}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
		document.removeEventListener('click', handleOutsideClick, false);
		document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>
<div class='py-8 max-w-screen max-h-full min-h-screen mx-auto contain dark:bg-gray-800 dark:text-gray-300'>
	<nav class="bg-gray-600 mx-8">
		<div class="lg:flex justify-center max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
		  <div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
			  <!-- Mobile menu button-->
			  <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" on:click={handleMobileIconClick}>
				<span class="sr-only">Open main menu</span>
				<!--
				  Icon when menu is closed.
	  
				  Heroicon name: outline/menu
	  
				  Menu open: "hidden", Menu closed: "block"
				-->
				<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
				  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
				<!--
				  Icon when menu is open.
	  
				  Heroicon name: outline/x
	  
				  Menu open: "block", Menu closed: "hidden"
				-->
				<svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
				  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			  </button>
			</div>
			<div class="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
			  <div class="hidden sm:block sm:ml-6">
				<div class="flex space-x-4">
					<img class='h-20 flex origin-top-right' src='https://cdn.discordapp.com/attachments/696962499177742476/989193751526264862/RLPC_Logo.png' alt='logo' />
					{#each navItems as item}
						<a href="{item.href}" class="m-auto text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg" aria-current="page" on:click={() => handleClick(item.label)}>{item.label}</a>
					{/each}
					<div class='m-auto'>
						<div on:mouseenter={() => ($showStandD = true)}  on:mouseleave={() => ($showStandD = false)} class='hover:bg-gray-700 '>
							<div class='menu focus:outline-none focus:shadow-solid text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-lg'>
								<button class='grid grid-cols-2 -mr-10 flex items-center justify-center' on:click={() => ($showStandD = !$showStandD)}>League
									<svg class="h-5 w-5 px-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
									</svg></button>
							</div>
							
							{#if $showStandD}
							<div
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
								class="origin-top-right absolute w-48 py-2 mt-0 bg-gray-700 rounded shadow-md grid gap-4 grid-cols-1 text-center">
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/standings/{$defaultLeague}" on:click={() => handleClick("Standings")}>Standings</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/schedules" on:click={() => handleClick("Schedule")}>Schedule</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/ranking/{$defaultLeague}" on:click={() => handleClick("Power Rankings")}>Power Rankings</a>
							</div>
							{/if}
						</div>
					</div>
					<div class='m-auto'>
						<div on:mouseenter={() => ($showLeague = true)}  on:mouseleave={() => ($showLeague = false)} class='hover:bg-gray-700'>
							<div class='menu focus:outline-none focus:shadow-solid text-gray-300 hover:text-white px-2 py-2 rounded-md text-lg'>
								<button class='grid grid-cols-2 flex items-center justify-center -mr-14' on:click={() => ($showLeague = !$showLeague)}>Database
									<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
									</svg></button>
							</div>
							
							{#if $showLeague}
							<div
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
								class="origin-top-right absolute w-48 py-2 mt-0 bg-gray-700 rounded shadow-md grid gap-4 grid-cols-1 text-center">
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/teams" on:click={() => handleClick("Teams")}>Teams</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/players" on:click={() => handleClick("Players")}>Players</a>
								<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/freeagents/{$defaultLeague}" on:click={() => handleClick("FreeSwitch")}>Free Agents</a> -->
								<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/draftees/{$defaultLeague}" on:click={() => handleClick("DrafteeSwitch")}>Waitlist/Draftee</a> -->
							</div>
							{/if}
						</div>
					</div>
					<!-- <div class='m-auto'>
						<div on:mouseenter={() => ($showStatsD = true)}  on:mouseleave={() => ($showStatsD = false)} class='hover:bg-gray-700 '>
							<div class='menu focus:outline-none focus:shadow-solid text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-lg'>
								<button class='grid grid-cols-2 mx-0 flex items-center justify-center -mr-6' on:click={() => ($showStatsD = !$showStatsD)}>Stats
									<svg class="h-5 w-5 px-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
									</svg></button>
							</div>
							
							{#if $showStatsD}
							<div
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
								class="origin-top-right absolute w-48 py-2 mt-0 bg-gray-700 rounded shadow-md grid gap-4 grid-cols-1 text-center">
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/stats/{$defaultLeague}" on:click={() => handleClick("Player Stats")}>Player Stats</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/collected/{$defaultLeague}" on:click={() => handleClick("Team Stats")}>Team Stats</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/compare" on:click={() => handleClick("Compare")}>Compare Teams</a>
								<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2' href="/sheets" on:click={() => handleClick("Sheets")}>Spreadsheet</a>
							</div>
							{/if}
						</div>
					</div> -->
					<div class='m-auto'>
						<div on:mouseenter={() => (showAboutD = true)}  on:mouseleave={() => (showAboutD = false)} class='hover:bg-gray-700 '>
							<div class='menu focus:outline-none focus:shadow-solid text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-lg'>
								<button class='grid grid-cols-2 mx-0 flex items-center justify-center -mr-6' on:click={() => (showAboutD = !showAboutD)}>About
									<svg class="h-5 w-5 px-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
									</svg></button>
							</div>
							
							{#if showAboutD}
							<div
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
								class="origin-top-right absolute w-48 py-2 mt-0 bg-gray-700 rounded shadow-md grid gap-4 grid-cols-1 text-center">
								{#each navItemsO as item}
									<a href="{item.href}" class="mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white py-2" aria-current="page" on:click={() => handleClick(item.label)}>{item.label}</a>
								{/each}
							</div>
							{/if}
						</div>
					</div>
				</div>
			  </div>
			</div>
			
		  </div>
		</div>
		{#if showMobileMenu }
			<!-- Mobile menu, show/hide based on menu state. -->
			<div class="sm:hidden" id="mobile-menu">
			<ul class="px-2 pt-2 pb-3 space-y-1">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
					{#each navItemsm as item}
						<li><a href="{item.href}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg" aria-current="page" on:click={() => handleClick(item.href)}>{item.label}</a></li>
					{/each}
					
					{#if $showStatsm}
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
					{/if}
					{#if $showCollectedm }
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
					{/if}
					{#if $showStandingsm }
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
					{/if}
					{#if $showBuilderm}
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
					{/if}
					{#if $showPowerm}
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
					  <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
					  <!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
					{/if}
					{#if $showFreeAgentm }
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/{$defaultLeague}" on:click={() => handleClick('DrafteeSwitchm')}>Draftees</a></li> -->
					{/if}
					{#if $showDrafteem }
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Major" on:click={() => $defaultLeague = 'Major'}>Major</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/AA" on:click={() => $defaultLeague = 'AA'}>AA</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/A" on:click={() => $defaultLeague = 'A'}>A</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a></li>
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a></li>
						<!-- <li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a></li> -->
						<li><a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/{$defaultLeague}" on:click={() => handleClick('FreeSwitchm')}>Free Agents</a></li>
					{/if}
			</ul>
			</div>

		{/if}
		
	  </nav>
	  {#if $showStats || $showCollected || $showStandings || $showBuilder || $showPower || $showDraftee || $showFreeAgent}
			{#if $showStats }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/stats/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				</nav>
			{/if}
			{#if $showCollected }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/collected/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				</nav>
			{/if}
			{#if $showStandings }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/standings/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				</nav>
			{/if}
			{#if $showBuilder }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/teambuilder/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				</nav>
			{/if}
			{#if $showPower }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/ranking/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				</nav>
			{/if}
			{#if $showFreeAgent }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/{$defaultLeague}" on:click={() => handleClick('DrafteeSwitch')}>Draftees</a>
				</nav>
			{/if}
			{#if $showDraftee }
				<nav class='flex justify-center w-full dark:bg-gray-600'>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Major" on:click={() => $defaultLeague = 'Major'}>Major</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/AAA" on:click={() => $defaultLeague = 'AAA'}>AAA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/AA" on:click={() => $defaultLeague = 'AA'}>AA</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/A" on:click={() => $defaultLeague = 'A'}>A</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Independent" on:click={() => $defaultLeague = 'Independent'}>Independent</a>
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Maverick" on:click={() => $defaultLeague = 'Maverick'}>Maverick</a>
				<!-- <a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/draftees/Renegade" on:click={() => $defaultLeague = 'Renegade'}>Renegade</a> -->
				<a class='mx-4 text-lg text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md' href="/freeagents/{$defaultLeague}" on:click={() => handleClick('FreeSwitch')}>Free Agents</a>
				</nav>
			{/if}
		{/if}
		{#if $navigating} <!-- LOOK HERE -->
		<div class="m-8">
			<Spinner />
			Loading...
		</div>
      {:else}
	  <div class="m-8">
        <slot />
	  </div>
      {/if}
</div>


<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>



