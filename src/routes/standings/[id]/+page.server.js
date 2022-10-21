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
/** @type {import('./$types').PageServerLoad} */
    export async function load ({params}) {
        const id = params.id;
        const league = id;
        let division1, division2, division3, division4;
        let division1Name, division2Name, division3Name, division4Name;
        let team;
        let sheet;
        try {
            team = await getSheets(sheetsStoreP4, 'ranges=Teams!A2:G');
            team = team[0]
            team['values'] = team['values'].filter(team => team[0]);
            if(team == []){
                team = [[]]
            }
        } catch {
            team = [[]];
            console.log('team not found');
        }
        let range = `ranges=${id} Stats!C4:H10&ranges=${id} Stats!C11:H17&ranges=${id} Stats!C19:H25&ranges=${id} Stats!C26:H32`
        if (id === 'Independent' || id === 'Maverick' || id === 'Renegade' || id === 'Palidan') {
            sheet = sheetsStoreIndy
        }else {
            sheet = sheetsStoreP4
        }
        let fullStandings = await getSheets(sheet, range)
        try {
            division1 = fullStandings[0]
            division1 = division1['values'];
            division1Name = division1[0]
            division1 = division1.splice(2, division1.length - 1)
            division1.forEach(change => {
                let newteam = team['values'].filter(team => team[5].toLowerCase() === change[1].toLowerCase());
                change[0] = newteam[0][0];
                
            });
            
        } catch {
            console.log('standing not found')
        }
        try {
            division3 = fullStandings[1]
            division3 = division3['values'];
            division3Name = division3[0]
            division3 = division3.splice(2, division3.length - 1)
            division3.forEach(change => {
                let newteam = team['values'].filter(team => team[5].toLowerCase() === change[1].toLowerCase());
                change[0] = newteam[0][0];
                
            });
            
        } catch {
            console.log('standing not found')
        }
        try {
            division2 = fullStandings[2]
            division2 = division2['values'];
            division2Name = division2[0]
            division2 = division2.splice(2, division2.length - 1)
            division2.forEach(change => {
                let newteam = team['values'].filter(team => team[5].toLowerCase() === change[1].toLowerCase());
                change[0] = newteam[0][0];
                
            });
            
        } catch {
            console.log('standing not found')
        }
        try {
            division4 = fullStandings[3]
            division4 = division4['values'];
            division4Name = division4[0]
            division4 = division4.splice(2, division4.length - 1)
            division4.forEach(change => {
                let newteam = team['values'].filter(team => team[5].toLowerCase() === change[1].toLowerCase());
                change[0] = newteam[0][0];
                
            });
            
        } catch {
            console.log('standing not found')
        }
        if (league == 'Major') {
            division1 = division1.concat(division2, division3, division4)
            division1 = division1.filter(team => team[4] != '-')
            division1.sort((a, b) => { return parseInt(b[2].split('-')[0]) - parseInt(a[2].split('-')[0]) } )
        }
        
        return{
            division1 : division1,
            division1Name : division1Name,
            league : league,
            division2Name : division2Name,
            division3Name : division3Name,
            division4Name : division4Name,
            division2 : division2,
            division3 : division3,
            division4 : division4
        }
    }