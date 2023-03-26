<script>
    import { fade } from 'svelte/transition'
	import {sheetsP4} from '../../../stores/store'
	import Player from '../../../components/PlayerDrag.svelte';
    /** @type {import('./$types').PageData} */
    export let data
    let filteredPlayers
    let capSpace
    filteredPlayers = data.filteredPlayers
    capSpace = data.capSpace
    $: {
        filteredPlayers.forEach((element) => {
            element.id = element[21]
            element.el = null;
            element[3] = parseInt(element[3])
        });
		filteredPlayers = [... filteredPlayers]
        team.forEach((element) => {
            element.id = element[21]
        });
		team = [... team]
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
	let searchTerm = "";
    let leftSpace = capSpace;
	let team = [];
    let name = 'world';
	
	let drop_zone;
    let drop_zone2;
	
	let dropped = [];
	let status = '';
	
	let dropped_in = '';
	let activeEvent = '';
    let originalX = '';
    let originalY = '';
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
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

    function handleDragEnter2(e) {
        status = "You are dragging over the " + e
            .target
            .getAttribute('id');
    }

    function handleDragLeave2(e) {
        status = "You left the " + e
            .target
            .getAttribute('id');
    }

    function handleDragDrop2(e) {
        console.log(e.dataTransfer.getData("text"))
        e.preventDefault();
        var element_id = e
            .dataTransfer
            .getData("text");
        dropped = dropped.concat(element_id);
        dropped_in = true;
        status = "You droped " + element_id + " into drop zone";
        let temp = team.filter(player => player.id == element_id)[0];
        console.log(filteredPlayers)
        console.log(team)
        const index = team.indexOf(temp);
        team.splice(index,1)
        filteredPlayers.push([...temp])
        filteredPlayers = [...filteredPlayers]
        let total = 0
        team.forEach((item) => {
            total = total + item[3];
        });
        leftSpace = capSpace-total;
    }
	
    function handleDragStart2(e) {
        status = "Dragging the element " + e
        	.target
          .getAttribute('id');
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer
         .setData("text", e.target.getAttribute('id'));
        console.log(e.target)
    }

    function handleDragEnd2(e) {
    	if (dropped_in == false) {
      	status = "You let the " + e
        	.target
          .getAttribute('id') + " go.";
    	}
      dropped_in = false;
    }

    function handleTouchStart2(e) {
    	status = "Touch start with element " + e
      	.target
        .getAttribute('id');
      originalX = (e.target.offsetLeft - 10) + "px";
      originalY = (e.target.offsetTop - 10) + "px";
      activeEvent = 'start';
    }

    function handleTouchMove2(e) {
    	let touchLocation = e.targetTouches[0];
    	let pageX = Math.floor((touchLocation.pageX - 50)) + "px";
    	let pageY = Math.floor((touchLocation.pageY - 50)) + "px";
    	status = "Touch x " + pageX + " Touch y " + pageY;
    	e.target.style.position = "absolute";
    	e.target.style.left = pageX;
    	e.target.style.top = pageY;
    	activeEvent = 'move';
    }

    function handleTouchEnd2(e) {
    	e.preventDefault();
    	if (activeEvent === 'move') {
      	let pageX = (parseInt(e.target.style.left) - 50);
      	let pageY = (parseInt(e.target.style.top) - 50);

      	if (detectTouchEnd(drop_zone2.offsetLeft, drop_zone2.offsetTop, pageX, pageY, drop_zone2.offsetWidth, drop_zone2.offsetHeight)) {
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

    function detectTouchEnd2(x1, y1, x2, y2, w, h) {
    	//Very simple detection here
    	if (x2 - x1 > w) 
      	return false;
    	if (y2 - y1 > h) 
      	return false;
    	return true;
    }

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
        console.log(team)
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
        let tempFilt = [... filteredPlayers]
        console.log(value)
        console.log(value)
		if(value) {
			tempFilt = tempFilt.filter(team => team[0].toLowerCase().includes(value.toLowerCase()));
		}
		return tempFilt
	}

    function filterMyTeams(value) {
        filterTeams()
        return [... team];
    }
    $: team = filterMyTeams(team)
	$: showPlayers = filterTeams(searchTerm);
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
        <div class='grid gap-4 md:grid-cols-2 grid-cols-2'
            on:dragenter={handleDragEnter2} 
            on:dragleave={handleDragLeave2}  
            on:drop={handleDragDrop2} 
            bind:this={drop_zone2} 
            id="drop_zone2" 
            ondragover="return false"
        >
            <h1 class='col-span-2 text-2xl font-bold text-center'>Available Players</h1>
            {#each showPlayers as { id }, i}
                <div
                    id="{showPlayers[i].id}"
                    draggable=true 
                    on:dragstart={handleDragStart}
                    on:dragend={handleDragEnd}
                    on:touchstart={handleTouchStart}
                    on:touchmove={handleTouchMove}
                    on:touchend={handleTouchEnd}>
                    <Player name={showPlayers[i][0]}, region={showPlayers[i][1]}, platform={showPlayers[i][2]}, mmr={showPlayers[i][3]}, id={showPlayers[i][showPlayers[i].length-11]}></Player>
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
                <div
                    id="{team[i].id}"
                    draggable=true 
                    on:dragstart={handleDragStart2}
                    on:dragend={handleDragEnd2}
                    on:touchstart={handleTouchStart2}
                    on:touchmove={handleTouchMove2}
                    on:touchend={handleTouchEnd2}>
                    <Player name={team[i][0]}, region={team[i][1]}, platform={team[i][2]}, mmr={team[i][3]}, id={team[i][team[i].length-11]} ></Player>
                </div>
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