
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


export async function load ({params}) {
    let sheet;
    let range = `ranges=Articles!A2:C`
    let getAllRequests = await getSheets("1OK0Pd6A37gZZIT5m3f0TPi2i3FzCgNJAw9W4o-L14d0", range);
    let articles = getAllRequests[0];
    articles = articles['values'];
    articles = articles.filter(team => team[1])
    console.log(articles)
    return{
        articles : articles
    }
}