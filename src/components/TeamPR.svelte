<script>
    import { fade } from 'svelte/transition'
    export let team = '';
    export let logo = '';
    export let standing = '';
    export let top = 0;
    export let left = 0;
    let color = '';

    if ((top/100) % 2 == 0){
        color = '#181B56';
    } else {
        color = '#9F9F9F';
    }
    function preload(src) {
        return new Promise(function(resolve) {
            let img = new Image()
            img.onload = resolve
            img.src = src
        })
    }
</script>
{#await preload(logo) then _}
    <div class='team' style="top:{top-35}px; background-color: {color}; left: {left}px"  transition:fade="{{ duration:3000, ease:'circ' }}">
        <p class='name'>{team}</p>
        <img src={logo} alt='team'>
        <p class='place'>{standing}</p>
    </div>
{/await}
<style>

    @font-face {
        font-family: 'Evogria';
        src:
            local('Evogria'), url('Evogria.otf') format("opentype");
    }

    img {
        position: absolute;
        right: 5px;
        height: 95px;
        width: 100px;
        object-fit: contain;
        /* -webkit-transform: perspective(1000px) rotateY(-20deg);
        transform: perspective(1000px) rotateY(-20deg);
        background-origin: border-box;
        filter: drop-shadow(10px 10px 10px #1c1c1c); */
    }

    .name {
        position: absolute;
        left: 60px;
        top:0;
        line-height: 100px;
    }

    .team {
        position: absolute;
        height: 100px;
        width: 400px;
        line-height: 30px;
        font-size: 35px;
        font-family: Evogria;
        color: #ffc15e;
        border: #f4faff 1px solid;
    }

    .place {
        position: absolute;
        left: 0px;
        top:0;
        width: 50px;
        text-align: center;
        line-height: 100px;
    }
</style>