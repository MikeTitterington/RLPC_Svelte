
import { request } from 'undici';

import { env } from '$env/dynamic/private';
async function getSheets (url, range) {
    const {
        statusCode,
        headers,
        trailers,
        body
        } = await request('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values/' + range + '?key='+ env.API_KEY);
    let Output = await body.json()
    return await Output;
} 
export async function load ({params}) {
    const id = params.id;
    const league = params.league;
    let League = league
    let statTemp = id
    let stats, statsAdv, stat, statName;
    let avg = 0;
    let count = 0;
    try {
        stats = await getSheets("1Is6nuVcggWi0hPImTRVcORYuGLffcHvM9rd8r6TbWZE", `${league} League Stat Database!C4:R`)
        stats['values'].forEach(player => {
            if(player[0] != ''){
                avg = avg + parseInt(player[2])
                count = count + 1
                player[11] = parseFloat(player[11].substring(0, player[11].length - 1))
                player[12] = parseFloat(player[12].substring(0, player[12].length - 1))
            }
        });
        if (id === 'goals') {
            stat = 8
            statName = 'Goals Per Game'
        } else if (id === 'assists') {
            stat = 9
            statName = 'Assists Per Game'
        } else if (id === 'saves') {
            stat = 10
            statName = 'Saves Per Game'
        } else if (id === 'points') {
            stat = 14
            statName = 'Points Per Game'
        } else if (id === 'shooting') {
            stat = 11
            statName = 'Shooting %'
        } else if (id === 'wins') {
            stat = 12
            statName = 'Winning %'
        }
        avg = (avg/count)-3
        statsAdv = stats['values'].filter(team => team[2]>=avg && team[0] != '').sort(function(a, b){return parseFloat(b[stat])-parseFloat(a[stat])});
    } catch {
        console.log('s15 not found')
    }
    return{
        statsAdv : statsAdv,
        stat : stat,
        statName : statName,
        League : League,
        statTemp : statTemp
    }
}