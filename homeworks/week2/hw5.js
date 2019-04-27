function join(str, concatStr) {
  let newStr = '';
  if (str.length > 1) {
    for (let i = 0; i < str.length - 1; i += 1) {
      newStr += str[i] + concatStr;
    } return newStr + str[str.length - 1];
  }
  return str + concatStr;
}

function repeat(str, times) {
  let newStr = '';
  for (let i = 1; i <= times; i += 1) {
    newStr += str;
  } return newStr;
}

console.log(join('a', '!'));
console.log(repeat('a', 5));
