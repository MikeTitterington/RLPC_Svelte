
var urlP4 = '1Is6nuVcggWi0hPImTRVcORYuGLffcHvM9rd8r6TbWZE'

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

export async function load () {
    let rangeP4 = 'ranges=Major%20League%20Stat%20Database!B3:O3&ranges=Major%20League%20Stat%20Database!B4:O&ranges=AAA%20League%20Stat%20Database!B4:O&ranges=AA%20League%20Stat%20Database!B4:O&ranges=A%20League%20Stat%20Database!B4:O&ranges=Teams!A2:G97&ranges=Teams!A1:G1&ranges=Independent%20League%20Stat%20Database!B4:O&ranges=Maverick%20League%20Stat%20Database!B4:O'
    let scheduleP4 = await getSheets(urlP4, rangeP4)
    let Headers = scheduleP4[0]
    let schedulePlayerH = findHeaderCol(Headers, "Player")
    console.log(schedulePlayerH)
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
