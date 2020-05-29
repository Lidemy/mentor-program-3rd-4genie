/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// setting variable
const stream = document.querySelector(".stream");
const request = new XMLHttpRequest();
const gameName = "League%20of%20Legends";
const limit = 20;
const clientID = "j2bw85kq79noiaxesfmbp0tfdltvr7";

// 抓好資料的HTML
function showLiveStream(data) {
  for (let i = 0; i < data.streams.length; i += 1) {
    const result = document.createElement("div");
    result.classList.add("game");
    result.innerHTML = `
        <a href="${data.streams[i].channel.url}" target="_blank"><img class="live" src='${data.streams[i].preview.large}'></a>
        <div class="game__detail">
          <img class="game__avatar" src='${data.streams[i].channel.logo}'>
          <div class="game__info">
            <div class="game__info-status">${data.streams[i].channel.status}</div>
            <div class="game__info-name">${data.streams[i].channel.name}</div>
          </div>
        </div>
    `;
    stream.appendChild(result);
  }
}

// 向 twitch 抓 api 資料 , 將資料 render 到前端
function loadData() {
  request.open(
    "GET",
    `https://api.twitch.tv/kraken/streams/?game=${gameName}&limit=${limit}`,
    true
  );

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const json = JSON.parse(request.response);
      console.log(json);
      showLiveStream(json);
    } else {
      console.log(request.status);
    }
  };

  request.onerror = () => {
    console.log("err");
  };

  request.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
  request.setRequestHeader("Client-ID", clientID);
  request.send();
}

loadData();
