function onJsonChamp(json){
  const container1 = document.querySelector('#StandingSearch');
  const container2 = document.querySelector('#StandingPoints');
  container1.innerHTML='';
  container2.innerHTML='';

  console.log('cercopilota')
  const pilota = json.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;
  const punti = json.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;

  const winner=document.createElement('div');
  winner.textContent=pilota;
  const maxPoints=document.createElement('div');
  maxPoints.textContent=punti;

  document.querySelector('#StandingSearch').appendChild(winner);
  document.querySelector('#StandingPoints').appendChild(maxPoints);
}

function onResponseChamp(response){
  console.log('tornato il json per vincitore');
  return response.json();
}

function searchChamp(event){
  event.preventDefault();

  const anno=document.querySelector("#S_Search");
  const year=encodeURIComponent(anno.value);

  if(year>1950 && year<=2021 || year=='current'){
    
    console.log('Ricerca:' + year);
    rest_url = 'https://ergast.com/api/f1/' + year +'/driverStandings/1.json';

    console.log(rest_url);

    fetch(rest_url).then(onResponseChamp).then(onJsonChamp);
  }
}

function onJsonYT(json) {
  const divVideo = document.querySelector("#Videos");
  divVideo.innerHTML = '';

  const div = document.createElement('div');

  const length = json.pageInfo.resultsPerPage;

  for(let i=0; i<length ;i++) {
    const a = document.createElement('a');
    const br = document.createElement('br');
    let url = "https://www.youtube.com/watch?v=" + json.items[i].id.videoId;
    console.log(url);
    a.href = url;
    a.textContent = json.items[i].snippet.title;
    div.appendChild(a);
    div.appendChild(br)
  }

  divVideo.appendChild(div);
}

function onResponseYT(response) {
  console.log("tornato il json per YT")
  return response.json();
}

function searchYT(event) {
  event.preventDefault();

  const insert = document.querySelector("#Y_Search");
  const frase = encodeURIComponent(insert.value);

  console.log('Ricerca:' + frase);
  //la key che manca deve essere creata come API key su Google Apis & Services -> Credentials
  rest_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCqTbiQIDJVJGY7J3zI3P94nGhyP7I2qgo&type=video&q=' + frase;

  console.log(rest_url);

  fetch(rest_url).then(onResponseYT).then(onJsonYT);
}

function initClient() {
  gapi.client.init({
      'apiKey': 'AIzaSyCqTbiQIDJVJGY7J3zI3P94nGhyP7I2qgo',
      'clientId': '88637978657-gngstn8se8omddasq1f5p9cn31kekbu0.apps.googleusercontent.com',

      'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(function () {
      const GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}

const form1 = document.querySelector("#Champ");
const form2 = document.querySelector("#YT");
form1.addEventListener('submit', searchChamp);
form2.addEventListener('submit', searchYT);
console.log('Start');