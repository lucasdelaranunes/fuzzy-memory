if (localStorage.getItem('access_token') != null){
  access_token = localStorage.getItem('access_token')
  console.log("got token from localStorage, token:"); 
  console.log(access_token);
  document.getElementById('login').style.visibility = 'hidden';
  document.getElementById('logout').style.visibility = 'visible';
  document.getElementById('search').style.visibility = 'visible';
  document.getElementById('query').style.visibility = 'visible';

  let search = document.getElementById('search')
  const queryInput = document.getElementById('query');

} else if (window.location.hash != ''){
  pattern = /&token.*/;
  access_token = window.location.hash.substring(14);
  access_token = access_token.replace(pattern, '');
  console.log(access_token);
  localStorage.setItem('access_token', access_token);
  document.getElementById('login').style.visibility = 'hidden';
  document.getElementById('logout').style.visibility = 'visible';
  document.getElementById('search').style.visibility = 'visible';
  document.getElementById('query').style.visibility = 'visible';

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
  searchFiles(`fullText contains '${queryInput.value}'`, 10)
}

function searchFiles(q="", pageSize){
  document.getElementById('results-table').style.visibility = 'visible';
  let result = document.getElementById('result')
  result.innerHTML = ''

  console.log(q)

  fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=${pageSize}&supportsAllDrives=true&fields=files(id,name,mimeType)`, {
    method: 'GET',
    headers:new Headers({Authorization:"Bearer " + access_token})
  })
  .then((res) => res.json())
  .then((info) => {
    console.log(info)
    info.files.forEach(file => {
      let id = file.id
      result.innerHTML += `

      <tr>
        <td>
          <a target="_blank" href="https://drive.google.com/file/d/${file.id}">${file.name}</a>
        </td>
        <td>${file.mimeType}</td>
      `
    });

  })
}
  //LINK = https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lucasdelaranunes.github.io/fuzzy-memory/&prompt=consent&response_type=token&client_id=499617837412-k3gsjdg3hd9tg5u9ivdjdhnbj9ir30ki.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.readonly&access_type=online