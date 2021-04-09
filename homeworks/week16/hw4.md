## CSS 預處理器是什麼？我們可以不用它嗎？
![](https://i.imgur.com/MwU6ju6.png)
### 為什麼要使用 CSS 預處理器
在說明什麼是 CSS 預處理器之前，首先我們來問，為什麼要使用 CSS 預處理器呢？ 原生的 CSS 的哪些不便，讓懶惰成性的工程師，願意特地再花時間學習一套語法，勝過寫原生 CSS？ 

了解脈絡或許不會讓你的高中歷史成績變好（承認吧，當時坐在隔壁的班草 / 班花的確更能引起你的興趣），但知道原因，會讓你用 CSS 預處理時多點心安理得、多點理直氣壯，跟面試官聊起時才不會大眼瞪小眼，然後心裡暗付著，難道就是愛情～

#### 對 CSS 的愛恨糾葛
自從 1996 年 12月，CSS1 發表以來到現在的 CSS3，CSS 一直被認為是定義網頁樣式的屬性與排版等輔助性裝飾功能，其核心機制與語法沒有太大的改變，BUT 看過韓劇的人就知道，事情的發展並非想像中的簡單，往往會朝著意想不到的複雜化發展，你愛的人有可能其實是失散多年的親哥，而從小暗戀著你的隔壁鄰居小明，就算幫你撐傘，替你擋子彈，卻還是拿他的一片真心換來你絕情的背影。CSS 一行行單純的屬性描述，雖然簡單易學易懂，然而，隨著網頁開發的複雜度提高，網頁開發者發現傳統 CSS 有一些問題難以支持大型專案的維護與重製需求，例如：

1. 遇到大量且相同的樣式要修改，例如文字或顏色等，就要花很多時間使用查找以及取代的功能調整

```
// 如果老闆突然說要把整個網站中的文字改成紅色的 red，
// 你通常會要一行一行的找出來並取代，
// 但，如果有 100 行 要改呢？
// 又或者 100 行中有 20 行維持原設定 ?

div{
    color: green;
}

p{
    color:blue; 
}
```


2. 命名時如果底下還有很多子元素，父元素還是需要重複打出，而且如果以後想要修改父元素名稱，要逐個找出來做調整

```
.person{
  ...
}

.person .avatar{
  ...
}

.person .name{
  ...
}

.person .address{
  ...
}
```

3. 重複的樣式組需要寫多次，無法模組化再利用

```
// div1 與 div2 有很多重複的屬性，只有 font-size 不同


div1{
 width: 100%;
 heigh: 100%;
 margin: 5px;
 padding: 10px 20px;
 font-size:16px;
}

div2{
 width: 100%;
 heigh: 100%;
 margin: 5px;
 padding: 10px 20px;
 font-size:24px;
}
```

> 沒有變數與合理的樣式重複使用機制，以及需要寫很多重複的選擇器等情況降低了 CSS 的開發效率以及維護性，尤其是遇到複雜的專案開發時。

### 所以，CSS 預處理器是什麼

為了更快更有系統的管理 CSS，有開發者思考若是能讓 CSS 像一般程式語言一樣，有變數、函式、迴圈等功能該有多好。於是有了 CSS 預處理器（CSS Preprocessor）的誕生。

簡單來說，CSS 預處理器就是用另一種特定的語法規則撰寫 CSS，然後再幫你編譯成原生 CSS 檔案，讓瀏覽器可以讀取。

由於 CSS 預處理器是在生成 CSS 之前，所需進行撰寫與編譯，所以才會稱作"預（pre-）"處理

![](https://i.imgur.com/xL51k8x.jpg)
[圖片來源](https://www.pinterest.com/pin/732679433099606526/)


這個方式的好處是，讓開發者透過像是變數（varialbe）、混入(mixin)、繼承(extend)、嵌套(nesting)等常見的程式或邏輯的特性去撰寫 CSS，撰寫出更簡潔、可讀性高、可重複且易於維護的 CSS 程式碼


目前較多人使用相對成熟的 CSS 預處理器有： Sass/Scss、Less、Stylus，功能與語法都差不多，可以依照自己或公司使用習慣選用

## 我們可以不用它嗎？

由於 CSS 預處理器之後還是會被轉譯為原生 CSS，在瀏覽器中讀取的其實是轉譯後的原生 CSS，所以就算不用 CSS 預處理器直接使用原生的 CSS 也可以，就像手機沒有濾鏡 APP 可以自拍嗎？ 當然還是可以拍，只是被打回原形後好不好看，你與網友們能不能接受。

有些人認為，在小型的個人 side project 或者單純的活動案，用原生 CSS 即可，省去建置編譯 CSS 預處理器相關環境的繁瑣；而在開發大型專案或多人協作時，為了管理以及維護的方便性，可以採用 CSS 預處理器。

但要選擇使用哪一套 CSS 預處理器，或是否使用 CSS 預處理器，終究還是要考量自己的熟練度以及公司團隊內部的習慣與規範，評估對此專案更有利的方式。


參考來源：
* [什麼是 CSS 預處理器？](https://changtsuiling.gitbooks.io/sass/content/chapter1/1-1-shi-me-shi-css-yu-chu-li-qi-ff1f.html)@ changtsuiling
* [CSS preprocessor 介紹，與 SASS 入門分享](https://www.slideshare.net/wantingj/css-preprocessor-sass-44533096)@ wantingj
* [浅谈 css 预处理器，Sass、Less 和 Stylus](https://zhuanlan.zhihu.com/p/23382462)@牧曈
* [浅谈 CSS 预处理器（一）：为什么要使用预处理器？](https://github.com/cssmagic/blog/issues/73)
* [2019 年，你是否可以拋棄 CSS 預處理器？](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/682547/)
* [Sass Documentation](https://sass-lang.com/documentation)
* [Sass/SCSS 基本語法介紹，搞懂 CSS 預處理器](https://tw.alphacamp.co/blog/css-preprocessor-sass-scss)@ Alpha Camp
* [SASS 用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html)@阮一峰
* [30 天掌握 Sass 語法 - (1) 什麼是 SASS？它真的能加速我寫 CSS 的效率嗎？](https://ithelp.ithome.com.tw/articles/10126703)@廖洧杰
* [Sass/SCSS 簡明入門教學](https://blog.techbridge.cc/2017/06/30/sass-scss-tutorial-introduction/)@TechBridge 技術共筆部落格


## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。

在舉出一個 HTTP Cache 的 Header 之前，首先簡單說明一下什麼是 Cache

> 有一天，小華在 Line 上傳了一個搞笑的 youtube 影片連結給小明，正當小明要點開連結時，媽媽彷彿算好了一切，分秒不差地叫小明去倒垃圾，心不甘情不願準備要出門的小明突然想起，自己的手機網路沒有吃到飽，而且這個月的流量已經用完，但他又不想等到回來後再看影片，於是，小明想到一個辦法，就是先用家裡的網路讓 youtube 影片的緩衝進度條跑完變成灰色，這樣即使沒有網路也可以邊去倒垃圾邊看這支影片了。
> 
> 多年後，當小明長大後成為前端工程師，才想起小時候自以為聰明的方法用的就是 Cache 機制。

#### Cache 是什麼？ 為什麼需要 Cache?

想像一下，你在 Facebook 的網站裡（也許你都用 Instagram，那你想像任何一個喜歡的網站），接著 3 秒後按下重新整理（F5），這時候其實網站中大部分的內容都沒有更新，但是瀏覽器還是得重新從網站的伺服器下載所有的資料，如果該網頁一個月後才會更新，那這一個月內你每次點開或重新整理這個網站都下載了重複的資料，對身為用戶的你來說，花了許多的流量，卻得到一樣的東西，而且每次的重新下載，更花費你不少的等候時間；對遠方的網站伺服器來說，它也一直在忙於處理每個用戶的每次請求，一樣的事，卻重複在做，對於懶惰成性的工程師來說，是很難放著不管不理會它的，於是，Cache 就是為了這種情況下造成的資源耗損而誕生的。

Cache，又稱為快取（或緩存）， Cache 的概念是透過把常用的資源先存在你使用的地方，它就像是一份複本（copy），讓你不用一直回去網站主機重新去讀取這個檔案，因此加速讀取速度並減少流量，等有更新的時候再去網站主機端存取更新的檔案即可。對瀏覽器的使用者來說， Cache 節省了用戶的網路流量以及等候時間，用戶會發現，當第一次進入一個網站時通常會比較慢，但之後速度會快很多，這是因為瀏覽器在第一次時會將此網站的資料，例如：網頁及圖檔，js檔案，數據等下載到電腦硬碟中，之後當瀏覽器看到同一個 URL 的檔案名稱時，會先在本地 Cache 中尋找，如果有的話就直接讀取，沒有或是快取過期時，瀏覽器才會再向網路的伺服器真正送出請求。

> 就像，小明在學校每次要請假時，都需要到班導師的辦公室去拿空白的假條，可是班導很忙而且他的辦公室在隔壁棟好遠喔，想要下課去打籃球，不想浪費時間的小明於是走到隔壁的福利社去影印假條，只要確定格式沒換，他就可以一直用影印來的假條，當內容有更新時再去找班導拿就好。

這裡講的快取指的是瀏覽器（HTTP）的快取，但還有像是代理伺服器快取、閘道器快取、CDN 快取、反向代理伺服器快取、負載平衡器快取。


#### 使用 HTTP Cache 的優點：

1. **減少流量消耗**
若每次連上網站都下載的檔案，對網站營運者以及用戶來說都是需要消耗流量，給提供網路寬帶的電信商收費的理由。使用儲存在本地端的 Cache，可以減少網路流量，降低營運成本。
2. **降低伺服器的負荷**
當設定資源的有效期限後，用戶在這段期間內可重複存取在本地的 Cache，減少對網站伺服器的請求，讓網站伺服器不用處理每個從客戶端發出的請求，減輕機器運作的負擔。
3. **减少客戶端等待時間，加快頁面讀取速度**
對用户來說，由於使用的 Cache 更接近請求端，資源傳送的時間更少，明顯加快網頁開啟的速度，提升使用者體驗。

#### HTTP Cache 的 Header
Cache-Control 是一個 HTTP/1.1 後引入的 Header，其中有多個屬性可以設定。

**到底要不要使用快取，以及快取的使用方式：**
- `no-store`: 指不要使用也不儲存任何快取，每個請求都是送到原始的伺服器去取得資源
- `no-cache`: 每一次造訪頁面都發送 Request 去確認，有新檔案的話就下載更新，沒有時就存取快取裡的資料

**快取資源公開還是私有**
- `private`: 此快取是私有的，只有用戶端 (瀏覽器) 可以儲存本地的快取。常用在敏感的個人資料。
- `public`: 此快取為公有共享的，資料傳輸過程中的 ISP, proxy 及  cdn 服務商都可以儲存，多用於公用的靜態檔案，例如 js, css 及圖片等。

**新鮮度：**
- `max-age`
    - 單位是秒(second)，意思是 `?` 秒後才會過期，例如 max-age= 2592000，意指這個資源使用本地快取，有效期限是 30 天（60 x 60 x 24 x 30 = 2592000）。

**檔案內容更動與否**

除了設定快取有效時間，也能採用「檔案內容更動與否」的 `Etag` 來作為是否更新快取的條件。

把 Etag 想成是這份檔案內容的 hash 值，概念是當檔案內容相同時，檔案經過 hash 之後的值也一定會相同，在伺服器回應的 Header 帶上這個檔案的 Etag，客戶端保留該 Etag，等快取過期之後，瀏覽器發送` If-None-Match ` 詢問 Server 是否有新的資料，此時伺服器比對客戶端傳來的 Etag 是否與自己伺服器的 Etag 一致，Etag 不一致表示資料有做過更動，就回傳新的資料；若 Etag 一致，那就回傳 304，表示檔案未更動，可直接繼續使用。


![](https://i.imgur.com/nYO5XgD.png)
[圖片來源](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/images/http-cache-control.png?hl=zh-tw)


**Cache-Control 詳細如下圖：**

![](https://i.imgur.com/1xyfUd2.png)
[圖片來源](https://tw.alphacamp.co/blog/web-cache)


**藉由下圖可以先從 Client 端向 Server 發出請求的過程來了解 HTTP Cache：**
![](https://i.imgur.com/zyfUWfR.png)
圖片來源- [新手坑：讓人又愛又恨的 HTTP Caching](https://medium.com/frochu/http-caching-3382037ab06f)


參考來源：
* [循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)
* [Hypertext Transfer Protocol -- HTTP/1.0](https://www.w3.org/Protocols/HTTP/1.0/spec.html)
* [[不是工程師] 讓網站速度飛快的秘密，你了解什麼是網頁快取 (Cache) 嗎？](https://progressbar.tw/posts/93)
* [什麼是 Cache？](https://www.ithome.com.tw/node/5864)
* [缓存那些事](https://tech.meituan.com/2017/03/17/cache-about.html)
* [缓存](https://webpack.docschina.org/guides/caching/)@webpack
* [HTTP caching](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Caching)@MDN
* [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)@MDN
* [新手坑：讓人又愛又恨的 HTTP Caching](https://medium.com/frochu/http-caching-3382037ab06f)@Amdis Liu
* [RFC2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
* [Prevent unnecessary network requests with the HTTP Cache](https://web.dev/http-cache/)@Google Developers
* [HTTP Caching](https://developers.google.com/web/fundamentals/performance/get-started/httpcaching-6)@Google Developers
* [網頁快取是什麼？Web cache 機制是怎麼運作的？](https://tw.alphacamp.co/blog/web-cache)@Alpha Camp
* [Increasing Application Performance with HTTP Cache Headers](https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers)@Heroku
* [彻底弄懂 Http 缓存机制 - 基于缓存策略三要素分解法](https://mp.weixin.qq.com/s/qOMO0LIdA47j3RjhbCWUEQ)@李志刚
* [浅谈浏览器 http 的缓存机制](https://www.cnblogs.com/vajoy/p/5341664.html)
* [HTTP 协议详解](https://blog.csdn.net/gueter/article/details/1524447)
* [【Web 缓存机制系列】1 – Web 缓存的作用与类型](http://www.alloyteam.com/2012/03/web-cache-1-web-cache-overview/)
* [浏览器缓存机制](https://www.laruence.com/2010/03/05/1332.html)
* [Caching Tutorial](https://www.mnot.net/cache_docs/)
* [快取概觀](https://aws.amazon.com/tw/caching/)@aws
* [[http] http header， Cache-Control, Expires 用法說明](https://blog.camel2243.com/2018/09/23/http-http-header%EF%BC%8C-cache-control-expires-%E7%94%A8%E6%B3%95%E8%AA%AA%E6%98%8E/)
* [Cache (computing)](https://en.wikipedia.org/wiki/Cache_(computing))@wikipedia


## Stack 跟 Queue 的差別是什麼？
![](https://i.imgur.com/cTn3YcD.png)
[圖片來源](https://gohighbrow.com/stacks-and-queues/)

### 什麼是堆疊（Stack）？
堆疊(stack)是一種資料結構，遵循著資料 **後進先出（Last In First Out，LIFO）** ，最後一個進去，最先出來的原則。較新的元素會靠近頂部（堆疊尾部），較舊的元素會在堆疊的底部。

生活中常見的例子有自助餐吃到飽的盤子、書桌旁號稱有空會看但有空時永遠都不會看的那堆書、總是被媽媽塞得滿滿，深不見底的冷凍庫
![](https://i.imgur.com/to3kkWX.jpg)
[圖片來源](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F238550111498275647%2F&psig=AOvVaw2fInZM-vppGgrurBmBET8o&ust=1617834460040000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCyi5bV6u8CFQAAAAAdAAAAABAQ)

Stack 最常見的兩種操作方式，分別是 `push` 與 `pop`，push 就是把東西放到最上面，pop 則是把東西從上面拿走。

### 什麼是佇列（Queue）？

佇列 (queue)也是一種資料結構，遵循著資料 **先進先出（First In First Out，FIFO）** ，第一個進去，第一個出來的原則。較新的元素會靠近頂部（佇列尾部），較舊的元素會在佇列的底部。

生活中常見的例子有排隊上公車，先到的人先上車，後面到的人就依序往後排、排在高速公路出口閘道的車流、貓咪自動餵食器裡的飼料
![](https://i.imgur.com/AjMPykQ.jpg)
[圖片來源](https://www.rakuten.com.tw/shop/starrain/product/itveuemf0/)

queue 最常見的兩種操作方式，分別是 `enqueue` 與 `dequeue`，前一個是丟資料到 queue 內，後一個是從 queue 內將資料取出。。

### Stack 跟 Queue 的差別是什麼？

|  | Stack | Queue |
| -------- | -------- | -------- |
| 資料處理順序     | 先進後出 (LIFO)    | 先進先出 (FIFO)    |
| 新增 / 刪除 的端點 | 只有一個端點（top）,新增和刪除在同一端點,依序向上堆疊，刪除則相反， 會從最上面先刪除| 兩個端點(front /rear)，新增會從佇列尾端放入，刪除則從最前端的舊資料先刪 |
| 常見應用     | 遞迴 (recursion) 形式的演算法/編輯器 (如 word、sublime 等) 中的 undo    | 安排多個程式的執行順序     |

參考來源：
* [用 JavaScript 學習資料結構和演算法：堆疊（Stack）篇](https://blog.techbridge.cc/2016/06/24/javascript-data-structure-algorithm-stack/)@ KD Chang
* [資料結構 --- 陣列 (Array)、堆疊 (Stack)、佇列 (Queue)](https://mark-lin.com/posts/20170211/)
* [Stack & Queue](https://hackmd.io/@smalleye/Sy-f4lsDS)
* [Ch18 Stack 與 Queue](https://hackmd.io/@CLKO/BkZaF56Cm?type=view)
* [Difference between Stack and Queue Data Structures](https://www.geeksforgeeks.org/difference-between-stack-and-queue-data-structures/)
* [4.3 Stacks and Queues](https://introcs.cs.princeton.edu/java/43stack/)
* [Stack and Queue in JavaScript](https://www.telerik.com/blogs/stack-queue-javascript)
* [第6章 堆疊與佇列](http://el.fotech.edu.tw/localuser/eetuml/web1/PG31221-DOC/ch06.pdf)
* [堆疊 (Stack) & 佇列 (Queue)](https://ithelp.ithome.com.tw/articles/10205260)
* [【資料結構】堆疊（Stack）與佇列（Queue）](https://yalanin.medium.com/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B-%E5%A0%86%E7%96%8A-stack-%E8%88%87%E4%BD%87%E5%88%97-queue-d3026b88c8c5)
* [基本的資料結構](http://pisces.ck.tp.edu.tw/~peng/index.php?action=showfile&file=f6d93a265b1c0dd15792bca9cef89f75591e36fa2)
* [Stack: Intro (簡介)](http://alrightchiu.github.io/SecondRound/stack-introjian-jie.html)@Chiu CC
* [Queue: Intro (簡介)，並以 Linked list 實作](http://alrightchiu.github.io/SecondRound/queue-introjian-jie-bing-yi-linked-listshi-zuo.html)@Chiu CC
* [JavaScript: What are Stack and Queue?](https://javascript.plainenglish.io/javascript-what-are-stack-and-queue-79df7af5a566)

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
> 1912 年， RMS Titanic 是當時世界上最大的船隻，號稱「不會沈沒的郵輪」，從英國的南安普敦出發，計畫前往美國紐約市，但這艘郵輪最後沒有如願抵達，因為它在航程中撞上了冰山，超過 2200 位乘客和船組人員中，只有 712 名獲救。多年後，以這艘郵輪作為題材發想的電影"鐵達尼號"風靡全球，也成為李奧納多皮卡丘（？ 的代表作。劇中令人動容其中一幕就是當郵輪快要沉沒時，乘客們紛紛爭先恐後地湧入甲板，想要坐上為數不多的救生小船，然而，船上的大多男性還是決定讓老弱婦孺先上小船。是紳士精神還是人道主義讓這些人做出如此權衡？
> 
> 另一方面，剛熱戀，結果發現男友小明是超級媽寶的你，選在一個夜深人靜剛喝了小酒的微醺夜，試探性地問小明一個亙古不變的經典問題，如果我跟你媽同時掉到海裡你會先救誰？

當遇到要選擇優先順序的時候，什麼（or 誰） 比較重要，哪個優先？ 人們常常傾向依據一些條件作為衡量的判斷基礎。

在 CSS 的世界裡，若許多 CSS 同時作用在同一個元素時，瀏覽器要被設計成遵守哪一個呢? 是先出現的？還是後出現的？ 是命名比較長的？ 還是數值比較大的？

為了統一衡量的標準，定義了 "**Specificity**", 中文稱為 "**權重**"，CSS 的權重表示一個 css 選擇器（selector） 和其元素的相關程度。相關性越強，表示其權重越高。什麼意思呢？有點像是警匪電影中警探在找尋嫌疑犯，當目擊者描述的越精確，採取目擊者說法就會越優先，假使甲目擊者說是嫌疑犯約 170公分，乙說嫌疑犯是一位約 170公分，穿著紅白條紋上衣的人，丙說嫌疑犯是約 170公分，穿著紅白相間條紋上衣，藍色牛仔褲，頭戴紅白相間條紋毛帽，圓形黑框眼鏡的人，警探會先丙目擊者的描述優先尋找。

可以把權重當作是優先級的概念，權重高低決定了同一元素的情況下的哪些 CSS 屬性優先套用，讓你在寫 CSS 時瞭解最後被選擇顯示的是哪個。

所以，CSS 權重是如何比較的呢？

### **規則一: 網頁載入 CSS 的順序**
> 行內 (inline)  CSS ＞ HTML 內部載入 CSS ＞ 外部載入 CSS

1. inline style
`<h1 style="color: #fff000;">H1 標題</h1>`

2. HTML 文件的`<head>`標籤中，元素在 `<style>` 撰寫 CSS
寫在 `<style>` 標籤
```
<head>
  <style>
    h1 { color: #000000; }
  </style>
</head>
```
3. CSS 程式碼統一寫在另一個檔案 (.css)，再到 HTML 的 `<head>` 中引入
```
<head>
    <link href="外部css檔案的路徑" rel="stylesheet">
</head>
```

### **規則二: CSS 的撰寫順序**
> 由於CSS 的讀取是由上而下的，權重相等時，後寫的會覆蓋過先寫的樣式

```
// h1 會顯示 #ffffff，因為後者會蓋過前者

h1 { 
  color: #000000; 
}

h1 { 
  color: #ffffff; 
}
```

### **規則三: CSS 的權重記分**
> 若權重不同時，權重值高的優先
 
根據 [MDN 文件](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#selector_types)，權重是由選擇器中不同的選擇器類型的數目決定

選擇器類型分成四種，想像有四個區塊的數字：0-0-0-0，優先級別從左而右為
1. inline style
2. id
3. class / psuedo-class / attribute
4. element / psuedo-element

![](https://i.imgur.com/bSh8VhL.jpg)
[圖片來源](https://webdesign.tutsplus.com/tutorials/what-is-css-specificity--cms-34141)

當兩個選擇到同一元素，就從最左邊的區塊開始比兩者權重的數字，如果相同，就往下一級比；如果不同的話，數字多的權重較大。如果兩組的權重數字完全相同的，就是樣式擺放的先後順序了，

實際上不同區塊的數字，代表的只是所在區塊的選擇器類型數目，所以不能進位到其他區塊，而且這樣也很奇怪，你有 99 個 class 並不表示就可以換 1 個 id。


#### 一、*：全站預設值，為 0-0-0-0
```
//全站預設值

*{
    padding: 0
    margin: 0
 }
```

#### 二、 Element：為 0-0-0-1
```
div, p, ul, ol, li, header, footer....
```

#### 三、 class / psuedo-class / attribute：三者皆為 0-0-1-0
```
// HTML

<h1 class="myclass">Hello World!</h1>


// CSS

.myclass {
  color: blue;
}
```



#### 四、id：為 0-1-0-0
```
// HTML

<h1 id="myid">Hello World!</h1>

// CSS

#myid {
  color: red
}
```

#### 五、inline style ： 為 1-0-0-0

```
<div style="color:green">
    I am priority
</div>
```





#### 六、!important： 為 1-0-0-0-0

!important 應該算是西洋棋裡的王后，大老二的黑桃二，可蓋過所有的權重，
它的用法是寫在 CSS 屬性後方，例如：

```
div{
  padding:10px !important;
}
```

要蓋過！important，辦法有

1. **寫在它後面並也加上！important**
```
.box{
    background-color: #f00;!important
}

.box{
    background-color: #aaa;!important
}
```

2. **加上比數量更多的！important**
```
// background-clor 會顯示 #f00，因為有兩個 ！important

.box{
    background-color: #f00;!important !important
}

.box{
    background-color: #aaa;!important
}
```

好比要贏過一萬分的玩家，就是把自己變成兩萬分、三萬分...，但這樣互拼的結果，最後會造成 CSS 中一大堆 ！important，這樣沒有彈性也不好維護與管理，建議多用 class 來寫 CSS，必要時才能有效利用權重的特性來覆蓋元素，非到不得已不輕易使用 `！important`，它可以視為最後的王牌，相信你也不會在當別人出梅花 3 的時候，就把黑桃 2 丟出去。


**Quiz**
```
1. body div ul li a span 總共 6 個 element  => 加起來是 0-0-0-6

2. li #myid 一個 element 加上一個 id => 0-1-0-1

3. h3.myclass ~ li 兩個 element 加上一個 class => 0-0-1-2

4. form input[type=name] 兩個 element 、一個 attribute => 0-0-1-2
```

#### 小結：
> !important > inline style > ID > Class/psuedo-class(偽類)/attribute（屬性選擇器） > Element > *


參考來源：
* [Calculating a selector’s specificity](https://www.w3.org/TR/2018/REC-selectors-3-20181106/#negation)@W3C Recommendation 06 November 2018
* [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)@MDN
* [CSS Specificity](https://cssspecificity.com/)
* [	
What is CSS Specificity and How Does it Work?](https://webdesign.tutsplus.com/tutorials/what-is-css-specificity--cms-34141)
* [Day20：小事之 CSS 權重 (css specificity)](https://ithelp.ithome.com.tw/articles/10196454)@小艾 (iris)
* [CSS 選擇器概略說明](https://muki.tw/tech/css-selectors/)@MUKI
* [CSS Specificity](https://www.oxxostudio.tw/articles/201405/css-specificity.html)@oxxostudio
* [Specifics on CSS Specificity](https://css-tricks.com/specifics-on-css-specificity/)@Chris Coyier
* [CSS 權重](https://l7960261.gitbooks.io/html-css-javascript/content/section2-8.html)
* [談一下 CSS Specificity](https://askie.today/css-specificity/)
* [初學程式設計必學 CSS 權重整理](https://www.tpisoftware.com/tpu/articleDetails/931)@TPI University
* [你应该知道的一些事情 ——CSS 权重](https://justcode.ikeepstudying.com/2016/07/%E4%BD%A0%E5%BA%94%E8%AF%A5%E7%9F%A5%E9%81%93%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B%E6%83%85-css%E6%9D%83%E9%87%8D/)
* [深入理解 CSS 权重 (优先级)](https://justcode.ikeepstudying.com/2016/07/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3css%E6%9D%83%E9%87%8D%E4%BC%98%E5%85%88%E7%BA%A7/)@Gideon
* [前端杂谈: CSS 权重 (Specificity)](https://zhuanlan.zhihu.com/p/50322177)@ssthouse
