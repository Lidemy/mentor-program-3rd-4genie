/* eslint-disable quotes */
/* eslint-disable no-alert */
// 設定變數
const body = document.querySelector("body");
const button = document.querySelector(".btn");
let startTime = 0;

// 設定1~3 秒隨機時間內更換背景顏色，
function randomChangeColor() {
  // 設定 1~3 秒隨機時間。
  // 因為接下來使用的 setTimeout 用的為毫秒(1000 毫秒 = 1 秒)，
  const randomTime = (Math.random() * 2 + 1) * 1000;

  setTimeout(() => {
    body.classList.add("bg-color"); // 改變背景顏色
    startTime = new Date(); // 紀錄背景顏色改變時的時間
  }, randomTime);
}

// 設置初始狀態
function reset() {
  randomChangeColor();
  body.classList.remove("bg-color");
  button.classList.add("hide");
}

// 監聽 body 的 click 事件
body.addEventListener("click", (e) => {
  // 如果點擊"再試一次" 回到初始狀態
  if (e.target.classList.contains("btn")) {
    reset();
  } else {
    // 如果點擊的是畫面其他地方，則根據是否有按鈕、畫面是否變色等條件來執行相應動作
    if (!button.classList.contains("hide")) {
      return;
    }
    if (e.target.classList.contains("bg-color")) {
      const clickTime = new Date();
      const totalTime = (clickTime - startTime) / 1000;
      alert(`你的成績為${totalTime}秒`);
    } else {
      alert("別急，還沒開始啦");
    }

    button.classList.remove("hide");
  }
});

randomChangeColor();
