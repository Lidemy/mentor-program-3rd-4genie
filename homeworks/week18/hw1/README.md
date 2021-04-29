### 作業規範

gulp 就是用來把原本的工作流程自動化的，現在請你寫一個 gulp 的設定檔，依序完成以下事情：

1. 把 scss 編譯成 css
2. 把 js 用 babel 轉成 ES5 語法
3. 把 css 以及 js 壓縮

--- 

### 開始
#### step 0：事前準備 

1. 根據 [gulp 官方文件](https://gulpjs.com/docs/en/getting-started/quick-start/)安裝 npm / node / gulp  
2. 在根資料夾中建立` gulpfile.js` 檔案 
---
#### step1 : 把 SASS 轉譯成 CSS 
1. 在根資料夾中新建 `./src/sass` 子資料夾，，將 `.sass` 檔案放在 `sass` 資料夾中

2.  CLI 指令安裝 `gulp-sass`，並照步驟新增 sass 轉 CSS 的 task
https://www.npmjs.com/package/gulp-sass
---
#### step2 : 把 js 用 babel 轉成 ES5 語法
1. 在根資料夾中新建 `./src/js` 子資料夾，將 `.js` 檔案放在 `./src/js` 資料夾中

2.  CLI 指令安裝 `gulp-babel`，並照步驟新增 bable 的 task
https://www.npmjs.com/package/gulp-babel
---
#### step3 : 把 CSS 與 JS 壓縮
1. CSS => 用 [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) 壓縮
2. JS => 用 [gulp-uglify ](https://www.npmjs.com/package/gulp-uglify)壓縮
---

#### step4 : 把 CSS 與 JS 壓縮後的檔案改名
用 [gulp-rename](https://www.npmjs.com/package/gulp-rename) 將壓縮後的後綴改為  `.min.css` /`.min.js` 

---

#### step5 : 加上 sourcemap
可加上 [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) 快速知道出錯的原始 Sass or JS 的位置

---
#### step6 : 加上 watch 監測，每當有更新時自動執 task
[官方文件 watch 說明](https://gulpjs.com/docs/en/getting-started/watching-files/)

---

### ☞ 成果： gulpfile.js



```
const { src, dest, watch } = require('gulp'); // 載入 gulp
const babel = require('gulp-babel'); // 載入 gulp-babel
const rename = require('gulp-rename'); // 載入 gulp-rename
const uglify = require('gulp-uglify'); // 載入 gulp-uglify
const cleanCSS = require('gulp-clean-css'); // 載入 gulp-clean CSS
const sourcemaps = require('gulp-sourcemaps'); // 載入 gulp-sourcemaps
const sass = require('gulp-sass'); // 載入 gulp-SASS
sass.compiler = require('node-sass'); // 載入 node 的 SASS compiler

// CSS： Sass 轉成 CSS 語法、壓縮
function compileCSS() {
  return src('src/sass/*.sass') // 指定要處理的原始 Sass 檔案目錄
    .pipe(sourcemaps.init()) // 初始化 sourcemap ，有 sourcemaps，可以快速知道出錯的原始 Sass 位置
    .pipe(sass().on('error', sass.logError)) // Sass 轉譯為 CSS
    .pipe(dest('./dist/css')) // 指定轉譯後的 CSS 要輸出的檔案目錄
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 將 CSS 去除空格，壓縮到最小化，且瀏覽器相容版本 ie8 以上
    .pipe(rename({ extname: '.min.css' })) // 將壓縮到最小化的 CSS 後綴改名為 min.css
    .pipe(sourcemaps.write('.')) // 生成 sourcemaps 文件 (.map)
    .pipe(dest('./dist/css')); // 指定壓縮後的 CSS 要輸出的檔案目錄
}

// JS： 轉成 ES5 語法、壓縮
function compileJS() {
  return src('src/js/*.js') // 指定要處理的原始 JavaScript 檔案目錄
    .pipe(sourcemaps.init()) // sourcemap 初始化，有 sourcemaps，可以快速知道出錯的原始 JS 位置
    .pipe(babel()) // 將 Javascript 轉為 ES5 版本
    .pipe(dest('./dist/js')) // 指定要輸出的 JavaScript 檔案目錄
    .pipe(uglify()) // 將 Javascript 去除空格，壓縮到最小化
    .pipe(rename({ extname: '.min.js' })) // 將壓縮到最小化的 Javascript 後綴改名為 min.js
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/js'));// 指定壓縮後的 JavaScript 要輸出的檔案目錄
}

exports.default = () => {
  // 監測 Sass 與 JS 如果有變動自動執行
  watch('src/sass/*.sass', compileCSS);
  watch('src/js/*.js', compileJS);
};

exports.compileCSS = compileCSS;
exports.compileJS = compileJS;

```