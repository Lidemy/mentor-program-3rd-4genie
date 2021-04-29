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
