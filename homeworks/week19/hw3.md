## 請簡單解釋什麼是 Single Page Application

> 小明最近開了一家早餐店，剛開始的前三天，想說店裡在試營運，價錢不要訂的太高，先把口碑做起來。 於是小明到數位印刷店訂做了一個很佛心的價目表貼在門口：咖啡大杯每杯 10 元；培根起司蛋餅一份 20 元；雙層牛肉起司漢堡套餐每份 35 元。這種打折打到骨折，不惜成本的銅板價果然吸引了一批又一批的學生與上班族前來光顧。但...賠本的生意是做不久的，這一個月來，小明每天早上 4 點起來，下午 3 點才收工回家，以為可以數錢數到手抽筋的小明，發現營收居然是負的，扣掉自己的人力成本不說，飲料商的尾款也尚沒付清，這一個月換來的，只有一陣瞎忙。心很累的小明覺得勢必要漲價才行～ 於是小明重新做了一個價目表，買的東西不變，只把上面的價格每個都提高 5 元，然後標題寫著 "小店求生存，請顧客多包涵"。
> 
> 由於之前的價格實在太低，所以即使多了 5 元，常來的顧客還是覺得很划算，小明店裡每天依舊人來人往，翻桌率高。
> 
> 沒想到幾天後因為缺水，政府突然公佈要調漲水價，而且供 5 休 2，小明趕緊又再做了一個價目表，每項商品又多 5 元，已在小明的早餐店吃習慣的客人還是依舊繼續支持。
> 
> 隔了一周，隔壁鄰居的女兒小美高中剛畢業，正在找暑期打工，小明想說生意這麼好，我一個人又忙不過來，要不找小美來幫忙？店裡多了小美一個人手，事情果然順利很多，但小明的人力成本也相對增加，於是總是以漲價思維來解決一切事情的小明，又做了一個新的價目表，這次每項商品漲 10 元。
> 
> 小美看到小明每次漲價都要新做一個價目表，反正每次都是價格在變動，但是其他內容依舊，建議小明乾脆只要去印刷店做新的價格，然後貼在原本的價目表上，省下重新製作新價格表的費用。
> 
> 小明聽了小美的建議後，從此過著幸福，因原料成本上漲就相應貼上新價格調漲，卻從不因原料成本下降而恢復原價的生活

### 所以，這跟 Single Page Application（SPA） 有什麼關係？

![](https://i.imgur.com/LNabCwK.jpg)
[圖片來源](https://themindstudios.com/blog/spa-vs-mpa/)

傳統的網站多半應用 **MPA（Mutiple Page Application）** 的做法，利用 **SSR (Server Side Rendering，伺服器端渲染)** 來實踐： 

由伺服器端收到使用者端的請求，然後解析完整的 HTML 返回到使用者接收端，然後呈現網頁。這種方式讓使用者在操作時，在等待 response 重新繪製畫面並回傳時出現白畫面，使用者體驗較不佳，尤其遇到網路慢，重新 loading 時間長的情況。

> 就好比小明在故事中，每當有新的需求時，需到印刷店重新製作新的價目表

於是，為了解決這種情況，出現了另一種方式 => **SPA (Single Page Application)**，希望某一個畫面區塊更新時，只要重新繪製那個小區塊就好，做到局部更新。

> 後來小美建議，既然要改的只有價格，那麼每次只要更新價格就好了

### 那麼,什麼是 SPA 呢？ 
根據 MDN 的 [SPA](https://developer.mozilla.org/zh-TW/docs/Glossary/SPA) 的說明：

> 單頁應用（SPA，Single-page application）能在使用網站時，只載入一個頁面；並在網頁更新時，透過 JavaScript API 如 XMLHttpRequest 與 Fetch 同步更新部份網頁。
> 
> SPA 能讓用戶在使用網站時，不用從伺服器載入整個頁面，所以會提升性能與動態體驗。
> 
簡單的說，SPA 就是畫面由前端進行處理，後端僅提供與傳遞資料，利用 Javascript 動態更新網頁上的內容，讓使用者始終在同一頁面變更內容不需要換頁，常見的例子有 Gmail、 Youtube

![](https://i.imgur.com/shq4vwD.jpg)
[圖片來源](https://themindstudios.com/blog/spa-vs-mpa/)



## SPA 的優缺點為何

### SPA 的優點：

* **減輕伺服器的負荷**：前後端分離，讓伺服器可以專心與提供數據與資料，前端負責網頁的呈現邏輯與合成
* **減少頻寬的浪費**： 除了第一次連到網站時需下載網站內容，之後有更新的資源時不用再重新渲染整個畫面
* **較好的使用者體驗（User Experience，UX）**: 
    * 原本的操作不用被打斷，例如聽音樂的同時，也可以瀏覽其它的歌手或唱片。
    * 減少了使用者在切換操作過程中的等待時間，也不會有畫面因需重新整理而出現的閃白，資訊傳達更快速即時。
    

### SPA 的缺點：

* **不利於 SEO (搜尋引擎最佳化)**：由於 SPA 需等 Javascript 接受後端資料後再動態渲染網站畫面，所以 HTML 中基本上沒有太多內容，在網站點滑鼠右鍵 => 檢視原始碼，也不會看到 Javascript 動態產生的內容。如此一來，有可能讓網頁爬蟲爬不到我們希望它抓到的資訊，較難提升 SEO 排名。（雖然 Google 也可以爬 Javascript 了）

* **首次載入速度慢**：使用者第一次到網站時需花時間下載網站的全部內容（HTML、JavaScript、CSS...等），之後才會只加載有更新的部分。

* **狀態判斷與控制複雜化**：由於在同一頁面中呈現所有資料，且 URL 網址不變，需由前端判斷與處理的部分變複雜，例如網站的路由控制、使用者的當前狀態，資料傳輸成功與否，頁面的前一步、下一步的信息處理...等。


參考來源：
* [SPA](https://developer.mozilla.org/zh-TW/docs/Glossary/SPA)@MDN
* [What Is a Single Page Application and Why Do People Like Them so Much?](https://www.bloomreach.com/en/blog/2018/07/what-is-a-single-page-application.html)
* [SPA 单页应用的优缺点](https://cloud.tencent.com/developer/article/1690698)
* [前端学习之路之 SPA (单页应用) 设计原理](https://segmentfault.com/a/1190000013907916)
* [单页面应用（SPA）](https://www.cnblogs.com/suihang/p/10522092.html)
* [什么是单页应用](https://www.yuque.com/fe9/basic/ag975a)
* [在傳統 Web 應用程式和單頁應用程式 (SPA) 之間作選擇](https://docs.microsoft.com/zh-tw/dotnet/architecture/modern-web-apps-azure/choose-between-traditional-web-and-single-page-apps)
* [淺談單頁 Web 應用（SPA）：工作原理及優缺點](https://www.mdeditor.tw/pl/2BxK/zh-tw)
* [凡走過請留下痕跡：AJAX 網頁的狀態與瀏覽記錄](http://rettamkrad.blogspot.com/2013/04/ajaxandhistoryapi.html)
* [Day20– 前端小字典三十天【每日一字】– SPA](https://ithelp.ithome.com.tw/articles/10160709)
* [單頁應用](https://zh.wikipedia.org/wiki/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8)@wikipedia
* [淺述 SSR SPA 優缺點](https://blog.niclin.tw/2019/01/06/%E6%B7%BA%E8%BF%B0-ssr-spa-%E5%84%AA%E7%BC%BA%E9%BB%9E/)
* [SPA 和 MPA 網站區別，SEO 優缺點剖析，甚麼時候該用那個？](https://www.leunghoyin.hk/spa-vs-mpa)
* [第一次寫 SPA 就上手](https://slides.com/lionlai/spa/fullscreen)
* [那些用 GA 追蹤 SPA 網站數據踩過的坑](https://shaoku.cc/product/track-spa-data-on-ga/)
* [为什么绝大部分桌面网站没有采用单页应用 (SPA) 模式？](https://www.zhihu.com/question/66800427)
* [利用 Prerender Node 為 SPA 做 SEO](https://cythilya.github.io/2016/09/16/seo-prerender-node/)
* [Single-Page Applications vs Multi-Page Applications: The Battle of the Web Apps](https://themindstudios.com/blog/spa-vs-mpa/)