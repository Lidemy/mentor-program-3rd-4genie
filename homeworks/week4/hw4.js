const request = require('request');

const options = {
  url: 'https://api.twitch.tv/helix/games/top',
  headers: {
    'Client-ID': 'g79xv1ajh7dualmssudzls1n4gh5le',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode >= 200 && response.statusCode < 300) {
    const info = JSON.parse(body);
    const gameData = info.data;
    for (let i = 0; i < gameData.length; i += 1) {
      console.log(`${gameData[i].id} ${gameData[i].name}`);
    }
  }
}
request(options, callback);
