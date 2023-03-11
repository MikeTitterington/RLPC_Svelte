
import { request } from 'undici';

import { env } from '$env/dynamic/private';

async function getSheets (url, range) {
    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+url+'/values:batchGet?' + range + '&key='+ env.API_KEY)
    const Output = await res.json()
    return await Output['valueRanges'];
}

    let teamMap = {
        "ascension": {
        "1": " #ffcf56",
        "2": " #18020c",
        "3": " #000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771051087062630430/Ascension_Logo.png"
        },
        "bulls": {
        "1": "#4c2719",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771051080858468363/Bulls_Logo.png"
        },
        "cobras": {
        "1": "#f49d37",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771051085514539048/Cobras_Logo.png"
        },
        "ducks": {
        "1": "#226f54",
        "2": "#f6aa1c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049884321054720/Ducks_Logo.png"
        },
        "eagles": {
        "1": "#0072bb",
        "2": "#9cf6f6",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049887906791464/Eagles_Logo.png"
        },
        "flames": {
        "1": "#f49d37",
        "2": "#18020c",
        "3": "#f72c25",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/679756528567451683/Flames_Logo.png"
        },
        "hawks": {
        "1": "#f42b03",
        "2": "#000001",
        "3": "#d3d5d7",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049891488464927/Hawks_Logo.png"
        },
        "kings": {
        "1": "#ffd046",
        "2": "#000001",
        "3": "#d3d5d7",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/648721158174146580/Kings_Logo.png"
        },
        "lions": {
        "1": "#d3d5d7",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049894517014578/Lions_Logo.png"
        },
        "lumberjacks": {
        "1": "#393a10",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049897256288266/Lumberjacks_Logo.png"
        },
        "panthers": {
        "1": "#f42b03",
        "2": "#890620",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049902117224468/Panthers_Logo.png"
        },
        "pirates": {
        "1": "#960200",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/641071922712412174/Pirates_Logo.png"
        },
        "sharks": {
        "1": "#1f487e",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049903723511888/Sharks_Logo.png"
        },
        "spartans": {
        "1": "#5f5aa2",
        "2": "#d3d5d7",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049907149865000/Spartans_Logo.png"
        },
        "storm": {
        "1": "#fcba04",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/699287932447621190/Storm_Logo.png"
        },
        "whitecaps": {
        "1": "#c9f9ff",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771049910224814080/Whitecaps_Logo.png"
        },
        "bobcats": {
        "1": "#f42b03",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053393082318858/Bobcats_Logo.png"
        },
        "bulldogs": {
        "1": "#c7ccdb",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053399206264922/Bulldogs_Logo.png"
        },
        "dolphins": {
        "1": "#b8e1ff",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/648718145338736650/Dolphins_Logo.png"
        },
        "entropy": {
        "1": "#f49d37",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053405337681920/Entropy_Logo.png"
        },
        "geese": {
        "1": "#393a10",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053411755491328/Geese_Logo.png"
        },
        "heat": {
        "1": "#f49d37",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053416562032660/Heat_Logo.png"
        },
        "knights": {
        "1": "#18020c",
        "2": "#e9df00",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053345845674020/Knights_Logo.png"
        },
        "osprey": {
        "1": "#ee2e31",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053352686977064/Osprey_Logo.png"
        },
        "owls": {
        "1": "#4c230a",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/654074318631862282/Owls_Logo.png"
        },
        "pioneers": {
        "1": "#656839",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053359012642816/Pioneers_Logo.png"
        },
        "raiders": {
        "1": "#d3d5d7",
        "2": "#e9df00",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/654074118492389376/Raiders_Logo.png"
        },
        "thunder": {
        "1": "#e9df00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053364338360340/Thunder_Logo.png"
        },
        "tigers": {
        "1": "#f49d37",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053370752106506/Tigers_Logo.png"
        },
        "trojans": {
        "1": "#18020c",
        "2": "#e9df00",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053378343927848/Trojans_Logo.png"
        },
        "tundra": {
        "1": "#2660a4",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/677666710169583647/Tundra_Logo.png"
        },
        "vipers": {
        "1": "#ff8c42",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771053385294020658/Vipers_Logo.png"
        },
        "avalanche": {
        "1": "#000001",
        "2": "#4ecdc4",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/667163655065829403/Avalanche_Logo.png"
        },
        "bandits": {
        "1": "#18020c",
        "2": "#000001",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055539521191997/Bandits_Logo.png"
        },
        "barracuda": {
        "1": "#2660a4",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/768905494941007882/Barracuda_Logo.png"
        },
        "dukes": {
        "1": "#18020c",
        "2": "#881600",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/663779106583740446/Dukes_Logo.png"
        },
        "falcons": {
        "1": "#5bc3eb",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/648727754711498793/Falcons_Logo.png"
        },
        "herons": {
        "1": "#a4af69",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771069879373660180/Herons_Logo.png"
        },
        "inferno": {
        "1": "#e57c04",
        "2": "#bf1a2f",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055542869295174/Inferno_Logo.png"
        },
        "jaguars": {
        "1": "#f42b03",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055545598869564/Jaguars_Logo_3.png"
        },
        "lightning": {
        "1": "#f7d002",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/768223943085129728/Lightning_Logo.png"
        },
        "lynx": {
        "1": "#18020c",
        "2": "#f7d002",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055549412409354/Lynx_Logo_2.png"
        },
        "mustangs": {
        "1": "#4c1c00",
        "2": "#000001",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055552147095602/Mustangs_Logo_2.png"
        },
        "pulsars": {
        "1": "#32936f",
        "2": "#387d7a",
        "3": "#2bc016",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055554603778068/Pulars2.png"
        },
        "pythons": {
        "1": "#ff8c42",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055558321111080/Pythons_Logo_3.png"
        },
        "voyagers": {
        "1": "#0c8346",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055561604595722/Voyagers_Logo_2.png"
        },
        "vultures": {
        "1": "#587291",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/663389725188423680/Vultures_Logo.png"
        },
        "warriors": {
        "1": "#7c238c",
        "2": "#7c72a0",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771055564604178442/Warriors_Logo_2.png"
        },
        "cardinals": {
        "1": "#a22c29",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/663392854227419136/Cardinals_Logo.png"
        },
        "cougars": {
        "1": "#f7b32b",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/696145820034269224/Cougars_Logo_2.png"
        },
        "embers": {
        "1": "#dc493a",
        "2": "#a22c29",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771072411239972904/Embers_Logo.png"
        },
        "eskimos": {
        "1": "#e3ebff",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/655261559970594826/Eskimos_Logo.png"
        },
        "genesis": {
        "1": "#4392f1",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/641101909658173450/genesisfinal2.png"
        },
        "gulls": {
        "1": "#f49d37",
        "2": "#000001",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/648718182772768768/Gulls_Logo.png"
        },
        "jesters": {
        "1": "#fed766",
        "2": "#2ab7ca",
        "3": "#fe4a49",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/654074080810631178/Jesters_Logo.png"
        },
        "leopards": {
        "1": "#f42b03",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771056600773165146/Leopards_Logo_2.png"
        },
        "miners": {
        "1": "#e8c547",
        "2": "#698f3f",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771056602873724938/Miners_Logo_3.png"
        },
        "pelicans": {
        "1": "#5c80bc",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/663779353095700530/Pelicans_Logo.png"
        },
        "rattlers": {
        "1": "#a2c7e5",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/654740981815574529/Rattlers_Logo.png"
        },
        "ravens": {
        "1": "#bd1e1e",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/663389781732098068/Ravens_Logo.png"
        },
        "stallions": {
        "1": "#d68c45",
        "2": "#e0e0ce",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/654074869943762955/Stallions_Logo.png"
        },
        "tempest": {
        "1": "#e6c229",
        "2": "#000001",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771056606829084702/Tempest_Logo_2.png"
        },
        "titans": {
        "1": "#698f3f",
        "2": "#c1b2ab",
        "3": "#18020c",
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/648720610704228362/Titans_Logo.png"
        },
        "wranglers": {
        "1": "#ff2e00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771056608150290462/Wranglers_Logo.png"
        },
        "the snowmen": {
        "logo": "https://cdn.discordapp.com/attachments/755840403080478832/894604384216969246/The_Snowmen_Logo.png",
        "1": "#61F2D9"
        },
        "admirals": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058776466784286/Admirals_Logo.png",
        "1": "#FFEC00"
        },
        "dragons": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058785246511175/Dragons_Logo.png",
        "1": "#EF4136"
        },
        "beavers": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/715361176707399741/Beavers_Logo.png",
        "1": "#DC9E37"
        },
        "cyclones": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/717733534101668010/Cyclones_Logo.png",
        "1": "#4D7ED1"
        },
        "grizzlies": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058779232010250/Bears_Logo.png",
        "1": "#845F45"
        },
        "centurions": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058781915578399/Centurions_Logo.png",
        "1": "#F7931E"
        },
        "yellow jackets": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/730457373126426654/Yellow_Jackets_logo.png",
        "1": "#EEB51D"
        },
        "galaxy": {
        "logo": "https://cdn.discordapp.com/attachments/755840403080478832/767476330643193886/Galaxy_Logo.png",
        "1": "#360980"
        },
        "sockeyes": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058789113397268/Sockeyes_Logo.png",
        "1": "#FF0000"
        },
        "wolves": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058773192212496/Wolves_Logo.png",
        "1": "#7DD4FF"
        },
        "wildcats": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058794045767730/Wildcats_Logo.png",
        "1": "#004FFC"
        },
        "rhinos": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/734490021079548005/Rhinos_Logo.png",
        "1": "#CCCCCC"
        },
        "scorpions": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/730457572397678592/Scorpions_Logo.png",
        "1": "#E31E27"
        },
        "thrashers": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058791676117012/Thrashers_Logo.png",
        "1": "#723E00"
        },
        "toucans": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/730457120654229584/Toucans_logo.png",
        "1": "#E59040"
        },
        "wizards": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771058797326106694/Wizards_Logo.png",
        "1": "#5E0088"
        },
        "captains": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060591338061874/Captains_Logo.png",
        "1": "#57639E"
        },
        "yetis": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060585554378762/Yetis_Logo.png",
        "1": "#4ABAD4"
        },
        "otters": {
        "logo": "https://cdn.discordapp.com/attachments/421796377303973888/755863732193591418/Otters_Logo.png",
        "1": "#ED8027"
        },
        "tides": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060583024820254/Tides_Logo.png",
        "1": "#A8E2FF"
        },
        "pandas": {
        "logo": "https://cdn.discordapp.com/attachments/324268285703094273/730511590088245268/Pandas_Logo.png",
        "1": "#8EC63F"
        },
        "samurai": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060577840660490/Samurai_Logo.png",
        "1": "#FCD075"
        },
        "hornets": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060644685545512/Hornets_Logo.png",
        "1": "#FFD219"
        },
        "solar": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771075279300329512/Solar_Logo.png",
        "1": "#FFB133"
        },
        "piranhas": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060572245983303/Piranhas_Logo.png",
        "1": "#FF0000"
        },
        "terriers": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060579968090122/Terriers_Logo.png",
        "1": "#EB1C24"
        },
        "jackrabbits": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060566437396500/Jackrabbits_Logo_2.png",
        "1": "#24A7E9"
        },
        "zebras": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060588239126528/Zebras_Logo.png",
        "1": "#5E5E5E"
        },
        "camels": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/738138000264790106/Camels_Logo.png",
        "1": "#5E5E5E"
        },
        "raptors": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771079922302713856/Raptors_Logo.png",
        "1": "#A08E10"
        },
        "macaws": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771060569527681064/Macaws_Logo.png",
        "1": "#57B367"
        },
        "mages": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771077495772020751/Mages_Logo.png",
        "1": "#7D3149"
        },
        "pilots": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063046398279720/Pilots_Logo.png",
        "1": "#364B82"
        },
        "werewolves": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063068092137472/Werewolves_Logo.png",
        "1": "#FF5572"
        },
        "wolverines": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063561769320478/Wolverines_Logo.png",
        "1": "#794310"
        },
        "hurricanes": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063041957167134/Hurricanes_Logo.png",
        "1": "#39AAFF"
        },
        "koalas": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063714668347422/Koalas_Logo.png",
        "1": "#06C633"
        },
        "vikings": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063059607322674/Vikings_Logo.png",
        "1": "#FF0000"
        },
        "fireflies": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063033735938138/Fireflies_logo.png",
        "1": "#BC5BA3"
        },
        "comets": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063030410772571/Comets_Logo.png",
        "1": "#915CF7"
        },
        "stingrays": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063054770634792/Stingrays_Logo.png",
        "1": "#FF2B2B"
        },
        "hounds": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063037507403776/Hounds_Logo.png",
        "1": "#407BFF"
        },
        "warthogs": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063064194842624/Warthogs_Logo.png",
        "1": "#467EC7"
        },
        "gorillas": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/730458225488691210/Gorillas_Logo.png",
        "1": "#36802D"
        },
        "coyotes": {
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/717733513574744074/Coyotes_Logo.png",
        "1": "#CFC59A"
        },
        "harriers": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771078759486455857/Harriers_Logo.png",
        "1": "#E2142D"
        },
        "puffins": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771063050143793222/Puffins_Logo.png",
        "1": "#50CFE0"
        },
        "witches": {
        "logo": "https://cdn.discordapp.com/attachments/696962499177742476/771081662460985344/Witches_Logo.png",
        "1": "#68187A"
        },
        "turtles": {
        "1": "#ff2e00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/715062285554548746/Turtles_logo.png"
        },
        "rams": {
        "1": "#ff2e00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/421796377303973888/758719416321441892/Rams_Logo_2.png"
        },
        "cowboys": {
        "1": "#ff2e00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/421796377303973888/758723087909781543/Cowboys_Logo_2.png"
        },
        "flowerhorns": {
        "1": "#ff2e00",
        "2": "#18020c",
        "3": "#000001",
        "logo": "https://cdn.discordapp.com/attachments/394574231066640387/715062260480999464/Flowerhorns_Logo.png"
        }
    };
    
/** @type {import('./$types').PageServerLoad} */
    export async function load ({fetch, params}) {
        const rank = params.id;
        let powerRankings;
        let league = rank;
        let range = 'ranges=Streamer Copy Pastes!E2:E17&ranges=Streamer Copy Pastes!F2:F17&ranges=Streamer Copy Pastes!G2:G17&ranges=Streamer Copy Pastes!H2:H17&ranges=Streamer Copy Pastes!I2:I17&ranges=Streamer Copy Pastes!J2:J17&ranges=Streamer Copy Pastes!K2:K17&ranges=Streamer Copy Pastes!L2:L17&ranges=Streamer Copy Pastes!M2:M17'
        try {
            let allPowerRankings = await getSheets("1mDV2D9MRoYX-7f4eBDlllvBq-kewCFQ6kRbCf3ML6uk", range)
            if (league == 'Major'){
                powerRankings = allPowerRankings[0]['values']
                league = 'Major'
            } else if (league == 'AAA'){
                powerRankings = allPowerRankings[1]['values']
                league = 'AAA'
            } else if (league == 'AA'){
                powerRankings = allPowerRankings[2]['values']
                league = 'AA'
            } else if (league == 'A'){
                powerRankings = allPowerRankings[3]['values']
                league = 'A'
            } else if (league == 'Independent'){
                powerRankings = allPowerRankings[4]['values']
                league = 'Indy'
            } else if (league == 'Maverick'){
                powerRankings = allPowerRankings[5]['values']
                league = 'Mav'
            } else if (league == 'Renegade'){
                powerRankings = allPowerRankings[6]['values']
                league = 'Renegade'
            } else if (league == 'IndyOrg'){
                powerRankings = allPowerRankings[7]['values']
                league = 'Indy Org'
            } else if (league == 'P4Org'){
                powerRankings = allPowerRankings[8]['values']
                league = 'P4 Org'
            }
        } catch (e){
            console.log(e)
        }
        

        
        var i = 1;
        var powerRankingsLocal = [];
        var tempAr2 = powerRankings;
        if (tempAr2) {
            tempAr2.forEach(function(tempN) {
                var powerRankingsLocalTemp = {id:i}
                if (i > 8){
                    powerRankingsLocalTemp['left'] = 500;
                    powerRankingsLocalTemp['top'] = (i-8) * 100;
                }else {
                    powerRankingsLocalTemp['left'] = 0;
                    powerRankingsLocalTemp['top'] = (i) * 100;
                }
                powerRankingsLocalTemp['team'] = tempN[0].trim().replace(',', "");
                var lower = tempN[0].trim().toLowerCase().replace(',', "");
                if (teamMap.hasOwnProperty(lower.toLowerCase())) {
                    powerRankingsLocalTemp['logo'] = teamMap[lower]['logo'];
                    powerRankingsLocalTemp['color'] = teamMap[lower]['1'];
                }
                powerRankingsLocal.push(powerRankingsLocalTemp);
                i = i + 1;
            })
            powerRankings = powerRankingsLocal
        }
        return{
            powerRankings : powerRankings,
            league : league
        }
    }