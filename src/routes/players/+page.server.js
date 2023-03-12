import { request } from 'undici';
import { env } from '$env/dynamic/private';
import {sheetsP4, sheetsIndy} from '../../stores/store.js'
let sheetsStoreP4;
let sheetsStoreIndy;
sheetsP4.subscribe((data) => {
    sheetsStoreP4 = data
})
sheetsIndy.subscribe((data) => {
    sheetsStoreIndy = data
})
/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
    let teamsIndy = [];
    let searchTerm = "";
    let filteredPlayers = [];
    let playerNameH = 0;
    let playerRegionH = 1;
    let playerPlatformH = 2;
    let playerMMRH = 3;
    let playerIDH = -1;
    let ranges = "ranges=Players!A2:AF&ranges=Players!A1:AF1"
    let temp = await getSheets(sheetsStoreP4, ranges)
    let headers = temp[1]
    teamsIndy = temp[0]['values'].sort(function(a, b){return b[playerMMRH]-a[playerMMRH]})
    return {
        playerMMRH : findHeaderCol(headers, "Tracker MMR"),
        playerNameH : findHeaderCol(headers, "Username"),
        playerRegionH : findHeaderCol(headers, "Region"),
        playerPlatformH : findHeaderCol(headers, "Platform"),
        playerIDH : findHeaderCol(headers, "Discord ID"),
        teamsIndy : teamsIndy.filter(player => player[0]),
        filteredPlayers : [... teamsIndy]

    }
}

async function getSheets (url, range) {
    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values:batchGet?' + range + '&key='+ env.API_KEY)
    const Output = await res.json()
    return await Output['valueRanges'];
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
