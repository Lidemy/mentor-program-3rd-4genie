/* eslint-disable no-multi-spaces */
// eslint-disable-next-line space-before-function-paren

// 設定變數 i ，取出字串的最後一個字，放到revStr，然後再拿倒數第二個字，放到revStr，直到到字串的第一個字，
function reverse(str) {
  let revStr = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    revStr += str[i];
  }

  console.log(revStr);                           // 印出revStr
}

reverse('hello');
