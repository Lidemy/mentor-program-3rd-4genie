## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

在還沒開始 17 週之前，對這週要學的東西有很多的想像，因為之前一直有聽說這週的東西學完後，會發現很多面試的題目都在裡面，雖然還沒開始準備面試，不過有種學會了，就進入下一個階段的期待。

喜歡 Huli 總是可以把原理講的很清楚，因為程式是人們所創造的，所以一定有它的邏輯以及道理可循，但有在學校上過課就能深深地體會到，那些所謂很會教、能夠讓學生喜歡上某個科目的老師，通常不是自己懂得有多少，而是把道理融會貫通後，以淺顯易懂的方式解釋並讓學生吸收。在上 17 週之前有曾經看過其他人在寫類似的文章，但很少會真正全部看完，就算有看完，也才發現世界上最遙遠的距離就是明明就是看得懂你寫的文字，卻看不懂你這篇文章的意思 XD～

這週學習時有很多 Eureka 的 moment，內心話常常說出：哦哦～原來是這樣啊！💡。記得以前，在看日本綜藝節目，每當來賓們聽完專家的解釋後表情做足的冒出了這句話，心裡總是想說，這...也太浮誇了吧，有人平常會這樣讚歎的嗎？沒想到是真的。當有人向你解釋之前的經驗背後的原理其實是什麼的時候，眼睛真的會像小孩一樣發亮。

這一周學到了 JavaScript 底層的幾個重要概念，從變數 (variable) 切入到作用域 (scope) ，接著帶出 execution context 的運行機制，讓我們更好的理解提升(hoisting)、閉包(closure) 的根本，那些令人搞得霧煞煞的特點與規則，都只是回歸到 Execution context 的運作罷了。再次印證 Elon Musk 提倡的[第一性原理](https://www.xiaxiaoqiang.net/first-principles/.html)（First Principle）思考方式。


### Event loop
從 Philip Roberts 的影片中把 Event loop 運作的解釋的非常清楚，大推！ 讓人完全不覺得這是個將近 30 分鐘的影片。簡單的來說，Event loop 結合 call stack、callback queue 的運作，解決了 JavaScript 單線程(single thread) 運行時遇到的堵塞問題。

### 閉包 Closure 
執行一個內部的 function，由於作用域的關係，變數隱藏會在這個內部的 function 裡面，讓外部存取不到。JS201 的影片中說明的很詳細，就是有耐心地把自己當作 JS引擎，一步一步地跑每個過程的 Execution context 跟 Scope chain。

### 物件導向 (Object-oriented programming,OOP)
把 JS201 與 第二期的物件導向的影片邊看邊照著做，後來也另外找了 [Coding train](https://www.youtube.com/watch?v=YcbcfkLzgvs) 的相關影片大概能理解 ES6 之前的 prototype chain 以及 ES6 的 Class 寫法，實際上用直接寫出物件導向寫法以及重構成物件導向，感覺還需要多練習才能說自己真的搞懂了。

### this
一句話，this 跟怎麼被呼叫有關，與如何被宣告關係不太。與物件有關的 this， 指的是呼叫的 instance 本身；其他的情況時可以試著用 call()的呼叫方式來思考 this 的值

### 作業部份
第三期的 potatokaka 同學的作業超讚，比起文字敘述，變成 GIF 動畫很清楚把整個流程說的很清楚，所以參考並模仿 potatokaka 同學的格式，自己也試做了一次 GIF，雖然可能要花上直接打字的好幾倍時間，但是把作業呈現成自己理解的樣子，值得！


這一周依舊是收穫滿滿，很喜歡這週的安排，不熟的地方像是尤其是閉包、物件導向、this 等，之後還是要靠邊實作來加深體會



參考來源：
* [程式導師實驗計畫第二期：Week9-2 JavaScript 執行原理](https://www.youtube.com/watch?v=3s69FPDZGRk)
* [我知道你懂 hoisting，可是你了解到多深？](https://github.com/aszx87410/blog/issues/34)
* [解读 ECMAScript [1]—— 执行环境、作用域及闭包](https://www.cnblogs.com/leoo2sk/archive/2010/12/19/ecmascript-scope.html)
* [JS 作用域](https://github.com/nightn/front-end-plan/blob/master/js/js-scope.md)
* [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://github.com/aszx87410/blog/issues/35)
* [該來理解 JavaScript 的原型鍊了](https://github.com/aszx87410/blog/issues/18)
* [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://github.com/aszx87410/blog/issues/30)
* [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂 ](https://github.com/aszx87410/blog/issues/39)
* [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)@Kuro
* [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/)
* [覺得 JavaScript function 很有趣的我是不是很奇怪](https://blog.huli.tw/2020/04/18/javascript-function-is-awesome/)
* [你不可不知的 JavaScript 二三事 系列](https://ithelp.ithome.com.tw/users/20112483/ironman/2016?page=2)@OneJar
* [thr Coding Train](https://thecodingtrain.com/)@Daniel Shiffman
* [所以說 event loop 到底是什麼玩意兒？| Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* [重新認識 JavaScript: Day 19 閉包 Closure](https://ithelp.ithome.com.tw/articles/10193009)
* [閉包 - 那些前端開發應該要知道的小事 (三)](https://alexian.me/2019/10/15/closure)
* [程式導師實驗計畫第二期：Week5-2：物件導向程式設計](https://www.youtube.com/watch?v=nZhzLcV9eHI)
* [Week5 物件導向（續）：繼承與 static](https://www.youtube.com/watch?v=k5TGAw7faNg)
* [[程式][概念] 物件導向基本概念。什麼是物件導向程式設計 (OOP) 呢？](https://expect7.pixnet.net/blog/post/38682120)
* [我要學會 Java (二)：物件導向其實很簡單](https://noob.tw/java-oop/)
* [物件導向基礎：何謂類別 (Class)？何謂物件 (Object)？](https://blog.miniasp.com/post/2009/08/27/OOP-Basis-What-is-class-and-object)
* [給 OOP 初學者的建議：先搞懂「資料跟行為在一起」就好，其它的慢慢來](https://blog.turn.tw/?p=3093)
* [[問題] 學習物件導向初學](https://www.ptt.cc/bbs/OOAD/M.1256403807.A.8AE.html)