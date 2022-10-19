import { request } from 'undici';

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
    let rangeP4 = 'ranges=Teams!A2:P113&ranges=Players!A2:AF&ranges=Teams!A1:P1&ranges=Players!A1:AF1'
    let teamNameH, teamLeagueH, playerHeaders
    try {
        getSheetsP4r = await getSheets('1Is6nuVcggWi0hPImTRVcORYuGLffcHvM9rd8r6TbWZE', rangeP4);
        let teamHeaders = getSheetsP4r[2]
        playerHeaders = getSheetsP4r[3]
        teamNameH = findHeaderCol(teamHeaders, "Team")
        teamLeagueH = findHeaderCol(teamHeaders, "League")
        playerEnrollH = findHeaderCol(playerHeaders, "Enrollment")
        team = getSheetsP4r[0];
        team = team['values'].filter(team => team[teamNameH].toLowerCase() === id.toLowerCase());
        if(team === []){
            team = [[]]
        }
    } catch {
        team = [[]];
        console.log('team not found');
    }
    if (team[0] && (team[0][teamLeagueH].trim() === 'Independent' || team[0][teamLeagueH].trim() === 'Maverick' || team[0][teamLeagueH].trim() === 'Renegade' || team[0][teamLeagueH].trim() === 'Paladin')) {
        sheet = '15ZkTJPedUIRQYujrHgnLRioxPEoFKT-7j4KjSHaqYPM'
        rangeSpecific = `ranges=${team[0][teamLeagueH]} Schedule!O5:X&ranges=${team[0][teamLeagueH]} Stats!D6:Q31&ranges=${team[0][teamLeagueH].replace(/[^\w\s]/gi, '')} Stat Database!B4:R`
    }else {
        rangeSpecific = `ranges=${team[0][teamLeagueH]} Schedule!O5:X&ranges=${team[0][teamLeagueH]} Stats!D6:Q31&ranges=${team[0][teamLeagueH].replace(/[^\w\s]/gi, '')} League Stat Database!B4:R`
        sheet = '1Is6nuVcggWi0hPImTRVcORYuGLffcHvM9rd8r6TbWZE'
    }
    let temp = getSheetsP4r[1]
    // console.log(temp['values'])
    let playerTeamH, playerPlayingH, playerMMRH
    playerTeamH = findHeaderCol(playerHeaders, "Team")
    playerPlayingH = findHeaderCol(playerHeaders, "Not Playing")
    playerMMRH = findHeaderCol(playerHeaders, "Tracker MMR")
    let players = temp['values'].filter(player => player[playerTeamH].toLowerCase() === id.toLowerCase() && player[playerPlayingH] === 'FALSE').sort(function(a, b){return b[playerMMRH]-a[playerMMRH]})
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
    }
}