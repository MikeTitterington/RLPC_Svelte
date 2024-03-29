import { request } from 'undici';
import {sheetsP4, sheetsIndy} from '../../stores/store.js'
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

export async function load ({fetch}) {
    let rangeP4 = 'ranges=Major%20League%20Stat%20Database!B3:O3&ranges=Major%20League%20Stat%20Database!B4:O&ranges=AAA%20League%20Stat%20Database!B4:O&ranges=AA%20League%20Stat%20Database!B4:O&ranges=A%20League%20Stat%20Database!B4:O&ranges=Teams!A2:G97&ranges=Teams!A1:G1&ranges=Independent%20League%20Stat%20Database!B4:O&ranges=Maverick%20League%20Stat%20Database!B4:O'
    let scheduleP4 = await getSheets(sheetsStoreP4, rangeP4)
    let Headers = scheduleP4[0]
    let schedulePlayerH = findHeaderCol(Headers, "Player")
    let scheduleGoalsH = findHeaderCol(Headers, "Goals per game")
    let scheduleAssistsH = findHeaderCol(Headers, "Assists per game")
    let scheduleSavesH = findHeaderCol(Headers, "Saves per game")
    let scheduleShootingH = findHeaderCol(Headers, "Shooting %")
    let scheduleWinningH = findHeaderCol(Headers, "Winning %")
    let teamHeaders = scheduleP4[6]
    let teamNameH = findHeaderCol(teamHeaders, "Team")
    let teams = scheduleP4[5]['values'].sort(function(a,b) {
        const nameA = a[teamNameH].toUpperCase(); // ignore upper and lowercase
        const nameB = b[teamNameH].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    let fullSchedule;
    try {
        fullSchedule = scheduleP4[1]['values'].concat(scheduleP4[2]['values'], scheduleP4[3]['values'], scheduleP4[4]['values'], scheduleP4[7]['values'], scheduleP4[8]['values'])
    } catch (error) {
        fullSchedule = []
    }
    fullSchedule = fullSchedule.filter(team => team[3])
    return{
        fullSchedule : fullSchedule,
        schedulePlayerH : schedulePlayerH,
        scheduleGoalsH : scheduleGoalsH,
        scheduleAssistsH : scheduleAssistsH,
        scheduleSavesH : scheduleSavesH,
        teams : teams,
        scheduleShootingH : scheduleShootingH,
        scheduleWinningH : scheduleWinningH
    }
}
