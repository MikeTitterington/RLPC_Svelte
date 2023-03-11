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

async function getStandings(league, team, fullStandings, start){
    let division1;
    let division1Name;
    division1 = fullStandings.filter(team => team[1].toLowerCase() === league.toLowerCase()).splice(start, 4)
    // let test = [...division1[0]] 
    // division1Name = division1[0][3]
    let tempDiv = []
    division1.forEach(change => {
        let newteam = team['values'].filter(team => team[5].toLowerCase() === change[0].toLowerCase());
        let temp = []
        temp.push(change[11])
        temp.push(change[0])
        temp.push(change[change.length-3])
        temp.push(change[change.length-2])
        temp.push(change[change.length-1])
        temp.push(change[3])
        change = temp
        change[0] = newteam[0][0];
        tempDiv.push(change)
    });
    return tempDiv
}

/** @type {import('./$types').PageServerLoad} */
    export async function load ({fetch, params}) {
        const id = params.id;
        const league = id;
        let division1, division2, division3, division4 = [];
        let division1Name, division2Name, division3Name, division4Name = "";
        let fullStandings;
        let team;
        let sheet;
        if (league == 'Major' || league == 'AAA' || league == 'AA' || league == 'A' || id === 'Independent' || id === 'Maverick' || id === 'Renegade' || id === 'Palidan'){
            let range = `ranges=Standings!W17:AJ73`
            if (id === 'Independent' || id === 'Maverick' || id === 'Renegade' || id === 'Palidan') {
                sheet = sheetsStoreIndy
            }else {
                sheet = sheetsStoreP4
            }
            team = await getSheets(sheetsStoreP4, 'ranges=Teams!A2:G');
            fullStandings = await getSheets(sheet, range);
            team = team[0]
            team['values'] = team['values'].filter(team => team[0]);
            if(team == []){
                team = [[]]
            }
            division1 = await getStandings(league,team,fullStandings[0]['values'], 0)
            division1Name = division1[0][5]
            division2 = await getStandings(league,team,fullStandings[0]['values'], 4)
            division2Name = division2[0][5]
            division3 = await getStandings(league,team,fullStandings[0]['values'], 8)
            division3Name = division3[0][5]
            division4 = await getStandings(league,team,fullStandings[0]['values'], 12)
            division4Name = division4[0][5]
            let i = 0
            while(division1 === undefined && i < 10){
                i = i + 1
            }
            if (league == 'Major') {
                division1 = division1.concat(division2, division3, division4)
                division1 = division1.filter(team => team[2] != '0-0 (0-0)')
                division1.sort((a, b) => { return parseInt(b[2].split('-')[0]) - parseInt(a[2].split('-')[0]) } )
            }
            return{
                division1 : division1,
                division1Name : division1Name,
                league : id,
                division2Name : division2Name,
                division3Name : division3Name,
                division4Name : division4Name,
                division2 : division2,
                division3 : division3,
                division4 : division4
            }
        }
    }