
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
    const {
        statusCode,
        headers,
        trailers,
        body
        } = await request('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values:batchGet?' + range + '&key='+ env.API_KEY);
    let Output = await body.json()
    return await Output['valueRanges'];
} 


export async function load ({params}) {
    const League = params.id;
    let sheet;
    let range = `ranges=Teams!A2:G97&ranges=${League} Stats!D6:Q31`
    if (League == "Independent" || League == "Maverick" || League == "Renegade" || League == "Palidan"){
        sheet = sheetsStoreIndy
    }else{
        sheet = sheetsStoreP4
    }
    let getAllRequests = await getSheets(sheet, range);
    let team = getAllRequests[0];
    let teams = team['values'];
    let teamsName = [];
    let getTeamStats;
    getTeamStats = getAllRequests[1]
    teams.forEach(element => teamsName.push(element[5].toLowerCase()));
    let statsTemp = getTeamStats['values'].filter(team => team[0] && team[team.length-1] != '#VALUE!')
    let stats = statsTemp.filter(team => teamsName.includes(team[0].toLowerCase()))
    return{
        stats : stats,
        League : League
    }
}