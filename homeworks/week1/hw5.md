## 請解釋後端與前端的差異。
***
前端主要是用戶在使用瀏覽器時所看到的網站界面，而後端則是網站背後的邏輯。

舉例來說： 每天早上去早餐店買早餐，進入店裡時所看到的裝潢，給人的氛圍，以及菜單的提供要如何呈現，好讓客人點餐...等這些就像前端部分在做的事； 而當客人點了一個起司蛋加大冰奶去冰半糖少奶，外場人員收到單後，怎麼告訴內場，讓內場去備料，製作所點的餐點並提交給外場，到達客人手裡，設計整個動線的流程以及順序的流暢度，就像是後端在網站中所做的的事。


## 假設我今天去 Google 首頁搜尋框打上：JavaScri[t 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
***

1.按下 Enter 後，瀏覽器（Client端）向遠方的伺服器端（Server）發出了請求（request）

2.這個請求透過網路傳到伺服器的URL（www.google.com）

3.遠端的google伺服器收到請求，並根據請求，伺服器會找出Javacript的資源，取出後，伺服器將找到資源回傳給瀏覽器（response）

4.瀏覽器收到回傳內容，開始解析資源，把搜尋結果的畫面顯示出來


## 請列舉出 5 個 command line 指令並且說明功用
***
1.```exit```:關閉視窗（用exit關閉,比用GUI按X關閉帥！）

2.```clear```:清除畫面（有時候指令會佔滿整個畫面，這是後輸入clear，終端機畫面瞬間變得乾乾淨淨，不阿雜～）

3.```date /t```：顯示現在的日期

4.```ping```: 網路檢測工具，透過發送 ICMP ECHO_REQUEST 的封包，檢查自己與特定設備之間的網路是否暢通，速度是否正常
可輸入 hostname 或是 IP，例如： ```ping google.com```

5.```killall```：直接使用程式的名稱來指定要終止的程式

例如： ```killall hello.py```
