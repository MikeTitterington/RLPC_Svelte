
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
/** @type {import('./$types').PageServerLoad} */
export async function load ({ params }) {
    const id = params.id.replace(/[^\w\s]/gi, '');
    let player, player17, stats17, teamimage, trackers, headers, gameStats, name;
    let ranges = 'ranges=Old%20Players!A2:AF&ranges=Old%20Players!A2:V&ranges=Teams!A:F&ranges=Old%20Players!A2:V&ranges=Old%20Players!A1:V1'
    try {
        let getAllRanges = await getSheets(sheetsStoreP4, ranges)
        player = getAllRanges[0]
        trackers = getAllRanges[1]
        teamimage  = getAllRanges[2]
        player17 = getAllRanges[3]
        headers = getAllRanges[4]
        player = player['values'].filter(team => team[team.length-11].toLowerCase() === id.toLowerCase());
    } catch {
        console.log('player not found')
    }
    let playerId=id
    
    let playerIDH = findHeaderCol(headers, "Discord ID")
    let playerLeagueH = findHeaderCol(headers, "League")
    try {
        trackers = trackers['values'].filter(team => team[playerIDH].toLowerCase() === playerId.toLowerCase());
    } catch(err) {
        console.log('trackers not found' + err)
    }
    try {
        player17 = player17['values'].filter(team => team[playerIDH].toLowerCase() === playerId.toLowerCase());
        let getAllCurrent = await getSheets(sheetsStoreP4, `ranges=${player17[0][playerLeagueH].replace(/[^\w\s]/gi, '')} League Stat Database!C4:RV&ranges=${player17[0][playerLeagueH].replace(/[^\w\s]/gi, '')} Game Logs!B1:K`)
        stats17 = getAllCurrent[0]
        stats17 = stats17['values'].filter(team => team[0].toLowerCase() === player17[0][0].toLowerCase());
        gameStats = getAllCurrent[1]
        gameStats = gameStats['values'].filter(team => team[2] && team[2].toLowerCase() === player17[0][0].toLowerCase());
        gameStats = gameStats.slice(-10)
        teamimage = teamimage['values'].filter(team => team[5].toLowerCase() === player17[0][4].toLowerCase())
    } catch(err) {
        console.log('current season not found' + err)
    }

    

    let region,platform,mmr,mmrOld;
    let playerNameH = findHeaderCol(headers, "Username")
    let playerRegionH = findHeaderCol(headers, "Region")
    let playerPlatformH = findHeaderCol(headers, "Platform")
    let playerMMRH = findHeaderCol(headers, "Sheet MMR")
    let playerMMROH = findHeaderCol(headers, "Tracker MMR")
    name = player[0][playerNameH];
    region = player[0][playerRegionH];
    platform = player[0][playerPlatformH];
    mmr = player[0][playerMMRH];
    mmrOld = player[0][playerMMROH];
    return {
        playerId : playerId,
        trackers : trackers,
        stats17 : stats17,
        gameStats : gameStats,
        teamimage : teamimage,
        player17 : player17,
        headers : headers,
        name : name,
        player : player,
        name : player[0][playerNameH],
        region : player[0][playerRegionH],
        platform : player[0][playerPlatformH],
        mmr : player[0][playerMMRH],
        mmrOld : player[0][playerMMROH]
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