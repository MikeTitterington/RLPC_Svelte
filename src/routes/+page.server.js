import { request } from 'undici';
import {sheetsP4, sheetsIndy} from '../stores/store.js'
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
export async function load ({ params }) {
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
    if(scheduleP4[1]['values']){
        scheduleP4[1]['values'] = scheduleP4[1]['values'].filter(winner => winner[scheduleWinnerH])
        scheduleP4[2]['values'] = scheduleP4[2]['values'].filter(winner => winner[scheduleWinnerH])
        scheduleP4[3]['values'] = scheduleP4[3]['values'].filter(winner => winner[scheduleWinnerH])
        scheduleP4[4]['values'] = scheduleP4[4]['values'].filter(winner => winner[scheduleWinnerH])
        scheduleIndy[0]['values'] = scheduleIndy[0]['values'].filter(winner => winner[scheduleWinnerH])
        scheduleIndy[1]['values'] = scheduleIndy[1]['values'].filter(winner => winner[scheduleWinnerH])
    }
    try {
        fullSchedule = scheduleP4[1]['values'].splice(scheduleP4[1]['values'].length-4, scheduleP4[1]['values'].length).concat(scheduleP4[2]['values'].splice(scheduleP4[2]['values'].length-8, scheduleP4[2]['values'].length)).concat(scheduleP4[3]['values'].splice(scheduleP4[3]['values'].length-8, scheduleP4[3]['values'].length)).concat(scheduleP4[4]['values'].splice(scheduleP4[4]['values'].length-8, scheduleP4[4]['values'].length)).concat(scheduleIndy[0]['values'].splice(scheduleIndy[0]['values'].length-8, scheduleIndy[0]['values'].length)).concat(scheduleIndy[1]['values'].splice(scheduleIndy[1]['values'].length-8, scheduleIndy[1]['values'].length))
    } catch (error) {
        console.log(error)
        fullSchedule = []
    }
    let range = `ranges=Articles!A2:C`
    let getAllRequests = await getSheets("1OK0Pd6A37gZZIT5m3f0TPi2i3FzCgNJAw9W4o-L14d0", range);
    let articles = getAllRequests[0];
    articles = articles['values'];
    articles = articles.filter(team => team[1]).splice(articles.length-4, articles.length)
    fullSchedule = fullSchedule.filter(team => team[3])
    return{
        fullSchedule : fullSchedule,
        scheduleDateH : scheduleDateH,
        scheduleWinnerH : scheduleWinnerH,
        scheduleScoreH : scheduleScoreH,
        teams : teams,
        articles : articles
    }
}
