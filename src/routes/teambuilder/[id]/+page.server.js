
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
export async function load ({page}) {
    const league = page.params.id;
    let temp = await getSheets('1Is6nuVcggWi0hPImTRVcORYuGLffcHvM9rd8r6TbWZE', 'ranges=Players!A2:AF&ranges=MMR%20Cutoff%20Calculations!A21:A41')
    console.log(temp)
    let teamsIndy = temp[0]['values'].sort(function(a, b){return b[8]-a[8]});
    let cap = temp[1]['values'];
    let capSpace = "999999"
    if (league == "Major") {
        capSpace = cap[0]
    }else if (league == "AAA"){
        capSpace = cap[4]
    }else if (league == "AA"){
        capSpace = cap[8]
    }else if (league == "A"){
        capSpace = cap[12]
    }else if (league == "Independent"){
        capSpace = cap[16]
    }else if (league == "Maverick"){
        capSpace = cap[20]
    }
    let filteredPlayers = teamsIndy.filter(player => player[0]).filter(player => player[5]==league)
    return{props: {filteredPlayers, capSpace}}
}