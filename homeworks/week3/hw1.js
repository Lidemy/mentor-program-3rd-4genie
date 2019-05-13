function stars(n) {
  const result = [];
  let storeStars = '';
  for (let i = 1; i <= n; i += 1) {
    storeStars += '*';
    result.push(storeStars);
  }
  return result;
}

console.log(stars(7));
module.exports = stars;
