function isPalindromes(str) {
  const revStr = str.split('').reverse().join('');
  return str === revStr;
}

module.exports = isPalindromes;
