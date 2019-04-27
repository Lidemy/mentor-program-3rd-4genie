/* eslint-disable no-multi-spaces */

function printFactor(n) {
  for (let i = 0; i <= n; i += 1) {  // 設變數 i 為小於、等於參數 n 的元素
    if (n % i === 0) {               // 若 n 能被 i 整除，則印出 i
      console.log(i);
    }
  }
}

printFactor(10);
