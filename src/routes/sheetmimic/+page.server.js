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
    let rangeP4 = 'ranges=Players!A1:AJ1&ranges=Players!A2:AJ'
    let fullSchedule = await getSheets(sheetsStoreP4, rangeP4)
    let Headers = fullSchedule[0]
    let PlayerH = findHeaderCol(Headers, "Username")
    let PlayingH = findHeaderCol(Headers, "Not Playing")
    fullSchedule = fullSchedule[1]['values']
    fullSchedule = fullSchedule.filter(team => team[PlayingH] != 'TRUE' && (team[4] != "Free Agent" && team[4] != "Draftee" && team[4] != "Waitlist"))
    
    fullSchedule = fullSchedule.sort(function(a,b) {
        const nameA = a[4].toUpperCase(); // ignore upper and lowercase
        const nameB = b[4].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return{
        fullSchedule : fullSchedule
    }
}
