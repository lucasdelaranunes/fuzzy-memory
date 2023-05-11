async function logIn() {
    try {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lucasdelaranunes.github.io/fuzzy-memory/&amp;prompt=consent&amp;response_type=token&amp;client_id=499617837412-k3gsjdg3hd9tg5u9ivdjdhnbj9ir30ki.apps.googleusercontent.com&amp;scope=https://www.googleapis.com/auth/drive.readonly&amp;access_type=online";
      //const response = await fetch("https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lucasdelaranunes.github.io/fuzzy-memory/&amp;prompt=consent&amp;response_type=token&amp;client_id=499617837412-k3gsjdg3hd9tg5u9ivdjdhnbj9ir30ki.apps.googleusercontent.com&amp;scope=https://www.googleapis.com/auth/drive.readonly&amp;access_type=online");
      //const players = await response.json();
      //console.log(players);
    } catch (e) {
      console.log(`Something went wrong while fetching the players.`);
      throw e;
    }
  }

  //LINK = https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lucasdelaranunes.github.io/fuzzy-memory/&prompt=consent&response_type=token&client_id=499617837412-k3gsjdg3hd9tg5u9ivdjdhnbj9ir30ki.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.readonly&access_type=online