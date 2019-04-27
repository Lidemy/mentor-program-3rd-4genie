// eslint-disable-next-line space-before-function-paren
function capitalize(str) {
  // 如果字串的第一個字母為小寫英文字母，則轉換成大寫
  if (str[0] >= 'a' && str[0] <= 'z') {
    const cap = str[0].toUpperCase();
    // restStr 為字串第二個以後的所有的字
    let restStr = '';
    for (let i = 1; i < str.length; i += 1) {
      restStr += str[i];
    }
    // newStr 為大寫的第一個字母加後面的restStr
    const newStr = cap + restStr;
    // 回傳newStr
    return newStr;
  }
  // 若字串的第一個字母不為小寫英文字母，則不需要轉換成大寫，回傳原字串
  return str;
}

console.log(capitalize('hello'));
