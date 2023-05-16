const API_KEY = 'AIzaSyCTS2patAnaBMK_nvqT4127g21b1PLpNBs';
const SEARCH_ENGINE_ID = '840c18d44097c4952';

if (localStorage.getItem('access_token') != null){
  access_token = localStorage.getItem('access_token')
  console.log("got token from localStorage, token:"); 
  console.log(access_token);
  document.getElementById('login').style.visibility = 'hidden';
  document.getElementById('logout').style.visibility = 'visible';


  let search = document.getElementById('search')

} else if (window.location.hash != ''){
  pattern = /&token.*/;
  access_token = window.location.hash.substring(14);
  access_token = access_token.replace(pattern, '');
  console.log(access_token);
  localStorage.setItem('access_token', access_token);
  document.getElementById('login').style.visibility = 'hidden';
  document.getElementById('logout').style.visibility = 'visible';


}

search.onclick = listFiles

async function logIn() {
    try {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lucasdelaranunes.github.io/fuzzy-memory/&prompt=consent&response_type=token&client_id=499617837412-k3gsjdg3hd9tg5u9ivdjdhnbj9ir30ki.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.readonly&access_type=online";
    } catch (e) {
      console.log(`Something went wrong while fetching the players.`);
      throw e;
    }
  }

  "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project."

function logOut() {

  localStorage.removeItem('access_token');

  fetch("https://oauth2.googleapis.com/revoke?token=" + access_token,
    {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
    .then((data) => {
        location.href = "https://lucasdelaranunes.github.io/fuzzy-memory/"
    })
}

function listFiles(){
  const queryInput = document.getElementById('query');
  searchFilesGoogleDrive(`fullText contains '${queryInput.value}'`, 10)
  searchGoogle(queryInput.value)

}


function addTable(){
  let siteResults = document.getElementById('siteResults')
  siteResults.innerHTML = ''

  siteResults.innerHTML +=`
    <div class='resultContainer'>
      <table id ="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Name of File</th>
            <th>Owner</th>
            <th>Last Modification</th>
          </tr>
        </thead>
          <tbody id="result"></tbody>
      </table>
    </div>
  `

}

function searchFilesGoogleDrive(q="", pageSize){
  let googleDriveResults = document.getElementById('googleDriveResults')
  googleDriveResults.innerHTML = ''  


  googleDriveResults.innerHTML +=`
    <div class='resultContainer'>
      <table id ="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Name of File</th>
            <th>Owner</th>
            <th>Last Modification</th>
          </tr>
        </thead>
          <tbody id="result"></tbody>
      </table>
    </div>
  `
  let result = document.getElementById('result')

  console.log(q)

  fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=${pageSize}&supportsAllDrives=true&fields=files(id,iconLink,name,owners,modifiedTime)`, {
    method: 'GET',
    headers:new Headers({Authorization:"Bearer " + access_token})
  })
  .then((res) => res.json())
  .then((info) => {
    console.log(info)
    info.files.forEach(file => {
      let date = new Date(file.modifiedTime).toDateString()
      let id = file.id
      result.innerHTML += `

      <tr> 
        <td>
          <img src=${file.iconLink}>
        </td>
        <td>
          <a target="_blank" href="https://drive.google.com/file/d/${file.id}">${file.name}</a>
        </td>
        <td>
          <img id="ownerimg" src=${file.owners[0].photoLink}>
          ${file.owners[0].displayName}
        </td>
        <td>
          ${date}
        </td>
      `
    });

  })
}

async function searchGoogle(q=""){
  let siteResults = document.getElementById('siteResults')
  siteResults.innerHTML = ''
  siteResults.innerHTML +=`
  <p class='resultsCount' id = 'resultsCount'></p>
  `
  let resultsCount = document.getElementById('resultsCount')

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${q}`);
  const data = await response.json();

  if (data.items) {
    
    console.log(data)
    resultsCount.innerHTML = `About ${data.searchInformation.formattedTotalResults} results in ${data.searchInformation.formattedSearchTime} seconds.`
    data.items.forEach(item => {
      const title = item.title;
      const description = item.snippet;
      const thumbnail = item.pagemap.cse_thumbnail ? item.pagemap.cse_thumbnail[0].src : null;
      const link = item.link;

      siteResults.innerHTML += `
        <div class='resultContainer'>
          <h3 class='title'>
            <a class='result' href=${link} data-linkId='4'>
                ${title}
            </a>
          </h3>
          <span class='url'>${link}</span>
          <span class='description'>${description}</span>
        </div>
      `
    });
  }
}