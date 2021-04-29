// eslint-disable-next-line no-unused-vars
import { add } from './utils'; // 從utils.js 的檔案中引入 add 函式，這樣就可以直接使用 add 函式

// 選到 class name 為 add 的區塊，並將 add 函式的結果顯示其中
document.querySelector('.add').textContent = add(10, 30);
