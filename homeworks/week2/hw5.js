/* eslint-disable no-multi-spaces */
/* eslint-disable no-trailing-spaces */
// join 會接收兩個參數：一個陣列跟一個字串，會在陣列的每個元素中間插入一個字串，最後回傳合起來的字串。
// join 函式中有 str、concatStr兩個參數 

function join(str, concatStr) {
  let newStr = '';

  if (str.length > 1) {                            // 判斷 str 長度若大於 1
    for (let i = 0; i < str.length - 1; i += 1) {
      newStr += str[i] + concatStr;                // 則 str 每個元素中間插入 concatStr，除了最後一個元素，成為新字串
    } return newStr + str[str.length - 1];         // 回傳新的字串 + 最後一個元素
  }
  return str + concatStr;                          // 若str 長度小於 1，回傳str + concaStr
}

// repeat 的話就是回傳重複 n 次之後的字串。
// repeat 函式中有 str、times兩個參數 
function repeat(str, times) {
  let newStr = '';
  for (let i = 1; i <= times; i += 1) {
    newStr += str;
  } return newStr;
}

console.log(join('a', '!'));
console.log(repeat('a', 5));
