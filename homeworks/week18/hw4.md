## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？

以全自動洗脫烘洗衣機為例，通常會有個手動設定的功能，選擇這次洗衣服有哪些要做的事，像是洗衣、洗清、脫水、烘乾等，確認想要的流程內容後，按下啟動鍵後，就可以悠悠哉哉地去喝咖啡聊是非，等著洗衣機自動將所設定的流程跑完。

上面所描述的就像是 gulp 在做的事：自動化任務管理（task manager）。無論是想要壓縮圖片、壓縮 CSS 或 JS 程式碼，或將 SASS 轉譯為 CSS 等，設定你打算自動化處理的任務，然後執行 gulp，讓這些任務自動運作起來，不用再一個個分別去處理。 

那... webpack 呢？ 仔細想想洗衣服的細節喔，洗衣機是不是會需要選擇進水多少公升，10 升？ 20 升？還是 40 升？ 需要滾動多久？ 20 分鐘？ 30 分鐘？ 什麼時候放水？放多少水？...等，想像每個操作都是一項資源，我們可以將想要的資源引入，並且打包成一個模組叫做 " 標準洗衣 "

由於已經模組化一個叫做 "標準洗衣" 的功能，所以當我們要洗衣服時，只要點選 " 標準洗衣 " 的按鈕，就可以執行 " 標準洗衣 " 的相關操作。

webpack : 不同的模組化洗衣模式： 快洗、標準洗衣、大型衣物...
gulp：設定按下開始鍵後任務流程 => 標準洗衣，then 烘乾一小時

所以，webpack 也能作為 gulp 的一個任務


小結：
* gulp: 是一套任務管理工具（task manager）
目的：提供自動化與流程管理

* Webpack: 是一套模組整合工具（module bundler）
目的：將各種資源模組化打包，讓你可以像寫 node.js 一樣 import 各種檔案


### 可以不用 gulp 或 webpack 嗎？
可以不使用 gulp 與 webpack，只是隨著前端開發越來越複雜，根據需求使用合適的工具，會讓開發的過程更有效率。

## hw3 把 todo list 這樣改寫，可能會有什麼問題？

> 有一天，剛進新公司的小明臨時被主管指派擔任會議記錄人，小明為力求表現，鉅細靡遺的記下每個細節，洋洋灑灑寫了五頁的會議記錄。隔天早上提交給主管，主管瞄了一眼，指出 3 個要新增與改進的點，叫小明回去修改，認真的小明回到座位後，從會議記錄的第一個字開始重新謄寫一份，遇到要修改的地方，小明會記得改成主管想要的樣子。
> 
> 心裡暗咐著這次應該可以過關了吧的小明，隔天早上又將修改後的會議記錄呈報給主管過目，主管這次眼睛更利了，發現有幾個標點符號好像用錯了，叫小明改正，於是小明摸摸鼻子，踏著沉重的步伐回到位子上，又從第一個字開始重新謄寫一份。
> 
> 在主管眼裡，小明消耗相當多不必要的精力在修改會議記錄上，其實小明只要把不一樣的地方改過就好了，不需要每次都重寫一次。

hw3 的 todo list 改寫，雖然邏輯上很直觀，但由於大多情況下只有部分資料更新，這樣的寫法讓每次的更新都需重新 render 整個頁面，消耗資源在不必要的渲染上。


## CSS Sprites 與 Data URI 的優缺點是什麼？
### 什麼是 CSS Sprites？ 為什麼要用 CSS Sprites？

一般來說，當一個網頁裡面的圖片越多，使用者就必須花更多時間來讀取到這些圖片，例如：如果頁面中有 20 張小圖片（或 icon），由於網頁的每一個元素都產生一個 HTTP 請求（request），那麼頁面就會對伺服器發送 20 次載入圖片的請求。 

CSS Sprites 的原理就是把多張圖片合併到一張大圖中，這樣一來只要發送一次請求就夠，然後透過 CSS 語法中的 " background-image "、" background-repeat "、" background-position " 來定位各張圖片位置。 這樣的好處是加快了網頁載入速度，減少使用者等待圖片 loading 的時間。


#### CSS Sprites 的優點：
* **減輕伺服器的資源消耗，加快網頁讀取速度** : 一次載入一大張圖片，只需發送一次請求（request），節省資源，尤其當頁面中有一堆圖標時。
* **使用方便**：當遇到圖片寬高一致，例如社群軟體的 icon， 就很適合用 CSS sprites。

#### CSS Sprites 的缺點：
* **開發時比較麻煩**：由於需要定位，所以圖片尺寸要求要精確，尤其是各種不同尺寸的圖片，要集結成一張 Sprite 時會更加複雜，通常會需要其他工具輔助測量
* **不易維護**：只要有更動，整張圖都要更動，牽一髮而動全身
* **圖片可能會失真**：放大時會模糊，影響使用者體驗
* **把雞蛋放在同個籃子內** : 因為合併成一張大圖，若這張圖讀取失敗，或者這圖本來就是壞掉的，那所有圖示都會壞掉。

### 什麼是 Data URI ？ 為什麼要用 Data URI？
![](https://i.imgur.com/4rbXQl8.png)
[圖片來源](https://www.google.com/url?sa=i&url=https%3A%2F%2Fvolatileinnovation.com%2Flandscape-mountains-sky-4843193-jpg%2F&psig=AOvVaw1hIvFtqIyPaxlmTnsEhP5S&ust=1619226544293000&source=images&cd=vfe&ved=0CAkQjhxqFwoTCJjRz4qXk_ACFQAAAAAdAAAAABAD)

Data URI 是一種檔案格式，資料經由 `base64 編碼` 之後，以文字的方式來儲存，這樣的好處是可以直接寫進 HTML 或 CSS 中，省去原本抓取該圖檔的請求 （request）

Data URI 的格式：
```
data:[<mime type>][;base64],<data>
```

```
// 目前支援的 <mime type>
data:,
data:text/plain,
data:text/html,
data:text/html;base64,
data:text/css,
data:text/css;base64,
data:text/javascript,
data:text/javascript;base64,
data:image/gif;base64,
data:image/png;base64,
data:image/jpeg;base64,
data:image/x-icon;base64

// <data> 中寫入 base64 編碼後的文字
```
舉例示意：
```
// HTML

<body>
    <img src="data:image/gif;base64,Ah+QQJCgAHACwAAAAAIQAjAAADo3i63P4wykmrvTjrzZsxXfR94WMQBFh6RECuixHMLMkrbGrDQkAIfkECQoABwAsAQAAACAAIwAAA7N4utxmLcq5DCGQ6mnx/s6AZeD2BMFAlpSBpg+rua8KPiuDB3hexQYAIOYQDo1EXXC4HEaC0GOyglxOFc2s7yGE4AqSHc7WKODKBbDuhRox0uoJ/NcTEOeguUHA5xtsaTnKFKD6SlCnM2jHMLMkrbGrDQkAIfkECQoABwAsAQAAACAAIwAAA7N4utxmLcq5DCGQ6mnx/s6AZeD2BMFAlpSBpg+rua8KPiuDB3hexQYAIOYQDo1EXXC4HEaC0GOyglxOFc2s7yaGNrTB/qrAksLQZrBRmEw9gpr64TT5KwkWeYxvIEQkAOw==" />
</body>

*****************
// CSS
div { 
  background: url("data:image/jpg;base64,E4AqSHc7WKODKBbDuhRox0uoJ/NcTEOeguUHA5xtsaTnKFKD6SlCnM2jHMLMkrbwEAAAAAADYAAAAoAAAACAIAADkAOw==");
}
```

#### Data URI 的優點：
* 減少發送請求（request）的數量： CSS Sprite 至少一個 CSS 檔案與圖片檔，但 Data URI 是直接寫在 HTML 或 CSS 中，可以省去抓取該圖檔的請求
* 開發簡單：不像 CSS Sprite 需要算每個圖片的位置
* 樣式彈性：Data URI 是放在 `<img>` 標籤裡面的 `src` 屬性使用，不用像 CSS Sprites 把圖片變成 `background-image`，日後調整樣式時相對簡單

#### Data URI 的缺點：
* 由於不是圖檔資源，瀏覽器無法快取（cache）
* 當資料有變化就需要重新產生編碼
* 編碼後檔案會比較大
* 易讀性差：不像載入圖片時，很清楚檔名相關內容
* 不容易除錯：圖片有問題時沒辦法迅速地 debug
* IE8 以上的版本才有支援，且限制大小不可超過 32KB
* 對資安軟體來說，Data URI 增加了網頁內容檢驗的難度。
* 耗時：在 CSS 檔案中過多使用 Data URI 時，會增加首次渲染時間 (First Paint) 


#### Data URI 在以下情況可考慮使用：
* 不能使用 Background-image 時
* 使用的圖示時常變動
* 同一個圖示會有不同的大小並在不同地方顯示

參考來源：
* [一學 gulp 就上手](https://floraya.gitbooks.io/gulp/content/)@floraya
* [Gulp 教程](https://www.ityuan.com/doc/gulp-intro)
* [gulp 學習筆記](http://kejyun.github.io/gulp-learning-notes/index.html)@KeJyun
* [試著把切版專案升級到 gulp4.0 吧](https://ithelp.ithome.com.tw/users/20104132/ironman/2921)
* [[week 13] 前端工具之三 - gulp、webpack](https://hackmd.io/@Heidi-Liu/note-fe201-gulp-and-webpack)@Heidi-Liu
* [webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)
* [Webpack Tutorial 繁體中文 Gitbook](https://neighborhood999.github.io/webpack-tutorial-gitbook/)
* [Webpack 新手入門：模組打包工具的用途及 Webpack 工作方式的基本觀念](https://tw.alphacamp.co/blog/webpack-introduction)@Alpha Camp
* [如何用 Webpack 來打包 JavaScript、SCSS/CSS、HTML 網頁和任意檔案？](https://magiclen.org/webpack/)
* [什麼？！我們竟然有 3 個標準？ - 你有聽過 CommonJS 嗎？(Day9)](https://ithelp.ithome.com.tw/articles/10191478)@Alex Tzeng
* [谈谈 CSS Sprites 技术及其优化](http://www.woshipm.com/pd/1710.html)
* [CSS Sprites 简介以及优缺点](https://developer.51cto.com/art/201008/221830.htm)
* [[CSS 教學] - CSS Sprites Generator，快速產生網頁圖示，加快網頁載入速度](https://injerry.pixnet.net/blog/post/40928753)
* [使用 Compass 自動生成 CSS sprite、將小圖示合併成大圖](http://blog.shihshih.com/spriting-with-compass/)
* [CSS 教學 – CSS Sprite 網頁優化技巧入門](http://www.flycan.com/article/css/css-icon-sprite-1938.html)
* [基于 Webpack 的 css sprites 实现方案](https://segmentfault.com/a/1190000021484338)
* [從 CSS sprite 進化到 SVG sprite](https://muki.tw/tech/css-to-svg-sprite/)
* [Spriting with Compass](https://wcc723.github.io/css/2014/03/13/css-icon-sprites/)@卡伯斯
* [Compass 替代方案 (3) - 加入 SVG Sprites](https://wcc723.github.io/sass/2016/01/03/replace-compass-with-node-sass-3/)@卡伯斯
* [CSS sprites 背景圖自適應](http://tingmeow.pinkjelly.org/archives/243)
* [CSS Sprites: What They Are, Why They’re Cool, and How To Use Them](https://css-tricks.com/css-sprites/)
* [样式表贴图定位（CSS Sprites）：图像切片的死亡之吻](https://my.oschina.net/yaohaixiao/blog/123083)
* [前端中階作業：gulp & webpack](https://hugh-program-learning-diary-js.medium.com/%E5%89%8D%E7%AB%AF%E4%B8%AD%E9%9A%8E%E4%BD%9C%E6%A5%AD-gulp-webpack-cedf4b018be5)@Hugh
* [什么是 CSS Sprites 技术？](https://shiyousan.com/post/635368345803555297)
* [CSS Sprites](https://www.tutorialrepublic.com/css-tutorial/css-sprites.php)@TutorialRepublic
* [Day10– 前端小字典三十天【每日一字】– CSS Sprites](https://ithelp.ithome.com.tw/articles/10159215)
* [CSS Sprites Generator](https://www.toptal.com/developers/css/sprite-generator)
* [你知道 SVG Sprites 是什么吗，还在用 css sprite 就太 low 了](https://segmentfault.com/a/1190000016476981)
* [浅谈 CSS Sprites 雪碧图应用](https://segmentfault.com/a/1190000007686042)
* [使用 Sprite-Smith-Plugin 產生 CSS Sprite](https://ithelp.ithome.com.tw/articles/10201033?sc=iThelpR)
* [利用 Compass 自動合併小圖為 CSS Sprite 圖片及生成對應語法](https://terryl.in/zh/compass-generate-css-sprite-for-icons/)
* [Data URI 前端優化](https://medium.com/cubemail88/data-uri-%E5%89%8D%E7%AB%AF%E5%84%AA%E5%8C%96-d83f833e376d)
* [淺嚐 Data URI](https://blog.darkthread.net/blog/data-uri)
* [投向 Data URI 的懷抱！](https://neversaycoding.tumblr.com/post/96379343807/image-sprites-data-uri)
* [使用 DATA URI 將圖片以 Base64 編碼並內崁至網頁中，加速載入速度](https://blog.gtwang.org/web-development/minimizing-http-request-using-data-uri/)
* [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html)@yahoo developer
* [Data URIs](https://css-tricks.com/data-uris/)@css-tricks
* [細說 Data URI](https://www.ipshop.xyz/373.html)
* [[HTML] 小圖示使用 Data URI Scheme 提高網頁效能](https://blog.johnsonlu.org/html%E5%B0%8F%E5%9C%96%E7%A4%BA%E4%BD%BF%E7%94%A8data-uri-scheme%E6%8F%90%E9%AB%98%E7%B6%B2%E9%A0%81%E6%95%88%E8%83%BD/)
* [Data URL 介绍](https://m.html.cn/web/html/17805.html)
* [深挖 data URI 效能瓶頸](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/545378/)