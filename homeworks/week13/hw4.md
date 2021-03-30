## Bootstrap 是什麼？

### Bootstrap 介紹

Bootstrap 是一套前端 framwork，一開始是由 Twitter 的設計師 Mark Otto 和 Jacob Thornton 合作開發，並在 2011 年發表首個版本。如今，Bootstrap 已成為網站開發中廣為熟知的前端框架與開源項目之一。

Bootstrap 的目標是達到響應式設計與行動裝置優先，這句話是什麼意思呢？ 也就是希望網站的排版可以根據每個使用者裝置的螢幕大小不同去做調整。

使用後會發現 Bootstrap 有點像小時候玩樂高積木時的每一塊小積木，它已經預先設計一整套規範好、可重覆使用的樣式與元件，開發者只要像在看百貨公司的型錄一樣，找到想要的樣式或元件，直接使用就可以很快地完成切版以及簡單的特效。

再舉生活化的例子來說：

> 小明邀請暗戀已久的小美明天來家裡吃飯，為了令小美對自己有好感，小明特地跑去跟和藹可親的祖母要了一道百年祖傳且傳子不傳賢的咖哩飯食譜，沒想到，這道食譜中光是製作咖哩醬就要熬煮並不眠不休攪拌七七四十九個小時，估計是來不及明天準備好，小明為了省事以及快速方便，想到一個辦法，於是到全 X 超市買了一盒廠商已經調配並包裝好的咖哩塊，祈禱這盒咖哩塊搭配著自己一片真心切的紅蘿蔔與馬鈴薯，能夠順利感動到小美。
> Bootstrap 提供的樣式，就相當於這盒事先調配並包裝好的咖哩塊， 讓使用者在需要的時候可以快速使用，但也如同用咖哩塊煮出的咖哩飯，好處是一般來說有一定的水準保證，不至於太難吃，而且省時間；不過因為容易上手，很多人都會煮，所以口味可預料且大同小異，不如客製化的咖哩來的有特色。

### 使用 Bootstrap 的優點：

1. **提高開發的效率**：短時間開發出想要的效果，減少工程師開發上調整 UI 細節所需的時間
2. **豐富的樣式與元件**：Bootstrap 提供了詳細的文件。可以找到排版、導覽列、按鈕、表單、表格、導航、圖像輪播、jQuery 插件等教學文件。Bootstrap 的 CSS 樣式是使用 CSS 預處理器 Less 和 Sass 編譯，所以如果有需要，可從源頭的程式碼定製自己想要的樣式。
3. **響應式設計以及網格系統**：Bootstrap 的目標是達到響應式設計與行動裝置優先，讓網頁的排版在電腦、平板、手機等不同裝置，根據螢幕尺寸調整
4. **新手較易上手**：新手只要有基本的 HTML 及 CSS 的基本排版概念，就能開始使用 Bootstrap，也透過 Bootstrap 的原始碼，學習如何架構 HTML 和 CSS, 如何組織 CSS 與命名 CSS 的 class，觀摩專業的 CSS 設定細節。
5. **一致性**：在 Bootstrap 的規範下，能夠產出具有一致性風格的網頁畫面；同時，相同的規範，也確保了不同專案或同專案不同開發者，在程式碼上撰寫的一致性，方便維護與溝通。
6. **支持資源豐富**： Bootstrap 從 2001 年到現在已累積一定聲譽，在許多專案上被充分的使用和測試、維護和紀錄。且由於是開源專案，社群資源也滿豐富的，幾乎遇到的常見問題都可以找到相關地討論

### 使用 Bootstrap 的缺點：

1. **太相似**：流行且容易上手是 Bootstrap 的優點，但看多了 Bootstrap 做出来的網站，會覺得美的很像同一个模樣，就像草間彌生撞臉董至成
   ![](https://i.imgur.com/Nnhoyfz.jpg)
   [圖片來源](https://star.ettoday.net/news/1011158)
2. **檔案太肥**：對小專案來說 Bootstrap 檔案所佔的容量大，而且大部分的程式碼也許都用不到，會導致網站載入速度變慢，影響使用者體驗。
3. **太依賴**：只依賴 Bootstrap 框架，當專案複雜度增加，debug 難度有可能隨之增加，包括框架本身帶的 bug。
4. **不夠語義化**：class 命名不夠語義化，且有大量的縮寫
5. **不夠彈性**：遇到網站有大量的客製需求，需大規模地重新定製 CSS 樣式，使用 Bootstrap 的意義就變得不大。
6. **瀏覽器不兼容**：瀏覽器 IE6 以下的低版本不兼容

### Bootstrap 的使用方法

> 1.直接連 BootstrapCDN or 下載 Bootstrap 的編譯檔到自己的電腦後引入 2.到官方文件尋找需要的元素，然後複製到自己 HTML 再進行修改

1. 直接連 BootstrapCDN

- 到 Bootstrap 官方網站的 [Getting Started](https://getbootstrap.com/docs/4.5/getting-started/introduction)
- 根據說明，複製 CSS 與 Javascript 的 link
  ![](https://i.imgur.com/tw9DEWW.jpg)
- CSS 的` <link>` 標籤放在 `<head>`標籤裡，記得將自己寫的 CSS 放在 Bootstrap 的 CSS 後面，以免被覆蓋。
- JavaScript 的 jQuery、Popper.js、和 Bootstrap 這 3 支檔案的 link 放在`</body>`標籤之前。寫自己的 JavaScript 檔案，應該放在它們之後，以免被覆蓋。

2. 下載 Bootstrap 的編譯檔到自己的電腦後引入

- 到 Bootstrap 官方網站的 [Download](https://getbootstrap.com/docs/4.5/getting-started/download/)
- 把下載後的檔案分別放在上述的`<head>` 與`</body>` 標籤中，只是位置改成本地端

參考來源：

- [Bootstrap 官方網站](https://getbootstrap.com/)
- [Bootstrap 是什麼？給網頁設計新手的 Bootstrap 4 入門教學](https://tw.alphacamp.co/blog/bootstrap-4-introduction)
- [[鼠年全馬鐵人挑戰] Week15 - 超新手學前端 - Bootstrap 4 概念筆記](https://ithelp.ithome.com.tw/articles/10231448)
- [淺析 bootstrap 以及優缺點](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/243521/)
- [Bootstrap 的优点和缺点是什么？](https://www.html.cn/framework/bootstrap/18048.html)
- [使用 bootstrap 框架有什么好处？](https://www.html.cn/framework/bootstrap/17863.html)
- [bootstrap 框架优点有哪些](https://m.php.cn/bootstrap/425591.html)
- [Bootstrap 框架有哪些缺点？](https://www.zhihu.com/question/20821791)

### 什麼是網格系統（grid system） ？

網格系統（grid system）是一種平面設計常用的版面規劃，透過固定的格子切分版面，後來也運用在網站與手機的頁面上。

以網站為例，網格系統通常會將一定寬度的頁面切分成數欄（column），欄跟欄之間有間隙（gutter），且為了視覺舒適度，不會將元素填滿整個頁面，會在兩旁留白（grid padding）。透過調整欄寬、間隙寬、留白寬這三個數字控制排版的疏密、方便版面在不同螢幕尺寸進行縮放。

> 設計頁面的總寬 = 所有的欄寬 + 間隙寬+ 留白寬

![](https://i.imgur.com/nEroPxo.png)
[圖片來源](https://fayshuwei.wordpress.com/2018/12/02/week-9/)

目前，主流的網格系統多為切成十二個欄位（column）或十六個欄，並以十二欄為多。為什麼會選 12 這個數字呢？ 是因為 12 是 1、2、3、4、6 的最小公倍數，如此一來，每一個 row（列）的網格樣式可有多種組合。
![](https://i.imgur.com/i9aDl0A.png)
[圖片來源](http://lucienlee.github.io/blog/2013/09/06/how-to-use-gird-systems-to-design-web/)

#### 網站使用網格系統(grid system)的優點：

1. **增加可讀性**
   對齊且規律的排版，讓版面容易閱讀，而且排版比例與數學上的和諧，提升使用者體驗
2. **輔助設計師排版**
   網站設計師能在有限規範內產生不同的排列組合的版面，以避免毫無頭緒。
3. **方便溝通**
   當網站設計師與工程師都共同使用 grid system，CSS 不需轉換任何比例尺寸，可加快開發速度，降低設計與程式的溝通成本。
4. **根據不同螢幕尺寸調整版面**
   以相對單位

### 什麼是響應式網站設計（RWD，Responsive Web Design）？

RWD 是一種讓網站能在各種螢幕尺寸的裝置下，符合該尺寸版面佈局的設計原則。

#### 為什麼需要 RWD？

因為使用者除了電腦外，也開始會在不同的裝置(平板、手機等)中瀏覽網頁，RWD 利用螢幕尺寸不同來控制版面的設計方式，讓使用者不用對瀏覽的網站進行辛苦的縮放、平移，開發者可以在同一個網站上直接開發不同裝置的版面，對於維護、成本以及搜尋排名上用相對大的優勢，因此 RWD 幾乎成為現代網站的標配。

### 網格系統與 RWD 的關係

RWD 的基本實作通常為套用 CSS 中的 media query 語法，然後在不同螢幕寬度做 CSS 樣式的調整。

例如：「螢幕尺寸在 768px 以上時，`<span>` 中的文字顏色為紅色」

```
@media (min-width: 768px) {
  span {
    color: red;
  }
}
```

有了 media query 這項武器，開發者就可以在各種螢幕尺寸中設定想要的 CSS 樣式。

在網站中使用網格系統就是把網頁分割成好幾個格子，基本上以 12 欄系統為主，將一行 (row) 分為 12 個 column（12 欄），依照裝置尺寸分為不同的斷點，去指定想要的 column 數，以達到響應式的設計。

![](https://i.imgur.com/Vg3UrWO.jpg)
[圖片來源](https://getbootstrap.com/docs/3.4/css/#grid-example-mixed)

#### 舉例來說，

1.每一個 row(行)裡面， 如果 class 為`.col-xs-*`： 表示在裝置螢幕尺寸 <768px 時，要佔多少欄位，若是`.col-xs-8`，表示佔 8 欄

2.多個裝置尺寸設定： 如果 class 為 `col-xs-12 col-sm-6 col-md-8`
->裝置螢幕尺寸 <768px 時，佔 12 欄；
->裝置螢幕尺寸 >= 768px 時，佔 6 欄；
->裝置螢幕尺寸 >= 970px 時，佔 8 欄

![](https://i.imgur.com/57eIxao.jpg)
[圖片來源](https://getbootstrap.com/docs/3.4/css/#grid)

```
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <!-- Optional: clear the XS cols if their content doesn't match in height -->
  <div class="clearfix visible-xs-block"></div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
</div>
```

參考來源：

- [Bootstrap 官方網站-Grid system](https://getbootstrap.com/docs/4.3/layout/grid/)
- [利用 Bootstrap Grid System 排版的學習筆記](https://cythilya.github.io/2015/04/07/bootstrap-grid-system/)
- [網格系統 (Grid System)](https://zoego.tech/%E7%B6%B2%E6%A0%BC%E7%B3%BB%E7%B5%B1grid-system/)
- [使用 Grid System 來設計你的網頁](http://lucienlee.github.io/blog/2013/09/06/how-to-use-gird-systems-to-design-web/)
- [做網頁設計該想的事：響應式設計與格線系統](https://medium.com/uxi-design/%E5%81%9A%E7%B6%B2%E9%A0%81%E8%A8%AD%E8%A8%88%E8%A9%B2%E6%83%B3%E7%9A%84%E4%BA%8B-%E9%9F%BF%E6%87%89%E5%BC%8F%E8%A8%AD%E8%A8%88%E8%88%87%E6%A0%BC%E7%B7%9A%E7%B3%BB%E7%B5%B1-9e27cc1836cb)
- [RWD 教學入門：響應式網頁設計的實作方法](https://tw.alphacamp.co/blog/rwd-responsive-web-design-introduction)
- [Bootstrap Grid System 格線系統筆記 │ 鼠年全馬鐵人挑戰 #16](https://its-okay.medium.com/bootstrap-grid-system-%E6%A0%BC%E7%B7%9A%E7%B3%BB%E7%B5%B1%E7%AD%86%E8%A8%98-%E9%BC%A0%E5%B9%B4%E5%85%A8%E9%A6%AC%E9%90%B5%E4%BA%BA%E6%8C%91%E6%88%B0-16-c7c28c108e8f)
- [製作 RWD 網頁時要注意的事](https://medium.com/@king40105/%E8%A3%BD%E4%BD%9Crwd%E7%B6%B2%E9%A0%81%E6%99%82%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E4%BA%8B-330e78700b10)
- [傾囊相授！MUKI 的 RWD 入門與實戰課程分享](https://muki.tw/tech/responsive-web-design/)
- [傾囊相授！MUKI 的 RWD 入門與實戰課程分享 2](https://muki.tw/tech/responsive-web-design/2/)
- [響應式網站 (RWD) 設計指南＆精選收錄](https://medium.com/uiux-cafe/%E9%9F%BF%E6%87%89%E5%BC%8F%E7%B6%B2%E7%AB%99-rwd-%E8%A8%AD%E8%A8%88%E6%8C%87%E5%8D%97-%E7%B2%BE%E9%81%B8%E6%94%B6%E9%8C%84-70ba84fab05)
- [淺談 CSS Grid system](https://ithelp.ithome.com.tw/articles/10139242)

## 請找出任何一個與 Bootstrap 類似的 library

[Materialize CSS](https://materializecss.com/)
[Foundation](https://get.foundation/)
[Tailwind CSS](https://tailwindcss.com/)
[Semantic UI](https://semantic-ui.com/)
[Pure CSS](https://purecss.io/)
[UIkit](https://getuikit.com/)
[Bulma](https://bulma.io/)

參考來源：

- [11 Best CSS Frameworks To Look Forward In 2020](https://www.lambdatest.com/blog/best-css-framework-2020/#no4)
- [Best CSS Frameworks in 2020](https://dev.to/theme_selection/best-css-frameworks-in-2020-1jjh)
- [還在跟複雜的 CSS 的設定奮鬥嗎？用 Tailwind 來幫你實現真正的高效整潔！](https://5xruby.tw/posts/tailwind-css-plugin/)
- [[筆記] 從零學習 Materialize 打造個人頁面](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E5%BE%9E%E9%9B%B6%E5%AD%B8%E7%BF%92-materialize-%E6%89%93%E9%80%A0%E5%80%8B%E4%BA%BA%E9%A0%81%E9%9D%A2-a5de87c1e8e0)

## jQuery 是什麼？

### jQuery 簡介

jQuery 是一個 JavaScript 的 liberary，為 John Resig 於 2006/01/14 於 BarCamp NYC 首次發表。其設計概念為 "write Less，Do More"。

jQuery 已經事先幫開發者實作許多 Javescript 常用的功能，讓開發者在使用 jQuery 時，可以輕易撰寫出對 DOM 元素的操作、事件處理、動畫設計、Ajax 且支援各種瀏覽器的簡化程式，令開發者專注在程式的邏輯架構上。

舉例生活的例子：

> 小美剛與小明結婚，小美為了清楚即將到來的情人節，打算與小明兩人在家吃自己親手做情人節大餐。她在 fb 的新手老婆社團中看到最近網路上有種服務，會幫你把一道菜的新鮮原料都切好備好，整包真空直送送到家，只要按照食譜烹煮即可，對於每天加班到晚上八點，沒時間也不知道怎麼選食材的小美來說，這項服務簡直是她的救星，小美馬上毫不猶豫地訂了五菜一湯的食材包，準備大展身手！
>
> jQuery 就像已經一包包的食材，開發者能簡便且快速的製作網站功能

![](https://i.imgur.com/ACzzsD1.jpg)

[圖片來源](https://www.smartm.com.tw/article/33383038cea3)

在 Javascript 中用 `document.querySelector` 來選取 DOM 節點中特定 element ，而在 jQuery 只要用一個 `$('') `選取。
例如：

```
<div id="username">小明</div>

// JavaScript
document.querySelector("#username") ，

// jQuery
${'#usernname'}
```

如此一來，這樣就可以少打很多英文字！沒錯，偷懶的天性是工程師解決問題的動力來源。

然而，近年來 ECMAScript 的語法調整，用 Javascipt 寫的程式不一定就比較繁雜（參考： [You might not need jQuery](http://youmightnotneedjquery.com/)），加上各家瀏覽器逐漸標準化、以及 React、Vue、Angular 等框架的流行，jQuery 有逐漸退流行的趨勢。

### jQeury 優缺點

#### 優點

> jQuery 最大的優點就是縮短開發時間，以及跨瀏覽器整合。

1.  **輕量級**：jQuery 是輕量的 JavaScript 框架，gzip 壓縮後，甚至能小於 20KB
2.  **語法簡潔**：將常用的 Javascript 實現實作並打包，所以較 JavaScript 寫法簡便許多。
    例如：
    ```
    獲取元素的值
    <input type= "text" id="elementid"/>

        //javascript 程式碼
        document.querySelector('#elementid').value

        //jQuery:
        $('#elementid').val();
        ```

3.  **瀏覽器兼容性**： jQuery 基本相容了現在主流的瀏覽器，讓開發者不再為瀏覽器的相容問題去建立各別瀏覽器的兼容庫
4.  **鏈式操作方式**：jQuery 的鍊式操作，可以對同一個對象的多個操作連寫在一行程式碼裡。
    例如：
    ```
    在 class 為 "intro" 的 <p>標籤中 ，
    增加一個叫做 "nick" 的 class ，同時以動畫效果緩緩顯示

        // HTML
        <p class="intro"></p>

        // jQuery
        $("p.intro").addClass("nick").show("slow");

        僅僅通過一行代碼就能實現上述效果。
        ```

5.  **選擇器**：開發者可以使用 CSS3 的選擇器，以及 jQuery 定義的选择器。豐富的選擇器，讓很多複雜的情況，往往在 jQuery 中一行程式碼就搞定。
    例如：
    ```
    改變的 <table id="tb1"> 裡所有單數 < tr > 的文字顏色及背景色。

        // jQuery
        $("#tb1 tr:odd").css("background-color", "red").css("color", "blue");
        ```

6.  **完善的 Ajax**: jQuery 簡化 ajax 程式碼，開發者使用 `$.ajax () ` 代替 `XMLHttpRequest`
    例如： 用 `GET `方法發出請求
    ```
    // XMLHttpRequest 寫法
    var request = new XMLHttpRequest();
    request.open('GET', '/my/url', true);

        request.onload = function() {
          if (this.status >= 200 && this.status < 400)
            var resp = this.response;
          } else {

          }
        };

        request.onerror = function() {

        };

        request.send();


        // jQuery 寫法
        $.ajax({
          type: 'GET',
          url: '/my/url',
          success: function(resp) {

          },
          error: function() {

          }
        });
        ```

7.  **開源社群且使用支援強大**：jQuery 是一款開源的產品，可以自由地使用并提出修改。jQuery 有良好的文件和幫助手冊，而且允許開發者定製外掛，透過有許多成熟的第三方外掛。開發者可以輕易實現很多絢麗的效果。
8.  **節省開發者學習時間**：jQuery 提供了大量範例，新手開發者在編寫代碼前，可先查看 jQuery 是否有類似插件，了解插件程式碼原理，除了能夠迅速開始開發，且能提高技巧。

#### 缺點

1. **不能向後相容**：新版本不兼容早期版本。因此若新版本 jQuery 移除某些不支援功能，開發者用早期版本寫好的程式碼或外掛可能就會無法正常使用，使用的插件越多，發生的機率越高。。
2. **多個外掛衝突**：同一頁面上使用多個外掛時，易發生衝突現象，如果這些外掛依賴相同事件或 selector 時。
   > 想像將泰式酸辣湯底與咖哩湯底的料理包，同時用在同一鍋湯中，兩種湯都發揮了本色，卻又無法發揮本色。
3. **瀏覽器依賴**：jQuery 所有動作是以 DOM 操作出發，所以在沒有 DOM 的環境中，基本上無法使用（例如： node.js）

參考來源：

- [jQuery](https://jquery.com/) @官方網站
- [什麼是 jQuery？前端框架盛行還需要 JavaScript 函式庫嗎？](https://tw.alphacamp.co/blog/jquery-javascript-library-overview)
- [JavaScript 教程- jQuery](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022609723552) @廖雪峰
- [jQuery 是什麼，它跟 JavaScript 有什麼關係？它又有什麼能耐呢？](https://progressbar.tw/posts/6)
- [JavaScript 的框架很多，請問 jQuery 有什麼強處或缺點嗎？](https://ithelp.ithome.com.tw/questions/10090753)
- [JavaScript 和 jQuery 的優缺點](https://www.itread01.com/p/1315404.html)
- [面试：谈谈你对 jQuery 的理解](https://www.cnblogs.com/xqx-qyy/p/7562995.html)
- [JQuery 是什麼](http://www.victsao.com/blog/99-jquery/318-jquery-what-is-jquery)
- [jquery 的优势是什么？](https://blog.csdn.net/BOM485480/article/details/105458859)

## jQuery 與 vanilla JS 的關係是什麼？

![](https://i.imgur.com/5sxzk4h.png)
[圖片來源](https://medium.com/javascript-in-plain-english/why-developers-prefer-vanilla-javascript-over-jquery-e707b249d421)

### 什麼 vanilla JS？ 可以吃嗎？

**vanilla JS**：指的就是原生的 JavaScript。中文為香草的 vanilla 是傳統冰淇淋的口味中最標準、最常見的預設口味，於是軟體領域中被引申為 "由原作者發布時未經改動或客製化的版本。

### jQuery 與 vanilla JS 有什關係？

**jQuery**：是基於原生的 JavaScript 所產生的 liberary，也就是說沒有 vanilla JS 就無法使用 jQuery，但沒有 jQuery 還是可以用 vanilla JS；而且在開發時，可根據情況將 jquery 跟 vanilla JS 一起使用，並非用了 jQuery，開發者就無法在檔案中其他地方寫 vanilla JS。

jQuery 在某些功能上輔助了開發者用更少的程式碼做快速開發，在前期瀏覽器百家爭鳴的時代，jQuery 簡潔的程式碼與跨瀏覽器兼容的特點深受開發者歡迎。

隨著瀏覽器們越來越規範化，以及 JavaScript 語法版本的更新，多數情況下使用 vanilla JS 已能輕鬆達成功能，省去下載 jQuery 的負擔。更重要的是，由於 vanilla JS 執行在客戶端，節省了伺服器的請求時間和頻寬，提升了執行的效率。

library 或 framework 都是用來方便開發的工具，唯有熟悉其定位與價值，在底層 Javascript 知識的基礎上，才能在開發過程中適時地引入。

參考來源：

- [Vanilla JS](http://vanilla-js.com/) @官網
- [香草軟體](https://zh.wikipedia.org/wiki/%E9%A6%99%E8%8D%89%E8%BD%AF%E4%BB%B6) @ wikipedia
- [精通 VanillaJS](https://www.ithome.com.tw/voice/106182)
- [what is vanillajs](https://stackoverflow.com/questions/20435653/what-is-vanillajs)
