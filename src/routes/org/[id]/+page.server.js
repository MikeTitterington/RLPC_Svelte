
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

export async function load ({fetch, params}) {
    const id = params.id;
    let team = [[]];
    let filtTeam = []
    let schedule, teamStats, sheet, control, getSheetsP4r
    let rangeP4 = 'ranges=Teams!A2:V113&ranges=Old%20Players!A2:AF&ranges=Teams!A1:P1&ranges=Old%20Players!A1:AF1&ranges=P4%20Org%20Draft%20Pick%20List!M3:W&ranges=Independent%20Org%20Draft%20Pick%20List!M3:W&ranges=MMR%20Cutoff%20Calculations!A21:A41'
    let teamHeaders,playerHeaders,teamNameH,aff1H,aff2H,aff3H, playerTeamH,playerMMRH,playerPlayingH, majorCap, aaaCap, aaCap, aCap, indyCap, mavCap

    try {
        getSheetsP4r = await getSheets(sheetsStoreP4, rangeP4);
        teamHeaders = getSheetsP4r[2]
        playerHeaders = getSheetsP4r[3]
        teamNameH = findHeaderCol(teamHeaders, 'Team');
        team = getSheetsP4r[0];
        let cap = getSheetsP4r[getSheetsP4r.length-1]['values'];
        majorCap = cap[0]
        aaaCap = cap[4]
        aaCap = cap[8]
        aCap = cap[12]
        indyCap = cap[16]
        mavCap = cap[20]
        team['values'].forEach(teamCheck => {
            if(teamCheck[12] == id){
                console.log(teamCheck[6])
                if(teamCheck[6] == "AAA"){
                    aaaCap = parseInt(aaaCap)-parseInt(teamCheck[teamCheck.length-1])
                }
            }else if(teamCheck[12] == id){
                console.log(teamCheck[6])
                if(teamCheck[6] == "AA"){
                    aaCap = parseInt(aaCap)-parseInt(teamCheck[teamCheck.length-1])
                }
            }else if(teamCheck[12] == id){
                console.log(teamCheck[6])
                if(teamCheck[6] == "A"){
                    aCap = parseInt(aCap)-parseInt(teamCheck[teamCheck.length-1])
                }
            }else if(teamCheck[12] == id){
                console.log(teamCheck[6])
                if(teamCheck[6] == "Independent"){
                    indyCap = parseInt(indyCap)-parseInt(teamCheck[teamCheck.length-1])
                }
            }else if(teamCheck[12] == id){
                console.log(teamCheck[6])
                if(teamCheck[6] == "Maverick"){
                    mavCap = parseInt(mavCap)-parseInt(teamCheck[teamCheck.length-1])
                }
            }
        });
        team = team['values'].filter(team => team[teamNameH].toLowerCase() === id.toLowerCase());
        getSheetsP4r[4] = getSheetsP4r[4]['values'].filter(teama => teama[1].toLowerCase() === id.toLowerCase())
        getSheetsP4r[5] = getSheetsP4r[5]['values']
        if (getSheetsP4r[4].length == 0){
            filtTeam = getSheetsP4r[5].filter(teama => teama[1].toLowerCase() === id.toLowerCase())
            team[0].push(filtTeam[0])
        }else {
            team[0].push(getSheetsP4r[4][0])
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
    let players = temp['values'].filter(player => (player[playerTeamH].toLowerCase() === id.toLowerCase() || orgTeams.includes(player[playerTeamH].toLowerCase())) && player[playerPlayingH] === 'FALSE' && player[playerPlayingH-9] === 'Y').sort(function(a, b){return b[playerMMRH]-a[playerMMRH]})
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