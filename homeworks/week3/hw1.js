function stars(n) {
  const result = [];
  let storeStars = '';
  for (let i = 1; i <= n; i += 1) {
    storeStars += '*';
    result.push(storeStars);
  }
  return result;
}

module.exports = stars;
