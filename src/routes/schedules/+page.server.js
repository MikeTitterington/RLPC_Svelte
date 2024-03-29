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

/** @type {import('./$types').PageServerLoad} */
export async function load ({ fetch, params }) {
    let rangeP4 = 'ranges=Major%20Schedule!O4:X4&ranges=Major%20Schedule!O5:X&ranges=AAA%20Schedule!O5:X&ranges=AA%20Schedule!O5:X&ranges=A%20Schedule!O5:X&ranges=Teams!A2:G97&ranges=Teams!A1:G1'
    let scheduleP4 = await getSheets(sheetsStoreP4, rangeP4)
    let rangeIndy = 'ranges=Independent%20Schedule!O5:X&ranges=Maverick%20Schedule!O5:X'
    let scheduleIndy = await getSheets(sheetsStoreIndy, rangeIndy)
    let Headers = scheduleP4[0]
    let scheduleDateH = findHeaderCol(Headers, "Day")
    let scheduleWinnerH = findHeaderCol(Headers, "Winner")
    let scheduleScoreH = findHeaderCol(Headers, "Score")
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
        fullSchedule = scheduleP4[1]['values'].concat(scheduleP4[2]['values'], scheduleP4[3]['values'], scheduleP4[4]['values'], scheduleIndy[0]['values'])
    } catch (error) {
        fullSchedule = []
    }
    fullSchedule = fullSchedule.filter(team => team[3])
    return{
        fullSchedule : fullSchedule,
        scheduleDateH : scheduleDateH,
        scheduleWinnerH : scheduleWinnerH,
        scheduleScoreH : scheduleScoreH,
        teams : teams
    }
}
