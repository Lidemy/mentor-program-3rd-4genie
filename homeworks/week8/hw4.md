## 什麼是 Ajax？

---

Ajax 的全稱為**非同步 JavaScript 及 XML (Asynchronous JavaScript and XML)**

在 Ajax 被發明前，傳統的瀏覽器發送請求後，網頁會同時重新載入新的畫面，這樣的做法會增加過程中反應的時間，而且大多是回傳的內容是相似的。

Ajax 一種非同步利用 Javascript 向伺服器發送請求並接受資料的技術，優點是不需要重新載入頁面的情況下，就能與伺服器交換數據而且及時更新部分頁面的內容。

Ajax 中的第一個 A，代表非同步(Asynchronous)， 非同步的意思就是當我們發送請求後，可以直接執行其他程式，等拿到回傳的結果後再來處理就好。如果不是非同步，假設我們點了一個按鈕，那麼頁面的時空就會像電影一樣，暫時停留在這一刻，必須等伺服器傳回資料後才能再進行其他操作。

舉洗衣服的例子來說，非同步就是我們先把衣服丟去洗衣機裡，按下開始洗衣的按鈕後，接著去做其他的事情，例如洗碗，等到洗衣機嗶嗶嗶的說洗好後，再過去曬衣服；同步則是按下開始洗衣的按鈕後，什麼也不做，痴痴地看著洗衣機轉到天荒地老，等衣服洗完，我們曬好衣服後才再去洗碗。

Ajax 中的 X 則代表著 XML 資料格式，但目前最常見的資料交換格式其實是 JSON。

使用 Ajax 的常見例子是 Gmail，Ajax 讓我們不用因為點擊了一封郵件，就重新整理畫面(感謝 Google 大神～)；還有用戶註冊時，檢查信箱或用戶名是否重複也不需要整個資料填寫完後送出才進行驗證。

實作步驟：

1. 創建一個 XMLHttpRequest
   `const request = new XMLHttpRequest`

2. 監聽請求成功後的狀態

```
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(request.responseText // 引印出伺服器返回的内容
  }
};
```

3. 設置請求
   `request.open("GET","請求位置")；`

4. 發送請求
   `request.send();`

參考來源：

- [MDN Ajax](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX)
- [AJAX 是什么？](https://zhuanlan.zhihu.com/p/22564745)

## 用 Ajax 與我們用表單送出資料的差別在哪？

---

用 form 表單時，submit 後，**會重新整理當前的頁面**，由伺服器端控制數據的傳遞，以及轉址到其他頁面。

而 Ajax 則需要透過 Javascript，**不用重新整理目前的頁面**就可以執行請求，如果需要轉到其他頁面，可以設定透過客戶端的 window 或者伺服器端的 header 進行轉址

## JSONP 是什麼？

---

JSONP 的全文是 JSON with Padding，是不受瀏覽器受同源政策的限制，取得 Response 的方法之一。

由於 HTML 有些標籤是不受**同源政策**( same origin policy )限制，例如 `<img>`、 `<video>`以及`<script > </script>` 的 src 屬性。

JSONP 的原理就是利用 `<script>` 標籤由客戶端用向伺服器發送 `GET` 請求，伺服器再將參數放在 callback 中傳回客戶端。 JSONP 的局限性在於只能透過 `GET` 請求將參數帶入。

[實例示範：](https://www.cnblogs.com/chopper/archive/2012/03/24/2403945.html)
客戶端程式 A 中 sample：

```
<script type="text/javascript">
function callback(data) {
    alert(data.message);
}
<script type="text/javascript" src="http://localhost:20002/test.js"></script>
</script>
```

伺服器端程式 B 中 test.js：

```
callback({message:"success"});
```

> 當程式 A 接收到伺服器程式 B 回傳的資料後，會跳出 "sucess" 的 alert 視窗

- 參考來源
  - [ MDN 同源政策 (Same-origin policy)](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)
  - [同源政策與跨來源資源共用（CORS）](https://pjchender.github.io/2018/08/20/%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96%E8%88%87%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E7%94%A8%EF%BC%88cors%EF%BC%89/)
  - [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
  - [浅析 JS 中的跨域请求-图解加实例(JSONP 篇)](https://segmentfault.com/a/1190000004761698)
  - [JSONP 的工作原理是什么？](https://www.zhihu.com/question/19966531)
  - [由浅入深理解 JSONP 并拓展](https://www.k0rz3n.com/2018/06/05/%E7%94%B1%E6%B5%85%E5%85%A5%E6%B7%B1%E7%90%86%E8%A7%A3JSONP%E5%B9%B6%E6%8B%93%E5%B1%95/)
  - [浏览器同源政策及其规避方法](https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
  - [再也不学 AJAX 了！（三）跨域获取资源 ② - JSONP & CORS](https://segmentfault.com/a/1190000012302319)

## 要如何存取跨網域的 API？

由於瀏覽器有同源政策(Same-origin policy)的限制，要存取跨網域的 API， 可以使用以下幾個方法：

- **JSONP**： 利用 HTML `<script>` 標籤的 `src` 屬性不受同源政策限制影響的原理
- **CORS**（Cross-Origin Resource Sharing，跨來源資源共享）：
  - 伺服器端在 Response 的 Header 中需加上 `Access-Control-Allow-Origin`
- **從後端走**

  - 同源政策是瀏覽器給的限制，所以這個方法是由透過 Web 的後端當作橋樑，將前端發出 Request 傳給 Web 的後端後，後端再將 Request 發送給跨網域的伺服器，並將伺服器傳回的資料送到前端去。

    > 舉例來說，三年 1 班的小明暗戀隔壁女生班的美美，一想到明天就是美美的生日了，小明下定決心明天一定要將手上這封寫了兩天兩夜的情書交給朝思暮想的美美，希望這份純純的愛最終能夠有情人終成眷屬，但是問題來了，小明的班導是個很嚴厲的人，不准男生年紀小小就學電視上哪些沒營養的偶像劇一樣談情說愛，畢竟在地球上只有 10 年的生命，能懂什麼叫做天長地久？ 所以只要傳來任何不是班上同學寫的信件與字條，除非你是班級幹部，否則其他人只要被他發現，沒得商量一律沒收。為什麼幹部就可以不用檢查？ 也許老師自己能力有限，管不了全班這麼多個學生，再管就要管到海邊去了
    > "這樣我要怎麼收到美美的回信呢?" 此時的小明不禁暗忖著急了起來，幸好小明想到了一個方法，我雖然不是幹部，那我請幹部幫我傳信不就行了，請班長在開班長會議時候將我的情書轉交給女生班的班長也就是美美，然後美美就可以再將回信透過班長傳給我，班長給我的信，老師就管不著了。為了自己的愛情，小明把班長當作~~郵差~~愛的丘比特用～ 不過這招的確突破了老師的限制，班長最後成功的將美美的回信交給了小明。

- **跨網域代理**：

  - 使用別人寫好的跨網域代理網址：https://cors-anywhere.herokuapp.com/
  - 例如：健保署開放資料 API 的網址：https://data.nhi.gov.tw/Datasets/DatasetResource.aspx?rId=A21030000I-D50001-001


    ```
    // 將跨網域網址後頭加上 API 就可以存取受限制的資料。
    let proxyUrl = https://cors-anywhere.herokuapp.com/
    let dataUrl = https://data.nhi.gov.tw/Datasets/DatasetResource.aspx?rId=A21030000I-D50001-001
    let getData = proxyUrl + dataUrl;
    ```

- 參考來源：
  - [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
  - [Ajax 跨網域問題的解決之道](https://blog.xuite.net/class2u_com/twblog1/134939179-Ajax+%E8%B7%A8%E7%B6%B2%E5%9F%9F%E5%95%8F%E9%A1%8C%E7%9A%84%E8%A7%A3%E6%B1%BA%E4%B9%8B%E9%81%93)
  - [JavaScript 前端跨網域存取解決方案](https://tpu.thinkpower.com.tw/tpu/articleDetails/402)
  - [利用 JSONP/ CORS 實現 Cross-Origin Request](http://ericachang.github.io/2013/07/01/jsonp_and_cors/)
  - [解決 AJAX 沒辦法取得 CORS（跨網域存取）資料的問題](https://noob.tw/js-cors/)
  - [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
  - [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
  - [跨網域代理，解決 AJAX CORS 的問題](https://blog.twtnn.com/2020/02/ajax-cors.html)
  - [最好理解的跨網域](https://hackmd.io/@V6dW5B-zR66nKBnXuleT3w/SJOwugj24?type=view)
  - [實作 Cross-Origin Resource Sharing (CORS) 解決 Ajax 發送跨網域存取 Request](https://blog.toright.com/posts/3205/%E5%AF%A6%E4%BD%9C-cross-origin-resource-sharing-cros-%E8%A7%A3%E6%B1%BA-ajax-%E7%99%BC%E9%80%81%E8%B7%A8%E7%B6%B2%E5%9F%9F%E5%AD%98%E5%8F%96-request.html)

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

---

同源政策是瀏覽器對客戶端發出的 request 給予的限制，由於第四周我們是在 node.js 環境下發出 request，沒有透過瀏覽器，所以就不會碰到跨網域的問題。
