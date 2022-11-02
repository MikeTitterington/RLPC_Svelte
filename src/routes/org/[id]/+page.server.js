
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

export async function load ({params}) {
    const id = params.id;
    let team = [[]];
    let filtTeam = []
    let schedule, teamStats, sheet, control, getSheetsP4r
    let rangeP4 = 'ranges=Teams!A2:P113&ranges=Players!A2:AF&ranges=Teams!A1:P1&ranges=Players!A1:AF1&ranges=P4%20Org%20Draft%20Pick%20List!M3:W&ranges=Independent%20Org%20Draft%20Pick%20List!M3:W'
    let teamHeaders,playerHeaders,teamNameH,aff1H,aff2H,aff3H, playerTeamH,playerMMRH,playerPlayingH

    try {
        getSheetsP4r = await getSheets(sheetsStoreP4, rangeP4);
        teamHeaders = getSheetsP4r[2]
        playerHeaders = getSheetsP4r[3]
        teamNameH = findHeaderCol(teamHeaders, 'Team');
        team = getSheetsP4r[0];
        team = team['values'].filter(team => team[teamNameH].toLowerCase() === id.toLowerCase());
        getSheetsP4r[4] = getSheetsP4r[4]['values'].filter(teama => teama[1].toLowerCase() === id.toLowerCase())
        console.log(getSheetsP4r[4])
        console.log(getSheetsP4r[4].length);
        getSheetsP4r[5] = getSheetsP4r[5]['values']
        if (getSheetsP4r[4].length == 0){
            filtTeam = getSheetsP4r[5].filter(teama => teama[1].toLowerCase() === id.toLowerCase())
            team[0].push(filtTeam[0])
            console.log(team[0])
        }else {
            team[0].push(getSheetsP4r[4][0])
            console.log(team[0])
        }
        if(team === []){
            team = [[]]
        }
    } catch(err)  {
        team = [[]];
        console.log(err);
    }
    aff1H = findHeaderCol(teamHeaders, 'AAA Affiliate')
    aff2H = findHeaderCol(teamHeaders, 'AA Affiliate')
    aff3H = findHeaderCol(teamHeaders, 'A Affiliate')
    let orgTeams
    if (team[0][aff3H]){
        orgTeams = [team[0][aff1H].toLowerCase(), team[0][aff2H].toLowerCase(), team[0][aff3H].toLowerCase()]
    }else{
        orgTeams = [team[0][aff1H].toLowerCase()]
    }
    let temp = getSheetsP4r[1]
    playerTeamH = findHeaderCol(playerHeaders, "Team")
    playerMMRH = findHeaderCol(playerHeaders, "Tracker MMR")
    playerPlayingH = findHeaderCol(playerHeaders, "Not Playing")
    var playerEnrollH = findHeaderCol(playerHeaders, "Enrollment")
    let players = temp['values'].filter(player => (player[playerTeamH].toLowerCase() === id.toLowerCase() || orgTeams.includes(player[playerTeamH].toLowerCase())) && player[playerPlayingH] === 'FALSE').sort(function(a, b){return b[playerMMRH]-a[playerMMRH]})
    console.log(players)
    return{
        team : team,
        players : players,
        schedule : schedule,
        teamStats : teamStats,
        control : control
    }
}