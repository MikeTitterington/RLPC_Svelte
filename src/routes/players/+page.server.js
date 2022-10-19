import { request } from 'undici';
import { env } from '$env/dynamic/private';
import {sheetsP4} from '../../stores/store.js'
let sheetsP4l;
sheetsP4.subscribe((data) => {
    sheetsP4l = data
})
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let teamsIndy = [];
    let searchTerm = "";
    let filteredPlayers = [];
    let playerNameH = 0;
    let playerRegionH = 1;
    let playerPlatformH = 2;
    let playerMMRH = 3;
    let playerIDH = -1;
    let ranges = "ranges=Players!A2:AF&ranges=Players!A1:AF1"
    let temp = await getSheets(sheetsP4l, ranges)
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
    const {
        statusCode,
        headers,
        trailers,
        body
      } = await request('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values:batchGet?' + range + '&key='+ env.API_KEY);
    let Output = await body.json()
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
