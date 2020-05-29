/* eslint-disable operator-linebreak */
/* eslint-disable no-alert */
/* eslint-disable quotes */
// setting variable
const body = document.querySelector("body");
const title = document.querySelector(".title");
const button = document.querySelector(".btn");
const request = new XMLHttpRequest();
const url =
  "https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery";

// 根據 api 回傳內容，顯示不同獎項的畫面
function sendLottryReques() {
  request.open("GET", url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);
      body.className = "";
      if (response.prize === "FIRST") {
        body.classList.add("first");
        title.textContent = "恭喜你中頭獎了！日本東京來回雙人遊！";
      } else if (response.prize === "SECOND") {
        body.classList.add("second");
        title.textContent = "二獎！90 吋電視一台！";
      } else if (response.prize === "THIRD") {
        body.classList.add("third");
        title.textContent =
          "恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！";
      } else if (response.prize === "NONE") {
        body.classList.add("none");
        title.textContent = "銘謝惠顧";
      } else {
        title.textContent = "";
        alert("系統不穩定，請再試一次");
      }
      button.textContent = "再抽一次!";
    }
  };
  request.onerror = () => {
    console.log(request.status, request.responseText);
  };
  request.send();
}

// 監聽 button
button.addEventListener("click", (e) => {
  if (e.target.textContent === "再抽一次!") {
    window.location.reload();
  } else {
    sendLottryReques();
  }
});
