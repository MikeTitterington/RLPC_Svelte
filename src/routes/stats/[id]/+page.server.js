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

/** @type {import('./$types').PageServerLoad} */
export async function load ({fetch, params}) {
    const id = params.id;
    let stats, goals, assists, saves, points, shooting, winning, league;
    league = id
    let avg = 0;
    let count = 0;
    let i = 0
    try {
        stats = await getSheets(sheetsStoreP4, league+' League Stat Database!C4:R')
        stats['values'].forEach(player => {
            if(player[0] != ''){
                avg = avg + parseInt(player[2])
                count = count + 1
                player[11] = parseFloat(player[11].substring(0, player[11].length - 1))
                player[12] = parseFloat(player[12].substring(0, player[12].length - 1))
            }
        });
        avg = avg/count
        goals = stats['values'].sort(function(a, b){return b[8]-a[8]});
        goals = goals.slice(0, 5)
        i = 1
        goals.forEach(element => {
            element.push(i)
            i = i+1
        });
        goals = JSON.parse(JSON.stringify(goals))
    } catch {
        console.log('s15 not found2')
    }
    try {
        assists = stats['values'].sort(function(a, b){return b[9]-a[9]})
        assists = assists.slice(0, 5)
        i = 1
        assists.forEach(element => {
            element.push(i)
            i = i+1
        });
        assists = JSON.parse(JSON.stringify(assists))
    } catch(e) {
        console.log(e)
    }
    try {
        saves = stats['values'].sort(function(a, b){return b[10]-a[10]});
        saves = saves.slice(0, 5)
        i = 1
        saves.forEach(element => {
            element.push(i)
            i = i+1
        });
        saves = JSON.parse(JSON.stringify(saves))
    } catch {
        console.log('s15 not found')
    }
    try {
        points = stats['values'].sort(function(a, b){return parseFloat(b[14])-parseFloat(a[14])});
        points = points.slice(0, 5)
        i = 1
        points.forEach(element => {
            element.push(i)
            i = i+1
        });
        points = JSON.parse(JSON.stringify(points))
    } catch {
        console.log('s15 not found')
    }
    try {
        shooting = stats['values'].sort(function(a, b){return parseFloat(b[11])-parseFloat(a[11])})
        shooting = shooting.slice(0, 5)
        i = 1
        shooting.forEach(element => {
            element.push(i)
            i = i+1
        });
        shooting = JSON.parse(JSON.stringify(shooting))
    } catch {
        console.log('s15 not found')
    }
    try {
        stats['values'] = stats['values'].sort(function(a, b){return parseFloat(b[12])-parseFloat(a[12])})
        winning = stats['values'].slice(0, 5);
        i = 1
        winning.forEach(element => {
            element.push(i)
            i = i+1
        });
        winning = JSON.parse(JSON.stringify(winning))
    } catch {
        console.log('s15 not found')
    }
    return{
        goals : goals,
        assists : assists,
        saves : saves,
        points : points,
        shooting : shooting,
        winning : winning,
        league : league
        }
}