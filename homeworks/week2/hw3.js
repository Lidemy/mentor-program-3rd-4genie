// eslint-disable-next-line space-before-function-paren
function reverse(str) {
  let revStr = '';
  // 設定變數 i ，取出字串的最後一個字，放到revStr，然後再拿倒數第二個字，放到revStr，直到到字串的第一個字，
  for (let i = str.length - 1; i >= 0; i -= 1) {
    revStr += str[i];
  }
  // 印出revStr
  console.log(revStr);
}

reverse('hello');
