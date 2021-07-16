const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();


const apikey = ""

async function getSumId(summoner_name){
  const summoner_info_api = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summoner_name + "?api_key=" + apikey
  const response = await fetch(summoner_info_api)
  const data = await response.json()
  const sumID = data.id
  return sumID
}

async function getRankDivison(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const summoner_rank_div = data[0].tier
  return summoner_rank_div
}

async function getRankSubDivison(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const summoner_rank_subdiv = data[0].rank
  return summoner_rank_subdiv
}

async function getRankLp(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const lp = data[0].leaguePoints
  return lp
}

async function getRankWins(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const wins = data[0].wins
  return wins
}

async function getRankRatio(sumID){
  const rank_info_api = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(rank_info_api)
  const data = await response.json()
  const wins = data[0].wins
  const losses = data[0].losses
  var ratio = wins / losses
  return ratio.toFixed(2)
}

async function getChampMastery1(sumID){
  const champion_mastery_info_api = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(champion_mastery_info_api)
  const data = await response.json()
  const first_champ = data[0].championId



  const champion_id_list = "https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json"

  const response1 = await fetch(champion_id_list)
  const champions = await response1.json()
  //console.log(champions.data.Aatrox.image.full)
    for (var key in champions) {
    if (!champions.hasOwnProperty(key)) continue;

    var obj = champions[key];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        champ_id = obj[prop].key;

        if (champ_id == first_champ)
          return prop
      }
    }
  }

async function getChampMastery2(sumID){
  const champion_mastery_info_api = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(champion_mastery_info_api)
  const data = await response.json()
  const second_champ = data[1].championId


  const champion_id_list = "https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json"

  const response1 = await fetch(champion_id_list)
  const champions = await response1.json()
  //console.log(champions.data.Aatrox.image.full)
    for (var key in champions) {
    if (!champions.hasOwnProperty(key)) continue;

    var obj = champions[key];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        champ_id = obj[prop].key;

        if (champ_id == second_champ)
          return prop
        }
      }
    }

async function getChampMastery3(sumID){
  const champion_mastery_info_api = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + sumID + "?api_key=" + apikey
  const response = await fetch(champion_mastery_info_api)
  const data = await response.json()
  const third_champ = data[2].championId


  const champion_id_list = "https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json"

  const response1 = await fetch(champion_id_list)
  const champions = await response1.json()
      //console.log(champions.data.Aatrox.image.full)
    for (var key in champions) {
    if (!champions.hasOwnProperty(key)) continue;

    var obj = champions[key];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        champ_id = obj[prop].key;

        if (champ_id == third_champ)
          return prop
            }
          }
        }

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");

})


app.post("/", function(req, res) {
  const summoner_name = req.body.summoner_name;

  getSumId(summoner_name).then(sumID => {
    let promises = [getRankDivison(sumID),getRankSubDivison(sumID),getRankLp(sumID),getRankWins(sumID),getRankRatio(sumID),getChampMastery1(sumID),getChampMastery2(sumID),getChampMastery3(sumID)]
    Promise.all(promises)
    .then((result) => {
      for (let i = 0; i < promises.length; i++)
      {
        return res.render('userinfo',{division:result[0], subdivision:result[1], lp:result[2], wins:result[3], ratio:result[4], ChampMastery1:result[5], ChampMastery2:result[6], ChampMastery3:result[7]})
      }
    })
    .catch((err) => console.log(err))
  })
})

app.listen(3000)
