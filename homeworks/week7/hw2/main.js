/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable quotes */

// 設定變數
const textRequired = document.querySelectorAll(".form_text_required");
const radioRequired = document.querySelectorAll(".form_radio_required");
const other = document.querySelector(".other");
const form = document.querySelector(".form");

/** *****************************************************
有未填寫的必填的欄位，背景顏色變為粉紅色，並且提示這是必填問題
******************************************************* */
for (let i = 0; i < textRequired.length; i += 1) {
  const remindBg = textRequired[i].parentElement.classList;
  textRequired[i].addEventListener("blur", (e) => {
    if (!textRequired[i].value) {
      remindBg.add("bg__reminder");
    } else {
      remindBg.remove("bg__reminder");
    }
  });
}

/** ***************************************************
當必填的欄位都已填好時， 列出回覆內容，並跳出報名成功的提示
***************************************************** */
function submitSuccess() {
  // 列出單選格式中選取的內容
  radioRequired.forEach((item) => {
    if (item.checked) {
      console.log(`${item.id} : ${item.checked}`);
    }
  });

  // 列出文字型格式的回覆內容
  textRequired.forEach((item) => {
    console.log(`${item.name}: ${item.value}`);
  });

  // 列出'其他'的回覆內容
  console.log(`other: ${other.value}`);

  alert("報名成功！");
}

/** ***************************************
有未填寫的必填的欄位，跳出提示，並且不送出表單
**************************************** */
function submitFail(e) {
  alert("還有必填的地方喔!");
  e.preventDefault();
}

/** ***************************************
      監聽當 form 表單按下 submit 時
**************************************** */
form.addEventListener("submit", (e) => {
  let success = true;
  // 再一次檢查文字型的必填欄位是否都已填
  for (let i = 0; i < textRequired.length; i += 1) {
    const remindBg = textRequired[i].parentElement.classList;
    if (!textRequired[i].value) {
      if (!remindBg.contains("bg__reminder")) {
        remindBg.add("bg__reminder");
      }
      success = false;
    }
  }

  // 檢查表單必填的地方是否都有填寫，如果都有，就送出表單並且 console 回覆內容 ，如果有缺，則跳出提醒。
  if (success) {
    submitSuccess();
  } else {
    submitFail(e);
  }
});
