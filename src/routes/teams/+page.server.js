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
    let p4Teams = [];
    let indyTeams = [];
    var url = sheetsStoreP4;
    let range = "ranges=Teams!A1:P1&ranges=Teams!A2:P17&ranges=Teams!A66:P81"
    let getRequest = await getSheets(url, range)
    let headers = getRequest[0] 
    let teamNameH = findHeaderCol(headers, "Team")
    let aff1H = findHeaderCol(headers, "AAA Affiliate")
    let aff2H = findHeaderCol(headers, "AA Affiliate")
    let aff3H = findHeaderCol(headers, "A Affiliate")
    let logoH = findHeaderCol(headers, "Logo")
    p4Teams = getRequest[1]['values']
    indyTeams = getRequest[2]['values']
    p4Teams = p4Teams.concat(indyTeams)
    let allTeams = p4Teams;
    return{
        allTeams : allTeams,
        teamNameH : teamNameH,
        aff1H : aff1H,
        aff2H : aff2H,
        aff3H : aff3H,
        logoH : logoH
    }
}