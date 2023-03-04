<script>
    import { fade } from 'svelte/transition'
	import {sheetsP4} from '../../../stores/store'
	import Player from '../../../components/PlayerDrag.svelte';
    export let filteredPlayers;
	let searchTerm = "";
	export let capSpace;
    let leftSpace = capSpace;
	let team = [];
    let name = 'world';
	
	let drop_zone;
	
	let dropped = [];
	let status = '';
	
	let dropped_in = '';
	let activeEvent = '';
    let originalX = '';
    let originalY = '';
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
	async function load () {
        
        filteredPlayers.forEach((element) => {
            element.id = getRandomInt(9999999999)
            element.el = null;
            element[3] = parseInt(element[3])
        });
		filteredPlayers = [... filteredPlayers]
        columnItems = [
            {
                id: 1,
                name: "Valid Players",
                items: filteredPlayers
            },
            {
                id: 2,
                name: "My Team",
                items: team
            }
        ];
	}
    let columnItems = [
		{
			id: 1,
			name: "Valid Players",
			items: filteredPlayers
		},
		{
			id: 2,
			name: "My Team",
			items: team
		}
	];
    function handleDragEnter(e) {
        status = "You are dragging over the " + e
            .target
            .getAttribute('id');
    }

    function handleDragLeave(e) {
        status = "You left the " + e
            .target
            .getAttribute('id');
    }

    function handleDragDrop(e) {
        e.preventDefault();
        var element_id = e
            .dataTransfer
            .getData("text");
				dropped = dropped.concat(element_id);
        dropped_in = true;
        status = "You droped " + element_id + " into drop zone";
        let temp = filteredPlayers.filter(player => player.id == element_id)[0];
        const index = filteredPlayers.indexOf(temp);
        filteredPlayers.splice(index,1)
        team.push([...temp])
        team = [...team]
        let total = 0
        team.forEach((item) => {
            total = total + item[3];
        });
        leftSpace = capSpace-total;
    }
	
		function handleDragStart(e) {
        status = "Dragging the element " + e
        	.target
          .getAttribute('id');
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer
         .setData("text", e.target.getAttribute('id'));
    }

    function handleDragEnd(e) {
    	if (dropped_in == false) {
      	status = "You let the " + e
        	.target
          .getAttribute('id') + " go.";
    	}
      dropped_in = false;
    }

    function handleTouchStart(e) {
    	status = "Touch start with element " + e
      	.target
        .getAttribute('id');
      originalX = (e.target.offsetLeft - 10) + "px";
      originalY = (e.target.offsetTop - 10) + "px";
      activeEvent = 'start';
    }

    function handleTouchMove(e) {
    	let touchLocation = e.targetTouches[0];
    	let pageX = Math.floor((touchLocation.pageX - 50)) + "px";
    	let pageY = Math.floor((touchLocation.pageY - 50)) + "px";
    	status = "Touch x " + pageX + " Touch y " + pageY;
    	e.target.style.position = "absolute";
    	e.target.style.left = pageX;
    	e.target.style.top = pageY;
    	activeEvent = 'move';
    }

    function handleTouchEnd(e) {
    	e.preventDefault();
    	if (activeEvent === 'move') {
      	let pageX = (parseInt(e.target.style.left) - 50);
      	let pageY = (parseInt(e.target.style.top) - 50);

      	if (detectTouchEnd(drop_zone.offsetLeft, drop_zone.offsetTop, pageX, pageY, drop_zone.offsetWidth, drop_zone.offsetHeight)) {
        	dropped = dropped.concat(e.target.id);
        	e.target.style.position = "initial";
        	dropped_in = true;
        	status = "You dropped " + e
          	.target
          	.getAttribute('id') + " into drop zone";
        } else {
        	e.target.style.left = originalX;
        	e.target.style.top = originalY;
        	status = "You let the " + e
          	.target
          	.getAttribute('id') + " go.";
        }
      }
    }

    function detectTouchEnd(x1, y1, x2, y2, w, h) {
    	//Very simple detection here
    	if (x2 - x1 > w) 
      	return false;
    	if (y2 - y1 > h) 
      	return false;
    	return true;
    }

    function filterTeams(value) {
		if(value) {
            team = [...team]
			return filteredPlayers.filter(team => team[0].toLowerCase().includes(value.toLowerCase())).filter(team => parseInt(team[3])<= leftSpace);
		}else {
            team = [...team]
			return [... filteredPlayers].filter(team => parseInt(team[3])<= leftSpace);
		}
		
	}

    function filterMyTeams(value) {
        filteredPlayers = filteredPlayers.filter(team => parseInt(team[3])<= leftSpace);
        return [... team];
    }
    $: team = filterMyTeams(team)
	$: filteredPlayers = filterTeams(searchTerm);

	load()
</script>

<svelte:head>
	<title>Team Builder</title>
</svelte:head>
<div in:fade="{{ duration:1000, ease:'circ' }}">
    <input class='my-8 w-full rounded-md text-lg p-4 border-2 border-gray-200 text-gray-800' type='text' bind:value={searchTerm} placeholder='Search Players' >
    <div class='grid gap-4 md:grid-cols-2 grid-cols-2'>
        <input class='my-8 rounded-md text-lg p-4 border-2 border-gray-200 text-gray-800' type='text' bind:value={capSpace} placeholder='Cap Space' >
        <h1 class='my-8 rounded-md text-lg p-4 border-2 border-gray-200'> Cap Left: {leftSpace}</h1>
    </div>
    <div class='grid gap-4 md:grid-cols-2 grid-cols-2'>
        <div class='grid gap-4 md:grid-cols-2 grid-cols-2'>
            <h1 class='col-span-2 text-2xl font-bold text-center'>Available Players</h1>
            {#each filteredPlayers as { id }, i}
                <div
                    id="{filteredPlayers[i].id}"
                    draggable=true 
                    on:dragstart={handleDragStart}
                    on:dragend={handleDragEnd}
                    on:touchstart={handleTouchStart}
                    on:touchmove={handleTouchMove}
                    on:touchend={handleTouchEnd}>
                    <Player name={filteredPlayers[i][0]}, region={filteredPlayers[i][1]}, platform={filteredPlayers[i][2]}, mmr={filteredPlayers[i][3]}, id={filteredPlayers[i][filteredPlayers[i].length-11]}></Player>
                </div>
                
            {/each}
        </div>
        <div class='py-4 h-full'
            on:dragenter={handleDragEnter} 
            on:dragleave={handleDragLeave}  
            on:drop={handleDragDrop} 
            bind:this={drop_zone} 
            id="drop_zone" 
            ondragover="return false"
        >
            <h1 class='col-span-2 text-2xl font-bold text-center'>My Team</h1>
            {#each team as {id}, i}
            
                <Player name={team[i][0]}, region={team[i][1]}, platform={team[i][2]}, mmr={team[i][3]}, id={team[i][team[i].length-11]} ></Player>
            
            {/each}
        </div>
    </div>
    
</div>

<style>
    #drop_zone {
        width: 100%;
        height: 100%;
        padding: 8px;
        font-size: 19px;
    }
</style>