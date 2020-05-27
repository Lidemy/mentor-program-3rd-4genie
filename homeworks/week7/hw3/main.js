/* eslint-disable operator-linebreak */
/* eslint-disable radix */
/* eslint-disable quotes */
// 設定變數
// 用 DOM 選取計算機 app 最上層的父元素 wrapper
const calculator = document.querySelector(".wrapper");
const result = document.querySelector(".result"); // 用 DOM 選取 result
let resultBeforeOperator = 0;
let useOperator = false; // 一開始設定沒有使用運算子
let operator = "";

// 監聽計算機最上層的父元素 .wrapper
calculator.addEventListener("click", (e) => {
  // 判斷當按下按鈕若為數字時
  // 如果按下的按鈕為數字
  if (e.target.classList.contains("number")) {
    // 則判斷 result 的內容是否為 0
    if (result.textContent === "0") {
      // 當result 為 0 且按下小數點時
      if (e.target.textContent === ".") {
        // result 變為 0 加上 小數點
        result.textContent += e.target.textContent;
      } else {
        // 當 result 為 0 且按下數字時， result 直接變為按下的數字
        result.textContent = e.target.textContent;
      }
      // 若判斷 result 不為 0 且 已使用了運算子
    } else if (result.textContent !== "0" && useOperator) {
      // 先將目前 result 內容歸零
      result.textContent = "";
      // result 變為按下的數字
      result.textContent = e.target.textContent;
      // 運算子設定為 false
      useOperator = false;
    } else {
      // 都不符合上面情況時，result 等於按下的數字向右增加
      result.textContent += e.target.textContent;
    }
  }

  // 判斷當按下按鈕若為運算子時
  // 如果按下的按鈕為運算子
  if (e.target.classList.contains("operator")) {
    // 紀錄目前的 result
    resultBeforeOperator = result.textContent;
    // 變數 operator 紀錄點擊的運算子按鈕為加減乘除的哪一個
    operator = e.target.textContent;
    // 將運算子使用設為 true
    useOperator = true;
  }

  // 判斷當按下按鈕若為等於時
  // 如果按下的按鈕為等於
  if (e.target.classList.contains("equal")) {
    // 判斷之前按的運算子若為"加號"
    if (operator === "+") {
      // result 則為按下加號前後的兩個 result 相加
      result.textContent =
        parseInt(resultBeforeOperator) + parseInt(result.textContent);
      // 判斷之前按的運算子若為"減號"
    } else if (operator === "-") {
      // result 則為按下加號前的後兩個 result 相減
      result.textContent =
        parseFloat(resultBeforeOperator) - parseFloat(result.textContent);
    }
  }

  // 判斷當按下按鈕若為 AC 時
  // 如果按下的按鈕為 AC
  if (e.target.textContent === "AC") {
    // result 的內容歸零
    result.textContent = "0";
  }
});
