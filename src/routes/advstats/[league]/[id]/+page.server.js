
import { request } from 'undici';
import {sheetsP4, sheetsIndy} from '../../../../stores/store.js'
let sheetsStoreP4;
let sheetsStoreIndy;
sheetsP4.subscribe((data) => {
    sheetsStoreP4 = data
})
sheetsIndy.subscribe((data) => {
    sheetsStoreIndy = data
})

import { env } from '$env/dynamic/private';

async function getSheets (url, range) {
    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values:batchGet?' + range + '&key='+ env.API_KEY)
    const Output = await res.json()
    return await Output['valueRanges'];
}

export async function load ({fetch, params}) {
    const id = params.id;
    const league = params.league;
    let League = league
    let statTemp = id
    let stats, statsAdv, stat, statName;
    let avg = 0;
    let count = 0;
    try {
        stats = await getSheets(sheetsStoreP4, `${league} League Stat Database!C4:R`)
        stats['values'].forEach(player => {
            if(player[0] != ''){
                avg = avg + parseInt(player[2])
                count = count + 1
                player[11] = parseFloat(player[11].substring(0, player[11].length - 1))
                player[12] = parseFloat(player[12].substring(0, player[12].length - 1))
            }
        });
        if (id === 'goals') {
            stat = 8
            statName = 'Goals Per Game'
        } else if (id === 'assists') {
            stat = 9
            statName = 'Assists Per Game'
        } else if (id === 'saves') {
            stat = 10
            statName = 'Saves Per Game'
        } else if (id === 'points') {
            stat = 14
            statName = 'Points Per Game'
        } else if (id === 'shooting') {
            stat = 11
            statName = 'Shooting %'
        } else if (id === 'winning') {
            stat = 12
            statName = 'Winning %'
        }
        avg = (avg/count)-3
        statsAdv = stats['values'].filter(team => team[2]>=avg && team[0] != '').sort(function(a, b){return parseFloat(b[stat])-parseFloat(a[stat])});
    } catch {
        console.log('s15 not found')
    }
    return{
        statsAdv : statsAdv,
        stat : stat,
        statName : statName,
        League : League,
        statTemp : statTemp
    }
}
