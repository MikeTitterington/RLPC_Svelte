
import { request } from 'undici';
import {sheetsP4, sheetsIndy} from '../../../stores/store.js'
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
    const league = params.id;
    let ranges = "ranges=Players!A2:AF&ranges=Players!A1:AF1"
    let temp = await getSheets(sheetsStoreP4, ranges)
    let headers = temp[1]
    let playerMMRH = findHeaderCol(headers, "Tracker MMR")
    let playerNameH = findHeaderCol(headers, "Username")
    let playerRegionH = findHeaderCol(headers, "Region")
    let playerPlatformH = findHeaderCol(headers, "Platform")
    let playerIDH = findHeaderCol(headers, "Discord ID")
    let playerPlayingH = findHeaderCol(headers, "Not Playing")
    let teamsIndy = temp[0]['values'].sort(function(a, b){return b[playerMMRH]-a[playerMMRH]});
    teamsIndy = teamsIndy.filter(player => player[0] && (player[4] == 'Draftee' || player[4] == 'Waitlist') && player[playerPlayingH] === 'FALSE' && player[5] == league)
    let filteredPlayers = [... teamsIndy]

    return{
        league : league,
        playerMMRH : playerMMRH,
        playerNameH : playerNameH,
        playerRegionH : playerRegionH,
        playerPlatformH : playerPlatformH,
        playerIDH : playerIDH,
        teamsIndy : teamsIndy,
        filteredPlayers : filteredPlayers
    }
}

function findHeaderCol(headers, name){
    headers = headers['values'][0]
    for (let i = 0; i < headers.length; i++) {
        const column = headers[i];
        if (column == name) {
            return i;
        }
    }
    return -1
}