async function logIn() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/EricRibeiro/nfl-rushing/master/rushing.json");
      const players = await response.json();
      console.log(players);
    } catch (e) {
      console.log(`Something went wrong while fetching the players.`);
      throw e;
    }
  }