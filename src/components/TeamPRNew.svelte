<script>
    import { fade } from 'svelte/transition'
    export let team = '';
    export let logo = '';
    export let standing = '';
    export let color;
    export let first;
    export let top;
    if (!color){
        if ((top/100) % 2 == 0){
            color = '#181B56';
        } else {
            color = '#9F9F9F';
        }
    }
    function preload(src) {
        return new Promise(function(resolve) {
            let img = new Image()
            img.onload = resolve
            img.src = src
        })
    }
</script>
{#if first=='true'}
    {#await preload(logo) then _}
        <div class='team col-start-2' style="background-color: {color};"  transition:fade="{{ duration:3000, ease:'circ' }}">
            <p class='name'>{team}</p>
            <img src={logo} alt='team'>
            <p class='place'>{standing}</p>
        </div>
    {/await}
{:else if first=='true2'}
    {#await preload(logo) then _}
        <div class='team col-start-3' style="background-color: {color};"  transition:fade="{{ duration:3000, ease:'circ' }}">
            <p class='name'>{team}</p>
            <img src={logo} alt='team'>
            <p class='place'>{standing}</p>
        </div>
    {/await}

{:else if first=='true3'}
    {#await preload(logo) then _}
        <div class='team col-start-4' style="background-color: {color};"  transition:fade="{{ duration:3000, ease:'circ' }}">
            <p class='name'>{team}</p>
            <img src={logo} alt='team'>
            <p class='place'>{standing}</p>
        </div>
    {/await}

{:else if first=='true4'}
    {#await preload(logo) then _}
        <div class='team col-start-5' style="background-color: {color};"  transition:fade="{{ duration:3000, ease:'circ' }}">
            <p class='name'>{team}</p>
            <img src={logo} alt='team'>
            <p class='place'>{standing}</p>
        </div>
    {/await}
{:else}
    {#await preload(logo) then _}
        <div class='team' style="background-color: {color};"  transition:fade="{{ duration:3000, ease:'circ' }}">
            <p class='name'>{team}</p>
            <img src={logo} alt='team'>
            <p class='place'>{standing}</p>
        </div>
    {/await}
{/if}
<style>

    @font-face {
        font-family: 'Evogria';
        src:
            local('Evogria'), url('Evogria.otf') format("opentype");
    }

    img {
        position: absolute;
        margin: auto;
        padding: 2px;
        top: 16.4%;
        height: 70%;
        width: 100%;
        object-fit: contain;
        /* -webkit-transform: perspective(1000px) rotateY(-20deg);
        transform: perspective(1000px) rotateY(-20deg);
        background-origin: border-box;
        filter: drop-shadow(10px 10px 10px #1c1c1c); */
    }

    .name {
        position: absolute;
        text-align: center;
        width: 100%;
        height: 40px;
        bottom:0;
        background-color: white;
        line-height: 40px;
    }

    .team {
        position: relative;
        height:320px;
        line-height: 30px;
        font-size: 35px;
        font-family: Evogria;
        color: black;
        border: white 2px solid;
    }

    .place {
        position: absolute;
        left: -1px;
        top: -1px;
        width: 50px;
        height: 50px;
        color: black;
        background-color: white;
        text-align: center;
        line-height:50px;
    }
</style>