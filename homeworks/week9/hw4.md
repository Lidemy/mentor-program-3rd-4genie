## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

---

|          | char                                             | varchar                                 | text                             |
| -------- | ------------------------------------------------ | --------------------------------------- | -------------------------------- |
| 上限     | 255 byte，小於 255 byte 時，會用空格補齊剩餘空間 | 65535 byte                              | 65535 byte                       |
| 默認值   | --------                                         | 允許                                    | 不允許                           |
| 索引     | --------                                         | 可以是索引的一部分                      | 不能（完全）屬於索引的一部分     |
| 查詢速度 | 最快                                             | 次之                                    | 最慢                             |
| 長度     | 長度固定的值                                     | 長度可能會變動的值                      | 存長度可能會變，且數據量較大的值 |
| 常見例子 | 身份證號碼、手機號碼                             | 用戶名、電子郵件、國家/地區、主題、密碼 | 訊息、評論、鏈接                 |

- varchar(255+) 和 text 在存儲機制是一樣的
- 如果需要不為空的默認值， 建議使用 varchar，因為查詢速度比 text 快
- 參考來源：
  - [MySQL: Large VARCHAR vs. TEXT?](https://stackoverflow.com/questions/2023481/mysql-large-varchar-vs-text?noredirect=1&lq=1)
  - [Difference between VARCHAR and TEXT in MySQL](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)
  - [mysql 中 char，varchar 与 text 类型的区别和选用](https://blog.csdn.net/geniussnail/article/details/7753256)
  - [MySQL 性能优化之 char、varchar、text 的区别](https://blog.csdn.net/brycegao321/article/details/78038272)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？

---

### **為什麼要有 cookie**

客戶端與伺服器透過一個叫做 HTTP 的協議進行溝通以及傳送數據，然而，HTTP 是一種無狀態 (Stateless)協議，特性是每個 Request 都是唯一且獨立的，而且不會記住之前的連線，就好比去了一家飲料店，結果老闆相當很健忘，不管你去了多少次，都不會記得你是誰，不記得你常點的是大杯珍珠鮮奶茶去冰三分糖少奶混珠不用吸管，你就要像第一次點餐一樣，老老實實把要點的東西落落長的說一遍，裝熟也沒用（對，就是這麼無情～）

試想，如果到一個網站登入會員後，由於 HTTP 的無狀態性，每瀏覽這個網站的其他頁面都還要再登入，或者加到購物車的心愛商品，當你再去逛其他商品頁時，購物車的東西就不見了，這樣使用上一定會超麻煩的吧，用戶體驗很差。

因此，為了解決 HTTP 的無狀態性，在網路上識別瀏覽者的身份與狀態，出現了一些方法與機制，Cookie 就是其中一種保存狀態的機制

當我們去 50x 買珍奶的時候，會拿到一張號碼牌，先去旁邊納涼，等飲料做好之後再出示剛剛的號碼牌，即使店員忙到不記得我們長的是圓是扁，但他可以根據這張號碼牌給我們所點的飲料。

而 Cookie 就如同這張號碼牌，是伺服器暫時存放在客戶端瀏覽器上的內容，讓伺服器下次收到瀏覽器的請求(request)時，知道是同一個使用者。

### **Cookie 常見的用途有：**

1.帳號登入、購物車、遊戲分數... 2.使用者設定、佈景主題... 3.記錄並分析使用者行為

### **HTTP 這層怎麼設定 Cookie ？**

![Cookie通訊過程示意圖](https://i.imgur.com/cwdvyJs.png)

1. 客戶端傳送一個 HTTP 請求到伺服器端。
2. 伺服器向客戶端發送的回應，並在 HTTP Response Header 中包含了 Set-Cookie 的資訊，請瀏覽器將 Cookie 保存。
3. 有效期間內，瀏覽器每次的請求都會在 HTTP Request Header 中包含了 Cookie 的資訊。
4. 伺服器端透過 Cookie 標識客戶端身份的資訊。也可以判斷客戶端是否啟用了 Cookie。

### **瀏覽器以什麼形式帶去 Server？**

Cookie 以 _字串_ 形式存放在客戶端的瀏覽器，當瀏覽器每一次發送請求是，會在 Request 的 Header 中設定 Cookie 屬性，

Cookie 的屬性值有：

`name = value` : 必填。
`domain`: 設定 cookie 有效的網域名稱。
`path`: 指定特定路徑才發送 cookie，預設值為'`/`'，即和當前網頁同一目錄的網頁中有效。
`expires`: 有效的時間點，格式為 UTC 格式時間，默認為關閉瀏覽器就會消失。
`Max-Age`： 有效期限，單位為秒。
`secure`： 為 true 時，Cookie 只能在安全的協議下傳輸，通常為 HTTPS。
`httpOnly`： 為 true 時，不允許 Javascript 程式碼，如 document.cookie 去更改 cookie，避免受到 xss 攻擊拿到 cookie.。

- 參考來源：
  - [MDN HTTP cookies](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies)
  - [白話 Session 與 Cookie：從經營雜貨店開始](https://medium.com/@hulitw/session-and-cookie-15e47ed838bc)
  - [[不是工程師] Cookie 是文檔還是餅乾？簡述 HTTP 網頁紀錄會員資訊的一大功臣。](https://progressbar.tw/posts/91)
  - [cookie 和 session](https://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html)
  - [解釋 Cookie 的特性](https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail)
  - [[ASP.NET] 談談 Cookie 特性](https://dotblogs.com.tw/jasonyah/2013/10/06/explain-http-cookie-in-detail)
  - [全面解讀 HTTP Cookie](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/149866/)
  - [前端三十｜ 27. [WEB] Cookie & Session 是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-27-web-cookie-session-%E6%98%AF%E4%BB%80%E9%BA%BC-83f9747caf23)

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

---

1. 因為 Cookie 是在 Client 端，我們將會員的帳號原封不動的存放在 cookie 中，會有資料直接被攻擊者竊取或竄改的風險。

2. Cookie 沒有設定`Httponly`，攻擊者直接經由 JavaScript 存取使用者的 Cookie 的風險高。

3. 發送到伺服器的密碼是明碼，容易在傳送的過程以及儲存在資料庫中被竊取或盜用。

- 參考來源：
  - [HTTP Session 攻擊與防護](https://devco.re/blog/2014/06/03/http-session-protection/)
  - [HttpOnly - HTTP Headers 的資安議題 (3)](https://devco.re/blog/2014/06/11/setcookie-httponly-security-issues-of-http-headers-3/)
