const express = require('express');
const fetch = require('node-fetch');

const app = express();

const apikey = "RGAPI-8262f31e-8851-42dd-b448-390d80fa0f91"

async function getSumId(){
  const summoner_info_api = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/seqoivvnq?api_key=" + apikey
  const response = await fetch(summoner_info_api)
  const data = await response.json()
  const sumID = data.id
  return sumID
}

async function getRankedStats(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const summoner_rank_div = data[0].tier
  const summoner_rank_subdiv = data[0].rank
  const wins = data[0].wins
  const losses = data[0].losses
  const lp = data[0].leaguePoints
  var ratio = wins / losses
}

async function getChampMastery(sumID){
  const champion_mastery_info_api = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(champion_mastery_info_api)
  const data = await response.json()
  const first_champ = data[0].championId
  const second_champ = data[1].championId
  const third_champ = data[2].championId


  const champion_id_list = "https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json"
  const response1 = await fetch(champion_id_list)
    const champions = await response1.json()
    for (var key in champions) {
    if (!champions.hasOwnProperty(key)) continue;

    var obj = champions[key];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        champ_id = obj[prop].key;

        if (champ_id == first_champ)
          console.log(prop)
        else if (champ_id == second_champ)
          console.log(prop)
        else if (champ_id == third_champ)
          console.log(prop)
      }
    }
  }




app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");

  getSumId().then(sumID => {
    console.log(sumID)
    getRankedStats(sumID)
    getChampMastery(sumID)
    })



  })



app.post("/", function(req, res) {
})

app.listen(3000)
