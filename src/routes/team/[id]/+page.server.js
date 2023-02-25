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


/** @type {import('./$types').PageServerLoad} */
export async function load ({params}) {
    const id = params.id;
    let team = [[]];
    let schedule, teamStats, sheet, control, getSheetsP4r, getSheetsSpecificr, rangeSpecific, playerEnrollH;
    let rangeP4 = 'ranges=Teams!A2:V113&ranges=Old%20Players!A2:AF&ranges=Teams!A1:P1&ranges=Old%20Players!A1:AF1&ranges=MMR%20Cutoff%20Calculations!A21:A41&ranges=Teams!A2:AF113'
    let teamNameH, teamLeagueH, playerHeaders, majorCap, aaaCap, aaCap, aCap, indyCap, mavCap, teamSub
    try {
        getSheetsP4r = await getSheets(sheetsStoreP4, rangeP4);
        let teamHeaders = getSheetsP4r[2]
        playerHeaders = getSheetsP4r[3]
        teamNameH = findHeaderCol(teamHeaders, "Team")
        teamLeagueH = findHeaderCol(teamHeaders, "League")
        playerEnrollH = findHeaderCol(playerHeaders, "Enrollment")
        team = getSheetsP4r[0];
        team = team['values'].filter(team => team[teamNameH].toLowerCase() === id.toLowerCase());
        console.log('test')
        teamSub = getSheetsP4r[5];
        teamSub = teamSub['values'].filter(team => team[teamNameH].toLowerCase() === id.toLowerCase());
        console.log(teamSub)
        team.push(teamSub[0][teamSub[0].length-1])
        team.push(teamSub[0][teamSub[0].length-2])
        console.log(team)
        if(team === []){
            team = [[]]
        }
        let cap = getSheetsP4r[4]['values'];
        majorCap = cap[0]
        aaaCap = cap[4]
        aaCap = cap[8]
        aCap = cap[12]
        indyCap = cap[16]
        mavCap = cap[20]
    } catch(error){
        team = [[]];
        console.log(error);
    }
    if (team[0] && (team[0][teamLeagueH].trim() === 'Independent' || team[0][teamLeagueH].trim() === 'Maverick' || team[0][teamLeagueH].trim() === 'Renegade' || team[0][teamLeagueH].trim() === 'Paladin')) {
        sheet = sheetsStoreIndy
        rangeSpecific = `ranges=${team[0][teamLeagueH]} Schedule!O5:X&ranges=${team[0][teamLeagueH]} Stats!D6:Q31&ranges=${team[0][teamLeagueH].replace(/[^\w\s]/gi, '')} Stat Database!B4:R`
    }else {
        rangeSpecific = `ranges=${team[0][teamLeagueH]} Schedule!O5:X&ranges=Standings!W17:BB73&ranges=${team[0][teamLeagueH].replace(/[^\w\s]/gi, '')} League Stat Database!B4:R`
        sheet = sheetsStoreP4
    }
    let temp = getSheetsP4r[1]
    // console.log(temp['values'])
    let playerTeamH, playerPlayingH, playerMMRH
    playerTeamH = findHeaderCol(playerHeaders, "Team")
    playerPlayingH = findHeaderCol(playerHeaders, "Not Playing")
    playerMMRH = findHeaderCol(playerHeaders, "Tracker MMR")
    let players = temp['values'].filter(player => player[playerTeamH].toLowerCase() === id.toLowerCase() && player[playerPlayingH] === 'FALSE' && player[playerEnrollH] === 'Y').sort(function(a, b){return b[playerMMRH]-a[playerMMRH]})
    // console.log(temp)
    if(team[0]){
        getSheetsSpecificr = await getSheets(sheet, rangeSpecific);
        let getSchedule = getSheetsSpecificr[0]
        try {
            getSchedule['values'] = getSchedule['values'].filter(team => team[0])
            schedule = getSchedule['values'].filter(team => team[3].toLowerCase() === id.toLowerCase() || team[5].toLowerCase() === id.toLowerCase())
        } catch (error) {
            console.log('No Schedule')
        }
        let getTeamStats = getSheetsSpecificr[1]
        teamStats = getTeamStats['values'].filter(team => team[0]).filter(team => team[0].toLowerCase() === id.toLowerCase() || team[5].toLowerCase() === id.toLowerCase())[0]
        let stats17 = getSheetsSpecificr[2]
        stats17 = stats17['values'].filter(team => team[0].toLowerCase() === id.toLowerCase());
        control = {}
        stats17.forEach(element => {
            control[element[1]] = element
        });
    }
    return{
        team : team,
        players : players,
        schedule : schedule,
        teamStats : teamStats,
        control : control,
        majorCap : majorCap,
        aaaCap : aaaCap,
        aaCap : aaCap,
        aCap : aCap,
        indyCap :indyCap,
        mavCap : mavCap
    }
}