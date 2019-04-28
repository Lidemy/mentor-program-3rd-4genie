/* eslint-disable no-multi-spaces */
// eslint-disable-next-line space-before-function-paren

function capitalize(str) {
  if (str[0] >= 'a' && str[0] <= 'z') {
    const cap = str[0].toUpperCase();        // 如果字串的第一個字母為小寫英文字母，則轉換成大寫
    let restStr = '';
    for (let i = 1; i < str.length; i += 1) {
      restStr += str[i];                     // restStr 為字串第二個以後的所有的字
    }
    const newStr = cap + restStr;            // newStr 為大寫的第一個字母加後面的restStr
    return newStr;                           // 回傳newStr
  }
  return str;                // 若字串的第一個字母不為小寫英文字母，則不需要轉換成大寫，回傳原字串
}

console.log(capitalize('hello'));
