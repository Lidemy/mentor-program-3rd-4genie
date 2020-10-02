## 1. 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 加密(Encryption)

- 將明文的內容透過密鑰加密成難以讀取的密文，而且唯有透過密鑰，才能將密文解密還原成原文。
- 明文-> 加密 -> 密文 （可逆）

![加密](https://i.imgur.com/7UBKl1b.png)
圖片來源：[Tokenization vs Encryption](https://www.mcafee.com/enterprise/zh-tw/security-awareness/cloud/tokenization-vs-encryption.html)

- 對稱式加密 （Symmetric Encryption）
  - 只有一把鑰匙
  - 如果密鑰長度太簡單或者太短，就容易被猜到或被暴力破解
  - 常見的演算法有：[DES](https://zh.wikipedia.org/zh-tw/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96),[3DES](https://zh.wikipedia.org/zh-tw/3DES),[AES](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86)

![對稱式加密](https://i.imgur.com/i1jloNj.png)
圖片來源： [JALLOULI, Ons. (2017). Chaos-based security under real-time and energy constraints for the Internet of Things. ](https://www.researchgate.net/publication/321123382_Chaos-based_security_under_real-time_and_energy_constraints_for_the_Internet_of_Things)

- 非對稱式加密 （Asymmetric Encryption）
  - 安全性比對稱性加密高
  - 會有兩把鑰匙，一把為公鑰，一把私鑰（自己要收好）
  - 常見的演算法有：[RSA](https://zh.wikipedia.org/zh-tw/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95),DSA,[ECC](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6)

![非對稱式加密](https://i.imgur.com/ivTwXeA.jpg)
圖片來源： [JALLOULI, Ons. (2017). Chaos-based security under real-time and energy constraints for the Internet of Things. ](https://www.researchgate.net/publication/321123382_Chaos-based_security_under_real-time_and_energy_constraints_for_the_Internet_of_Things)

---

### 雜湊（Hash）

- 將明文訊息透過雜湊之後，輸出成有限固定長度的文字
- (無限) 明文-> 雜湊 -> 文字（有限）
- 雜湊是**單向、不可逆**，即無法將雜湊後的輸出反推回原來的輸入
- 相同的輸入，透過相同的雜湊演算法，必定產生相同的輸出。
- 不同的輸入，透過相同的雜湊演算法，很少出現相同的輸出。（若出現，則稱為 雜湊碰撞 Hash Collision ）
- 即使輸入的內容只相差一個字，雜湊後的輸出卻會相差很多(見下圖)
  ![](https://i.imgur.com/zavnCJk.png)
  圖片來源：[雜湊函式](https://zh.wikipedia.org/wiki/%E6%95%A3%E5%88%97%E5%87%BD%E6%95%B8)
- 為了提高安全性，降低洩漏的風險，可以為原始資料加鹽（salt），也就是在雜湊之前在原文的任意位置插入隨機的字串 ，然後再丟給雜湊演算法運算，獲得加了鹽（salt）以後的輸出值。這樣的好處是就算被破解了，由於加鹽（salt）的字串與位置難以確定，使知道原文的難度大大增加。
  ![](https://i.imgur.com/nT3NwO6.png)
  圖片來源：[Adding Salt to Hashing: A Better Way to Store Passwords](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/)
- 應用：
  - 檔案校驗碼（Checksum）： 判斷檔案是否和原本的一樣，如果有缺損或被加料，雜湊後的輸出會不同
  - 不需要被還原的資料： 例如不要在資料庫中儲存使用者的明碼

加密(Encryption): 需要密鑰，透過密鑰可以解密成原來的輸入內容
雜湊（Hash）:沒有密鑰，無法逆向推出原來的輸入內容

### **結論：加密可逆，雜湊不可逆**

---

### 為什麼密碼要雜湊過後才存入資料庫？

資訊安全的重要前提之一是：

1. 假設資料庫被拿走
2. 假設程式被看光

因此資料庫**千萬不能存使用者輸入的明碼**，真正的密碼應該只有使用者自己知道。

> 如果在某網站忘記密碼，這個網站沒有讓你重設密碼，反而寄給你你原本的密碼，千萬不要先急著感謝，因為這表示它存的是明碼，資料庫一旦被駭，所有使用者的密碼全都會被看光。

如果只是將密碼加密，雖然表面上變成了一串看不懂的文字，但是只要能拿到密鑰還是可以被破解。

然而利用相同的輸入經過雜湊演算法後得到相同的輸出，可用來確認使用者的密碼是否正確，雜湊的不可逆特性提升了破解密碼的難度。

參考來源：

- [加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)
- [如何區分加密、壓縮、編碼](https://blog.m157q.tw/posts/2017/12/23/differences-between-encryption-compression-and-encoding/)
- [[Security] 雜湊不是加密，雜湊不是加密，雜湊不是加密。](https://dotblogs.com.tw/regionbbs/2017/09/21/hashing_is_not_encryption)
- [雜湊函式](https://zh.wikipedia.org/wiki/%E6%95%A3%E5%88%97%E5%87%BD%E6%95%B8)
- [鹽 (密碼學)](<https://zh.wikipedia.org/zh-tw/%E7%9B%90_(%E5%AF%86%E7%A0%81%E5%AD%A6)>)
- [Yakim shu [第十一週] 資訊安全 — 雜湊密碼：hash 為什麼密碼要經過雜湊？](https://yakimhsu.com/project/project_w11_Info_Security-Hash.html)

## 2. 請舉出三種不同的雜湊函數

---

### MD5（Message-Digest Algorithm 5）：

- 已被證實不安全
- 輸出雜湊值之後以 32 個十六進位的字元呈現
- 在應用上還是可以用來校驗和驗證數據的完整性

### SHA-1（Secure Hash Algorithm 1）：

- 已被證實不安全
- 輸出雜湊值計算之後以 40 個十六進位的字元呈現

### SHA-256 （Secure Hash Algorithm 256）

- 出雜湊值計算之後以 64 個十六進位的字元呈現

參考資料:

- [md5 是什麼](https://www.twblogs.net/a/5d7dec12bd9eee5327ffb843)
- [SHA 家族](https://zh.wikipedia.org/wiki/SHA%E5%AE%B6%E6%97%8F)

## 3. 請去查什麼是 Session，以及 Session 跟 Cookie 的差別

---

### **為什麼要有 Session**

知道什麼是 Session 之前，必須先了解 HTTP 的協議：HTTP 協議，是透過 Request 以及 Response 讓客戶端與伺服器可以進行溝通以及傳送數據。

But，就是這個 But（話說似乎很多愛情故事精彩的地方都是從 But 開始，例如羅密歐與茱莉葉、白蛇傳、雷神索爾），HTTP 它是一種無狀態 (Stateless)協議，也就是說每次發出的 Request 請求都是唯一且獨立的，而且不會記住之前的連線。以飲料店為例來解釋無狀態大概是什麼：

> 想像你遇到隔壁 50x 飲料店那個健忘又臉盲老闆，每次去都當你是第一次點餐一樣，完全不記得你是哪位？是否曾經來過？來過幾次？常點什麼飲料？
> 所以呢，你只好不厭其煩地說出：今晚，我想來點 50x 的大杯珍珠烏龍鮮奶茶去冰三分糖少奶混珠不用吸管。（世界上最遙遠的距離就是我曾來過，你卻不記得～）

試想，這種無狀態的情況如果是一個網站登入會員後，由於 HTTP 的無狀態性，使得每次瀏覽這個網站的其他頁面都還要再登入，或者加到購物車商品，當你再去逛其他商品頁時，購物車的東西就消失不見了，應該會超麻煩的吧。

因此，Session 是人們為了解決 HTTP 的無狀態性所出現的方法與機制。session 讓客戶端與伺服器的會話過程中，保存了瀏覽者的狀態與相關配置訊息，如此一來，客戶端的瀏覽者在網站的網頁跳轉過程中，伺服器可以識別瀏覽者的身份與狀態，當客戶端關閉會話或 session 因超時時會話結束，session 才會失效。

而 Cookie 這位老兄，則是資料在一定條件的存儲在瀏覽器裡的機制，這個功能剛好很方便讓我們實作出 session 機制 ，但其實只要是能做到 session 這個概念，用任何方式都可以，只是 cookie 在做實作上困難度相對簡單。（畢竟工程師是一群嫌麻煩的迷樣生物）

### **Session 跟 Cookie 的差別**

|              | Session                                              | Cookie               |
| ------------ | ---------------------------------------------------- | -------------------- |
| 資料保存地方 | 伺服器端                                             | 瀏覽器               |
| 有效期       | 客戶端關閉或 Session 超時會失效                      | 可設置長時間         |
| 安全性       | 存在伺服器端，安全性較 Cookie 好                     | 存在客戶端，易被竊取 |
| 存儲大小     | 比 Cookie 存的多，不設限，但太大可能增加 Server 負擔 | 不超過 4K Bytes      |

參考資料：

- [你真的了解 Cookie 和 Session 吗](https://juejin.im/post/5cd9037ee51d456e5c5babca)
- [HTTP Session 攻擊與防護](https://devco.re/blog/2014/06/03/http-session-protection/)
- [[不是工程師] 會員系統用 Session 還是 Cookie? 你知道其實他們常常混在一起嗎？](https://progressbar.tw/posts/92)
- [Web 技術中的 Session 是什麼？](https://fred-zone.blogspot.com/2014/01/web-session.html)

## 4. `include`、`require`、`include_once`、`require_once` 的差別

`include('文件路径')`

- 一般在用到時才引入檔案， php 指令在執行到它時才會將檔案包含進來。（即用即載入，要用到時再引入）
- 當 include 的檔案遇到錯誤時會提示錯誤，但**程式繼續執行**。

`require('文件路径')`

- 一般放在頁面最前面，檔案內容變成 php 指令的一部分（預載入，一開始就引入所有可能用到的檔案）。
- 當 require 的檔案遇到錯誤時會提示錯誤，且**程式會終止執行**。

`include_once('文件路径')` `require_once('文件路径')`

- 也是用來引入檔案，會先判斷檔案是否已經引入過了，如果已引入，則不再重複引入檔案，即可以節省資源，又可避免變數重複定義的錯誤。
- 遇到錯誤時，程式執行方式分別與 `include`、 `require` 一樣。

參考來源：

- [初學者最易混淆的 include、include_once、require、require_once 之比較
  ](https://injerry.pixnet.net/blog/post/39082306)
- [php require、require_once 和 include、include_once 的区别](https://www.cnblogs.com/minigrasshopper/p/7798282.html)
- [Include,require,include_once,require_once 的區別](https://registerboy.pixnet.net/blog/post/24261631)
- [php include,require,include_once,require_once 的區別](https://www.itread01.com/p/1415563.html)
