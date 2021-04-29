## hw2: webpack

### 作業規範

Webpack 的目的其實就是讓前端也能夠像 Node.js 那樣，支援 `module.exports` 以及 `require`。

為了讓你體驗 Webpack，在這個作業中你只要做以下簡單的幾件事情就好：

寫一個檔案叫做 `utils.js`，裡面有一個叫做 add 的 function
寫一個檔案叫做 `index.js`
在 `index.js` 裡面引入 `add` 這個 function 並且輸出 `add (10, 3)`
用 Webpack 把以上檔案打包產生出 `bundle.js`

---

### 開始

#### step 1：事前準備

1.  webpack 安裝與設定檔 [（官方文件）](https://webpack.js.org/guides/getting-started/)

- 初始化 npm，產生 `package.json` 檔案
  => `npm init -y`

- 安裝 webpack
  => `npm install webpack webpack-cli --save-dev`
- 在根資料夾中建立 webpack 設定檔
  => `webpack.config.js`
- 編輯 webpack.config.js 內容

```
const path = require('path');

module.exports = {
  mode: 'development', // 預設:production模式。打包成比較看得懂的 development 模式
  entry: './src/index.js', // 入口程式的檔案路徑
  output: {
    path: path.resolve(__dirname, 'dist'), // 輸出的資料夾路徑與名稱
    filename: 'bundle.js', // 打包輸出後的檔案名稱
  },
};
```

2. 在根資料夾建立 `src` 與 `dist` 子資料夾， 將 `index.js` 與 `utils.js` 檔案放在 `src` 資料夾內

3. 在 package.json 檔案的 `scripts` 內添加一行
   => `"build": "webpack",`

4. 當要用 webpack 打包時，在 CLI 輸入 `npm run build` 指令即可

---

#### step 2：按照作業規範需求寫程式碼

1. index.html

```
<body>
  <div class="add"></div> // 秀 add 函式的結果
  <script src="./dist/bundle.js"></script> // 引入打包後的 bundle.js
</body>
```

2. utils.js

```
// export add 函式
export function add(a, b) {
  return a + b;
}
```

3. index.js

```
// 從utils.js 的檔案中引入 add 函式，這樣就可以直接使用 add 函式
import { add } from './utils';


// 選到 class name 為 add 的區塊，並將 add 函式的結果顯示其中
document.querySelector('.add').textContent = add(10, 3);
```

---

#### step 3：執行 webpack

1. CLI 指令：`npm run build`
2. 設定有更動，就自動執行 webpack

- 安裝 [dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) ： `npm install --save-dev webpack-dev-server`
- `webpack.config.js` 新增 dev-server 設定

```
devServer: {
    contentBase: './dist', //dev server 輸出的資料夾路徑與名稱
  },
```

- 在` package.json` 檔案的 `scripts` 內添加一行
  => `start": "webpack-dev-server --open",`
- 將 `index.html` 放在 `dist` 資料夾中，與 `bundle.js` 一起，然後修改引入 `bundle.js` 的路徑

```
<body>
  <div class="add"></div>
  <script src="bundle.js"></script>
</body>
```

- CLI 指令：`npm run start`
- 即可在 `localhost` 的 `server` 上看到即時結果

---

### 疑難排除

執行 `npm run start` 後出現下方錯誤提示：
`Error: Cannot find module 'webpack-cli/bin/config-yargs'`

```
// 當前的 package.json

"devDependencies": {
    "webpack": "^5.34.0",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
  }
```

[解法參考](https://github.com/webpack/webpack-cli/issues/1948)：

> If you upgrade webpack to 5. _, and webpack cli to 4. _, an error will be reported:
>
> Error: Cannot find module 'webpack-cli/bin/config-yargs'
> Temporary solution: Back off webpack cli to version 3. \* for example:
>
> "webpack-cli": "^ 3.3.12"

#### 解决：

1. 卸載 webpack-cli : `npm webpack-cli npm uninstall webpack-cli`
2. 安装 webpack-cli 3.\* 版本 : `npm install webpack-cli@3 -D`

```
// 重裝後的 package.json

devDependencies": {
    "webpack": "^5.34.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2"
  }
```
