# week 21 fe

## 為什麼我們需要 React？可以不用嗎？

可以不使用 React，你想用 Angular 或 Vue 等框架也 ok，即使不用框架，用網頁三劍客：原生的 HTML、CSS 以及 Javascript 來寫，也同樣能完成網站的製作，就好比有畫畫基礎的人，即使給他小畫家或 PPT 也可以畫；不會畫畫的人，用最新版的 Adobe Photoshop、Illustrator 也不一定能呈現出好作品，因此，看當下的專案需求，選擇最適合團隊的工具才是根本核心

### 既然如此，為什麼需要 React，好處是什麽？

#### 1.React 本質是 library：
library 的好處是事先包裝常用到的 JS 語法，減少為實現某功能而寫很多的原生 JS，方便開發。

就像去超市買料理包或康寶濃湯回來煮，材料跟味道都幫你調好了，節省自己從頭到尾自己做的時間

#### 2.Component 的概念: 

React 的 component 是將畫面切分成一個個模組塊。有點像汽車製造的過程，工廠先拆分成各部門，製造汽車所需要的各組零件（底盤、車頂、引擎蓋、車門、輪胎...等），最後再將所有零件一一組裝起來。

component 的好處是可以供不同地方重複使用，而且當開發者遇到需要調整或修改時，直接去找那個 component 就行。

![](https://i.imgur.com/dYk0H0J.jpg)
[圖片來源](https://depositphotos.com/355767706/stock-illustration-automobile-assembly-factory-car-assembly.html)

#### 3. 資料跟畫面分開：
React 將資料邏輯與 UI 介面分開處理，卻又相互關聯。

> 上面這個話看似矛盾但其實很好理解，舉生活上的例子來說，有點像是出去旅行時，不是會在火車站或機場看到的時刻表看板嗎？ 時刻表的介面已被設計好，當帶入不同的資訊時，看板上的顯示畫面會隨之跟著改變，所以只要設好資料跟介面是如何交互連動的，當偵測到資料有變動，就會同步更新需要變動的地方的顯示畫面。

以往網頁開發時大多是資料與畫面是寫在一起，造成程式碼不容易維護，而且有可能更動資料的同時，畫面也隨之改變。

React 將資料與畫面分開處理的好處是，讓開發者：
* 可分別專注在資料的處理與邏輯或 UI 介面的顯示
* 資料能供其他不同的 UI 介面重複使用

![](https://i.imgur.com/uXTegui.gif)
[圖片來源](https://gfycat.com/carefulunfortunategoa-split-flap)

#### 4. virtual DOM： 
每當資料狀態一有變動，就重新渲染整個畫面，其實是很沒有效率的。

> 以上述的時刻表為例，當只有一個班次誤點時，只要這個班次的顯示畫面更新就好，沒有必要所有的顯示牌都重新再翻一次；
> 隔壁從小吃到大的小吃攤也不會因為滷肉飯漲個 10 塊，就整個菜單全部換新的。

因此，React 提供了 Virtual DOM 的功能：
* 用 JavaScript 物件模擬 DOM 的結構，產生 Virtual DOM，每當資料狀態改變時，更新 Virtual DOM
* 接著，比對 Virtual DOM 與瀏覽器的 DOM 不同的地方
* 最後在瀏覽器 render 時再去跟瀏覽器說：請幫我將這些不同地方的 DOM 更新。

React Virtual DOM 的好處是：期望透過 Virtual DOM 與 Browser DOM 的比對，只 render 更新的部分，以提高效率。

![](https://i.imgur.com/ip25mKG.png)
[圖片來源](https://www.oreilly.com/library/view/learning-react-native/9781491929049/ch02.html)

### React 的優點：
* 元件（Component）可以重複使用，提升開發效率
* JSX 支援，增加程式碼易讀性

### React 的缺點：
* 對初學者來說有一定的學習門檻，例如要先理解：Component、JSX、Webpack...等


### 結論：
如果專案規模較大，操作較複雜時，使用 React 框架可提高開發效率與程式碼上的維護性與易讀性！

若網頁狀態管理沒那麼複雜或不需做成 [SPA](https://developer.mozilla.org/zh-TW/docs/Glossary/SPA)，或許不一定需要用到。

#### 參考來源：
* [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://hulitw.medium.com/introduction-mvc-spa-and-ssr-545c941669e9)@huli
* [你了解 React JS 嗎](https://linyencheng.github.io/2021/05/07/react-interview-questions/)
* [Virtual DOM 概述](https://cythilya.github.io/2017/03/31/virtual-dom/)@Summer。桑莫。夏天
* [SPA](https://developer.mozilla.org/zh-TW/docs/Glossary/SPA)@MDN


## React 的思考模式跟以前的思考模式有什麼不一樣？
> 例一：若網頁中很多區塊會重複出現。

![](https://i.imgur.com/iuA9jfw.png)

[圖片來源：麥克的半路出家筆記](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)


### 傳統的思考模式：
一個個的寫出這些區塊的架構

### React 的思考模式：
#### 遇到重複的區塊，就將它寫成 Component 吧

覺得 Component 的概念有點像一開始在學 JS 的 function：因為有很多地方會用到某段程式，所以把這段程式寫成一個 function，在需要用到時，呼叫這個 function； 

換成 Component 去想：因為之後有很多地方會用到這塊 UI， 所以把這個區塊寫成 Component，在需要用到的地方，放入這個 Component。



> 例二：若網頁中區塊大多彼此相關聯，當使用者執行一個操作時，會導致不同區塊連動的產生變化。（請忽略左下角的 Angular logo）

![](https://i.imgur.com/ONQCZeh.png)
[圖片來源：麥克的半路出家筆記](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)



### 傳統的思考模式：
需要一一抓到會隨之改變的 DOM 元素，並分別將事件與資料綁定在各自的 DOM 上，而且更新畫面時，要確保畫面跟資料的更新是同步的，最怕發生的情況是資料內容已經改變，畫面卻沒有跟上，還在顯示舊的資料狀態。

### React 的思考模式：

#### State、State and State：
比起資料與 UI 兩把抓，React 的思考模式反而更像個哲學家般關注著在"資料'這件事身上，最常問的就是："資料是什麼？"、"資料要從哪裡來？"、"資料要往哪裡去？"，在 React 中，資料狀態（state）的改變與流向，深深影響著 UI 畫面是否更新。

例如，事先設定資料會傳給哪些區塊使用、資料與這些區塊的 UI 是怎麼相互作用的，因此當使用者執行一個操作時，資料產生變化，瀏覽器重新 render，進而改變 UI 畫面。


#### 參考來源：
* [[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)@麥克的半路出家筆記

## state 跟 props 的差別在哪裡？

### State
* 在 Component 內部
* state 的值可以透過同個 Component 中的 setState 改變

### Props:

* 由父層單向傳遞給子層的 Component
* 只有在父層才能改變 Props 的值
* 子層的 Component 無法改變 Props 的值

> State 在 Component 中就像是自己賺的錢，要給誰用，要怎麼用，要賺多一點，賺少一點...等，完全可以由自己做主
> 
> Props 在 Component 中就像是老爸給的錢，他決定要給你多少就多少，你要，就拿來用；不要，就拉倒。由於是老爸給的，所以身為孩子的你無法討價還價，更別想修改他給你的金額。聽好囉，只用他才有權利更改，因為這是老爸自己賺的錢。


## 請列出 React 的 lifecycle 以及其代表的意義

有聽過周期蟬嗎? 根據 [維基百科](https://zh.wikipedia.org/wiki/%E5%91%A8%E6%9C%9F%E8%9D%89)：
> 周期蟬主要分布於北美，其生命周期為十三年或十七年，也被稱為十七年蟬或十三年蟬。幼蟲孵化後即鑽入地下，一生絕大多數時間在地下度過，靠吸食樹根的汁液生存。在地下生活十三年或十七年後，同種蟬的 若蟲 同時破土而出，在 4-6 周內羽化、交配、產卵、死亡，而卵孵化後進入下一個生命周期

![](https://i.imgur.com/C2fibKj.jpg)
[圖片來源](https://www.dailymail.co.uk/news/article-2328779/Brood-II-HERE-The-moment-cicadas-burst-life-underground-Virginia-yards-17-years.html)


17 年的蟄伏只為了 1 個盛開的夏天，然後周而復始，這就是周期蟬 amazing 的生命周期（lifecycle），那麼 React 的 Component 生命週期呢？


![](https://i.imgur.com/1fQ0XM6.png)
[圖片來源：React LifeCycle Methods Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


上圖可看到，Component 的 Lifecycle 大致來說可以分成三個大階段：

1. **Mounting** : 建立初期，component 被建立
2. **Updating** : 更新時期，當 props 或 state 改變時更新
3. **Unmounting**: 銷毀時期， component 被移除

每個大階段內又進行著其他的 function，

#### 1. Mounting：Component 被建立時，
* **constructor**：在 component 被建立時，可初始化 state 、props，或做事件處理(event handler) 的綁定
* **static getDerivedStateFromProps** ：constructor() 執行完畢後執行，或者當有 props、state 更新，會在 state 更新時被觸發，會回傳一個物件表示更新的 state，或回傳 null 代表不需更新
* **render**：當 getDerivedStateFromProps() 執行完後執行，render 時判斷 state、props 的變化，渲染整個 Component
* **componentDidMount**：等 render() 執行完後有了整個 DOM 結構， componentDidMount 才執行。一般會設置需要在第一次渲染完成時處理的事，例如：串接 API 來請求資料等。


#### 2. Updating：props 或 state 被更新時
* **getDerivedStateFromProps**：同上述，props、state 更新時觸發。
* **shouldComponentUpdate**：在發生 render() 前控制 props 或 state 的更新，預設為 true。如果是 ture，componentDidUpdate 才會執行，如果是 false，就不會繼續往下跑，避免不必要的更新
* **render**：當 props 或 state 改變時，會執行一次渲染
* **getSnapshotBeforeUpdate**：記錄 執行 componentDidUpdate() 之前，頁面 DOM 的狀態
* **componentDidUpdate**：state 改變且 render 後被觸發，多用於「希望在 state 更新後做...事」時使用。但是若shouldComponentUpdate() 設定為 false，即使設定 componentDidUpdate() 也無效。


#### 3. Unmounting：當 component 被移除的時候
* **componentWillUnmount**：在 component unmount 之前執行。通常是當 componentDidMount() 做了某些設定，在 componet unmount 前把這些設定取消 例如取消偵聽、timeout...等

#### 參考資料:
* [【Day 13】React 元件生命週期 (二)：新版 React 生命週期方法](https://ithelp.ithome.com.tw/articles/10244432)

## React Router 背後的原理你猜是怎麼實作的？

React Router 的原理是先取得網址上的路由狀態，然後用條件判斷要去哪個頁面，接著切換到這個網址對應要顯示的組件（Components）

![](https://i.imgur.com/sBtR2td.png)
[圖片來源](http://zhenhua-lee.github.io/react/history.html)

#### React Router 建立在 `window.history `之上：
1. history 首先會將 URL 存入一個專用 state 中，且將這個 URL 轉化成 location 的 object，接著監聽瀏覽器 URL 的變化，
2. 當 `<Link to={}>` 被點擊後，history 發現到路由有變化，觸發 setState 設置新的路徑到 history
3. Route 判斷並匹配新路徑與路由相對應的 Components
4. render 相應的 Components。。

![](https://i.imgur.com/zjGaQG4.png)
[圖片來源](http://zhenhua-lee.github.io/react/history.html)

參考來源：
* [淺談新手在學習 SPA 時的常見問題：以 Router 為例](https://blog.huli.tw/2019/09/18/spa-common-problem-about-router/)@Huli
* [深入了解 React Router 原理](https://zhuanlan.zhihu.com/p/270651966)
* [react-router 的实现原理](http://zhenhua-lee.github.io/react/history.html)
* [React-router-dom | 為了瞭解原理，那就來實作一個 react-router-dom 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/implementing-react-router-dom-bf986888f2ce)
* [React-router-dom | 原理解析](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/a-little-bit-of-react-router-dom-e5b809fcb127#eeb6)
* [「源码解析 」这一次彻底弄懂 react-router 路由原理](https://juejin.cn/post/6886290490640039943)
* [React Router 中文文档](https://react-guide.github.io/react-router-cn/index.html)
* [History](https://developer.mozilla.org/en-US/docs/Web/API/History)@MDN
* [Understanding The Fundamentals of Routing in React](https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e)
* [react-router 源代码学习笔记](https://juejin.cn/post/6844903589601607693)
## SDK 與 API 的差別是什麼？
### SDK(Software Development Kit)：軟體開發套件/軟件開發工具包

SDK 可以想成是輔助某平台或產品的工具包，這個封裝好的工具包裡面可以是套裝軟體、框架、文件或作業系統，甚至可包含了許多組 API，SDK 讓使用者在這個平台或產品中添加一些功能進去。例如 Android 的 Android SDK。

> 假使以Google Chrome 瀏覽器來比喻的話， SDK 是使用者另外下載的擴充套件 （Extensions），讓瀏覽器額外加上截圖、吸取網頁顏色、幫網頁加空格...等功能

### API(Application Programming Interface)：應用程式介面/應用程序接口

API 可以想成是你想要用到別人的資料或功能，對方回說：" 好啊!"，於是他開了一個窗口，告訴你："只要你遵守某些規則，就可以由這個窗口使用我釋出的資料與功能喔～"。 這個窗口就是 API。

> 例如：你想要一周天氣的資料，就去找找看中央氣象局有沒有提供 "一周天氣" 的 API； 
> 
> 或者你想跟小明拿他一個禮拜前就寫好的期末報告，於是將 64G 的 USB 插在小明的筆電，等複製好期末報告的檔案到 USB 後，這次再把 USB 插在你的電腦，把 USB 裡的期末報告檔案傳到你的電腦中。這個 USB 可以想成是 API。
> 
> 或者月底到了，手邊現金只剩下 100 元的小明跑到 ATM 領錢，透過操作 ATM 的螢幕，小明順利拿到了帳戶裡僅剩的一萬塊，這個連接小明與國 X 銀行帳戶資料的螢幕，也可算 API 的概念
> 
> 又或者，小美到美 X 美早餐店點了一個雙層起司蛋豬肉堡不加醬、不加生菜、麵包跟肉分開烤、蛋全熟、帶走，老闆娘聽完後，馬上用她在小學合唱團訓練出來，比雷聲還響亮的嗓門，在 20 個客人面前大聲重複了一次小美的餐點請後場工讀生製作，五分鐘後，老闆娘又再次所有客人面前大喊了一次小美的餐點，說做好囉請她趕快來拿。老闆娘在這個點餐的流程裡，也可以說是 API。


### 總結：
SDK：是一個實現某個功能的開發工具包
API： 是開放資料時提供的溝通方法，讓對方透過制定的規則，拿某些資料


#### 參考來源:
* [SDK 和 API 的区别是什么？](https://www.zhihu.com/question/21691705)
* [SDK 和 API 的区别](https://blog.csdn.net/Carrie_Q/article/details/117822058)
* [✾後花園✾ SDK 和 API 區別](https://ithelp.ithome.com.tw/articles/10231153)
* [关于 API 和 SDK 的理解及两者区别](https://juejin.cn/post/6844903859857555464)
* [[Dev] IDE, API, SDK, Library 基本術語解釋](http://androchen.logdown.com/posts/2014/04/13/api-sdk-library)


## 在用 Ajax 的時候如果不是同源，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

如果是同源的 Ajax => 會自動把 cookie 帶上
如果不同源 Ajax => 若想要把cookie 帶上，必須前端的 request 與後端的 response 都需要做些設置


* 前端要在 request 設定: ` withCredentials = true `
* 後端要在 response 設定:  
    * `Access-Control-Allow-Credentials = true`
    * `Access-Control-Allow-Origin: http://www.xxx.com`

> 注意：`Access-Control-Allow-Origin` 不可為 `*`，一定要明確指定 origin，否則代表任何網站（任何 origin）都可以發 request 到這個 API，並且帶上 cookie，這樣會有安全性問題，所以強制不同源時如果要帶上 cookie，後端需指定是哪個 origin 有權限。

### 前端的 request 設置
#### 用 XMLHttpRequest 時

```
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.xxxx.com', true);
xhr.withCredentials = true; // 添加這一行
xhr.send();
```

#### 用 jQuery 時

```
$.ajax({ 
    method: 'POST', 
    url: ‘http://www.xxxx.com', 
    contentType: "application/json",
    crossDomain: true,          
    xhrFields: {                // 添加這一行
        withCredentials: true  
    } 
    
    ...
})
```

#### 用 fetch 時
```
fetch('http://www.xxxx.com', {
  method: 'POST',
  credentials: 'include', // 添加這一行
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => res.json())
  .then(res => ...)
```

#### 用 axios 時 

```
import axios from 'axios';
axios.defaults.withCredentials = true; // 添加這一行

// or

axios.post(
    url, {withCredentials: true}  // 添加這一行
)
```



### 後端的 response 設置

```
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://www.xxxx.com");
```

#### 用 express 時：

```
const express = require('express');
const app = express();
const cors = require('cors'); //  cors 這個 middleware
app.use(cors{
  credentials: true,   //添加第一處
  origin: '某某 url'   // 添加第二處： 指定 origin 位置 
});
```

參考資料：
* [跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)@MDN
* [CORS 完全手冊（三）：CORS 詳解](https://blog.huli.tw/2021/02/19/cors-guide-3/)@huli
* [輕鬆理解 Ajax 與跨來源請求](https://blog.huli.tw/2017/08/27/ajax-and-cors/)@huli
* [如何配置 ajax 请求跨域携带 cookie，cors 支持 ajax 请求携带 cookie](https://cloud.tencent.com/developer/article/1467263)
* [ajax 跨域请求携带 cookie](https://juejin.cn/post/6844903850705436680)
* [Cookie 的设置、读取以及是否自动携带问题 #2](https://github.com/yinxin630/blog/issues/2)



## 請列出 React 內建的所有 hook，並大概講解功能是什麼
根據 React 官方文件- [Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html)，React 的 Hook 有：
* 基礎 Hook
    * useState
    * useEffect
    * useContext

* 其他 Hook
    * useReducer
    * useCallback
    * useMemo
    * useRef
    * useImperativeHandle
    * useLayoutEffect
    * useDebugValue

### 基礎的 Hook
#### 1. useState： 回傳一個 state 值，以及更新 state 的 function

useState 關注三個部分：
狀態（state）、更新狀態（setState）、初始狀態（initialState）

```javascript=
// 初始化 state
const [state, setState] = useState(initialState);  // 首次 render 時， state 的值跟 useState 第一個參數(initialState) 相同

// setState 的（）內接受新的 state，當 state 改變時重新 render
setState(newState); // 在後續的重新 render，useState 回傳的第一個值必定會是最後更新的 state
```

#### 2. useEffect: 在 React 的 component render 完後要做的事

```javascript= 
useEffect(<didUpdate>, [dependencies])
```

useEffect 包含兩個參數，
* 第一個參數為 Effect function，即等 component 渲染完後要做的事 
* 第二個參數稱為 dependencies，是一個陣列，用來放想要關注的資料，當每次重新渲染後，dependencies 內的元素有改變，useEffect 裡面的 function 才會被執行。
```javascript=
// 當 name 和 age 改變時，re-render
useEffect(() => {
    console.log('render')
}, [name,age])
```
* 若只執行一次，可將 dependencies 設為空陣列 

```javascript=
// 只執行一次
useEffect(() => 
    console.log('render')
  }, [])
```

useEffect  常見用途：
> 想像 useEffect 幫你做些不是組件（component）邏輯中要做的事，以事業為例，就是沒有做本業的事，而是另外跑去做了副業，但主業與副業還是可以相輔相成

* 串接 API 獲取數據
* 事件監聽
* 改變 DOM
* 輸出日誌（logging）

#### 3. useContext: 解決多層傳遞 props 資料的問題，讓父層的資料能夠被底下的任意子層存取

以往要使用到父層級的資料時，需一層層傳遞 props 到子層，即便中間經過的 component 其實不需要用到該 props，因此造成了 Props drilling， useContext 的好處就是讓資料可以直接被任意子層使用 

> 例如：
> 
> 過年時，爺爺想包紅包給孫子以及曾孫們，他先把紅包遞給父親，再請他將紅包轉交給寶貝金孫小華、小美、小明，然後小明再遞給他的女兒小萌。
> 
> 但這樣的方式有點麻煩，爺爺想要乖孫們趕快拿到紅包，不要透過其他人，於是他想到了 useContext 這個方法：爺爺將紅包都放在客廳的桌上，讓想要紅包的小孩們自己來拿，這樣就不用透過其他人來傳來傳去的。
> 

```javascript=
// 1. 首先用 React.createContext 建立一個 A 物件 
// （先建立一個要發紅包給疼愛的孫子的慈祥爺爺）

const P = React.createContext()

// 2. 父級以上的層級:
// 用 <P.Provider value={}> 存取該物件的值 
// (把爺爺給的，裡面有 8888 元的紅包放在桌上囉，要拿的人趕緊來唷)

<P.Provider value='8888'>
 <Child/>
</P.Provider>

// 3. 子層級以下：
// 透過 useContext 來存取 P 傳來的值
// （孩子、孫子輩領取紅包裡的錢）

const money = useContext(P)
return <div>{money}</div>
```
---
### 其他 Hook
#### 1. useReducer：
> 想成是 useState 的升級補充包，或是「能預先定義 state 設定規則」的 useState。
> 
> 根據 [官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usereducer)：當需要複雜的 state 邏輯，而且包括多個子數值或下一個 state 依賴之前的 state，useReducer 會比 useState 更適用


##### useReducer 接收兩個參數
* 第一個是函式 `reducerFunc` ，定義有哪些規則與對應的邏輯
* 第二個則是 `state` 的初始值
* `dispatch` 傳送參數 `action` 給 `reducerFunc` ，`reducerFunc` 通過 `action` 修改 `state`


```javascript=
const [state, dispatch] = useReducer(reducerFunc, initStateValue);
```

以下為[官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usereducer)提供的計數器範例：
```javascript=
// state 初始值
const initialState = {count: 0};

// reducer 接收 state 當前的值，以及 dispatch 傳來的參數 action
function reducer(state, action) {
    // 根據參數 action ，控制相應的邏輯處理方式，回傳 state 的更新狀態
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    // 全都不匹對時，默認的操作
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      // dispatch 傳送參數 action 給 reducer
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```


##### 以拉麵販賣機為例：
> 販賣機在推出前會先決定有哪幾款拉麵、拉麵價格...等 => 定義規則（action）；
> 
> 接著，規劃點擊相應的拉麵圖片按鈕後，會啟動哪些製作步驟 => 邏輯運算（reducer）；
> 
> 當顧客小明上前，透過販賣機的界面(dispatch)，他點了想要的拉麵 (action)，還有投入拉麵的金額(payload)，販賣機接受到的資料且匹對，並確定現有碗數足夠後，開始製作小明所選的拉麵，不到 1 分鐘的時間，送出了熱騰騰的拉麵，並且更新剩餘的碗數 =>狀態更新（state）

![](https://i.imgur.com/b7oi7PW.png)
[圖片來源](https://www.toy-people.com/?p=62903)


#### 2. useCallback：
> 把某個 function 保存下來，避免不必要的重複 render，藉此優化效能，
> 
> 用法與 useMemo 相似，但不同的是：useCallback 回傳的是 callback function 本身 

useCallback 需要傳入兩個參數：

```javascript=
// 傳入 doSomething 方法
// 當陣列中的 a、b 發生改變時才會更新 doSomething

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

* 第一個參數  => 回傳一個 callback function
* 第二個參數 (array) => 
    * 當陣列的內容改變時，原本的 callback function 會更新


#### 3. useMemo：

> 避免重複且複雜的程式計算不斷被 re-render 重複執行，造成效能的問題

usememo 需要傳入兩個參數：

```javascript=
const value = useMemo(callbalck, array)
```

* 第一個參數 （callback) => 做計算處理的函式，會返回一個計算結果
* 第二個參數 (array) => 
    * 當陣列的內容改變時，原本的結果會重新計算一次，
    * 如果是空陣列，只會在初次執行時渲染。

```javascript=
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

##### useCallback 與 useMemo 有什麼不同：

```javascript=
// useCallback(fn, deps) 等同於 useMemo(() => fn, deps)
const A = useCallback(callbalck,array)
相當於
const A = useMemo(()=> callback, array)

***************************
// useCallback 
const getMillionNum = useCallback(()=>{
    return number * 1000000
},[number])

//JSX 
<div>{getMillionNum()}</div> 

***************************
// useMemo
const getMillionNum = useMemo(()=>{
    return number * 1000000
},[number])

//JSX 
<div>{getMillionNum}</div> 
```
* useCallback 
    * 回傳 callBack function，所以可以傳參數進去
    * useCallBack 是暫存某個 function
* useMemo 
    * 回傳值
    * useMemo 是暫存計算的值 ，


##### 使用 useCallback 與 useMemo 使用情景，當 function:
1. 經常使用且執行速度費時
2. 輸入相同的概率很大時，不需被 render over and over again

#### 4. useRef：

> useRef 會回傳一個值，這個值是一個 mutable 的 object，其 key 為 current， 值為 useRef 的初始化參數。
> 
> 更新 current 值並不會觸發 re-render

```javascript=
const A = useRef(0);  // { current: 0 }
console.log(A.current) // 0
```

##### useRef() 可以抓取 DOM 節點，控制 DOM 的行為

```javascript=
const App = () => {
  // 1. 變數 inputDOM 將 useRef() 存起來 
  const inputDOM = useRef();
  
  const clickHandler = () => {
    console.log(inputDOM.current.value）
  }
return 
  <>
    // 2. 透過 ref 屬性，將物件傳入，相當於：這個 input 的 DOM，請幫我存在 inputDOM.current
    <input type='text' ref={inputDOM} />
    
    // 3. 點擊 button 時， 執行 clickHandler
    <button onClick={clickHandler}>Show Value</button>
  </>
}
```

##### useRef() 可以保存一个變數，在不 re-render 的狀態下更新其值，例如：
```javascript=
const isDone = useRef(false)
useEffect( () => {
  if(isDone.current){
    ...
  }else{
    isDone.current = true
  }
})
```

##### useRef() 可以抓 Previous 的值

```javascript=
const App = () => {
  const previousNumber = useRef('');
  
  useEffect(() => {
    previousNumber.current = number
  }, [number])
  
return 
  <>
    <p> Previous number is {previousNumber.current} </p>
  </>
}
```

#### 5. useImperativeHandle：

> 在父層調用子層中 `ref`，選取指定的 DOM 節點
```javascript=
// 第一個參數 ref: 是接收的 ref
// 第二個參數 createHandle: 傳給父層的方法
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 應與 `forwardRef` 一同使用：

```javascript=
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState
} from "react";

const Child = forwardRef((props, ref) => {
  const inputEl = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return (
    <input
      ref={inputEl}
      type="text"
      {...props}
    />
  );
});

function Parent() {
  const inputEl = useRef(null);
  function click() {
    inputEl.current.focus();
  }
  return (
    <div>
      <Child ref={inputEl} />
      <button onClick={click}>click focus</button>
    </div>
  );
}
```

#### 6. useLayoutEffect：功能與 useEffect 相似，差別在於觸發的時間點，useLayoutEffect 會在 render 之前執行


| React Hook | 是否同步 | 執行時間|是否阻塞 UI畫面 |
| -------- | -------- | -------- |-------- |
|useEffect  | 不同步    | 畫面 render 結束後執行    |不會  |
| useLayoutEffect |同步|DOM 改變後執行，等useLayoutEffect 跑完，才 render 畫面|會|


> 由於 useLayoutEffect 會阻礙瀏覽器的更新，所以使用上應先以 useEffect 為主。

#### 7. useDebugValue: 用來在 React DevTools 中顯示自訂義 hook 的標籤

```javascript=
useDebugValue(value)
```

##### 例如： 自定義一個名為 'useFriendStatus' 的 hook

```javascript=
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

參考來源：
* [轻松学会 React 钩子：以 useEffect () 为例](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)@阮一峰
* [[React Hook 筆記] 從最基本的 useState, useEffect 開始](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-%E5%BE%9E%E6%9C%80%E5%9F%BA%E6%9C%AC%E7%9A%84-hook-%E9%96%8B%E5%A7%8B-usestate-useeffect-fee6582d8725)@Hannah Lin
* [從 Hooks 開始，讓你的網頁 React 起來](https://ithelp.ithome.com.tw/users/20103315/ironman/2668)@pjchender
* [react 进阶必学 hook （一）：useState 来一碗大碗宽面](https://blog.csdn.net/tonydz0523/article/details/106405289)
* [React Hooks 一些紀錄](https://medium.com/@mts40110/react-hooks-%E4%B8%80%E4%BA%9B%E7%B4%80%E9%8C%84-e5476075d9b8)
* [【Day.26】React 進階 - useEffect v.s useLayoutEffect](https://ithelp.ithome.com.tw/articles/10252118)
* [When to use useImperativeHandle, useLayoutEffect, and useDebugValue](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)
* [[學習筆記] React 內建的所有 Hooks 功能整理](https://hackmd.io/@Heidi-Liu/react-hooks)@Heidi-Liu
* [这一次彻底搞定 useReducer - 基础概念](https://juejin.cn/post/6844903869437181960)
* [認識 React Hooks 之三](https://ithelp.ithome.com.tw/articles/10253073)
* [React Hook 系列 (一)：彻底搞懂 react-hooks 用法（万字慎点）](https://segmentfault.com/a/1190000021261588)
* [When to use useImperativeHandle, useLayoutEffect, and useDebugValue](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)@stack overflow
## 請問 class component 與 function component 的差別是什麼？
### class component 與 function component 的差異有：
#### class component
* 透過 Javascript ES6 的物件導向語法實作 class component
* 由於 `this `隨時在變，`this.props` 也會跟著改變，所以每次都拿到最新的 `this.props`，但就不易 callback 操作
* 提供生命週期（lifecycle）的一些方法，可在某情境下使用較複雜的 component 狀態
* 語法上，先繼承 `React.Component`，然後執行 `render()`，在` render()`裡面返回 react 片段。

```javascript=
/* Class Component */
/* Syntax */
class Counter extends Component {
  constructor(props){
        super(props);
        this.state = {}
   }
  render() {
    return (
      <div class="App">{this.props.number}</div>;
    )
  }
}
```
#### function component
* 用閉包的形式實作 function component
* 由於閉包的作用，`props` 會是原本傳進來的，而不會隨著更新
* 生命週期主要以 `useEffect` 決定 render 要做的事情
* 語法更簡潔，編譯更快，只需要傳入 `props` 參數，然後返回 react 片段。

```javascript=
/* Functional Component */
function Counter(props) { 
  return <div class="App">{props.number}</div>
}

/* Functional Component - 使用解構語法 */
function Counter({number}) { // 其實就是 const {number} = props
  return <div class="App">{number}</div>
}
```
### 主要差別在於：
#### class component：關注「生命週期」
也就是在某個生命週期階段要做什麼事

#### function component：關注「每一次 render」
每一次 render 都是「重新」呼叫一次 function，並記住「當下」傳進來的 props 就會是「當時」的 props，不會因為 props 改變而改變


參考來源：
* [從實際案例看 class 與 function component 的差異](https://blog.huli.tw/2020/06/15/react-function-class-hook-useeffect/)@Huli
* [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)@Dan Abramov
* [[week 22] 再探 React：Function component vs Class component](https://hackmd.io/@Heidi-Liu/note-fe302-class-component)@Heidi-Liu
* [【Day 8】Class component && Functional component](https://ithelp.ithome.com.tw/articles/10214751)
* [React Functional Component 與 Class Component 的差異](https://medium.com/coding-hot-pot/react-functional-component-v-s-class-component-e46c6dc5a319)
* [Class-based vs Functional Component](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)
* [精读《Function VS Class 组件》](https://juejin.cn/post/6844903798779936782)
* [React-class component 和 function component 的区别](https://blog.csdn.net/qq_24917475/article/details/104167348)
* [ReactJS: what is the difference between functional component and class component](https://stackoverflow.com/questions/35953840/reactjs-what-is-the-difference-between-functional-component-and-class-component)@stack overflow
* [React Class-based vs Functional Component
從特性淺談兩種寫法之異同](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

> 在 React 中，表單 (form) 的 component 處理分為 controlled component 與 uncontrolled component，兩者主要的差別，在於 **component 的資料是否被 React 的控制**

### controlled component：資料由 React 控制
* 首先，建立 `state`，並利用 `state` 綁定並儲存 component 的值（而非直接由 DOM 去取得），
* 接著，根據使用者的輸入，用 `setState()` 更新 `state` 的值
* 最後，UI 畫面根據` state` 是否改變重新渲染 DOM element

```javascript=
function App () {
  // STEP 1：定義 content，預設值先帶為空
  const [ content, setContent] = useState('')
  
  // STEP 3：定義 handleChange 方法
  // STEP 4：把使用者輸入的內容更新到 React 內的資料狀態
  const handleChange = e => setContent(e.target.value)
  
  // STEP 2：
  // 將 input 元素的 value 與 state 綁定
  // 並使用 onChange 事件來監聽使用者輸入資料
  return <input value={content} onChange={handleChange}/>
}
```
> controlled component 使 React 的 state 成為表單元素 "[單一資料來源](https://en.wikipedia.org/wiki/Single_source_of_truth)"

例如在上方範例中， `<input>` 的 `value` 來源是 state，所以無法直接更改值。

這樣做的好處是：
* 表單資料的 state ，統一由 React 控制，避免資料修改來源太多，不好維護
* re-render 時確保畫面與 state 同步更新 （React 的核心精神！）
* 可控性高：可設定表單初始值、檢查是否被修改過、格式驗證...等
* 藉由 form 的 state 連動調整其他 component 的資料

### uncontrolled component ：資料由 DOM 控制

若不想被 React 控制，有兩種方式讓表單資料交給 DOM 自己處理資料存取：

* 第一種是用 `document.querySelector () ` 方法，拿到 input 的東西，但使用 React 時，非常不建議直接去操控 DOM。
* 第二種是藉由 `useRef`  搭配 `ref` ：
    * 首先，建立 `useRef` ，並回傳一個帶有 `current` 屬性的物件，相當於=>`{ current: '' }`
    * 然後，藉由 `ref` 屬性，指稱到某一個 DOM 元素，放入 `useRef `回傳的物件
    * 最後，用 `.current.value` 獲取表單對應的 DOM 元素的 value。
    * UI 畫面由表單元素自身決定


```javascript=
// 概念類似：
// 1. useRef 建立一個盒子，盒子裡有個抽屜叫做 current
// 2. ref 將表單元素的 DOM 跟盒子做連接，要找 DOM 的內容可以來盒子的 current 抽屜裡面存取唷
// 3. 到盒子的 current 抽屜找 DOM 的 value

function App () {
  // STEP 1：使用 useRef 建立一個 ref，取名為 inputRef
 const inputRef = useRef(null)
  
  // STEP 3：
  // 透過 inputLRef.current 可以到該 input 元素
  // 透過 inputRef.current.value 即可取得該 input 元素的值
   const inputContent = inputRef.current.value;
  
  // STEP 2：用 ref 屬性，將 useRef 回傳的物件，指稱為該 input 元素 
  // STEP 4：在 uncontrolled components 中可以使用 defaultValue 定義預設值(選填)
  return <input type="text" defaultValue="0" ref={inputRef} />
}
```

#### 什麼時候會考慮用 uncontrolled component？
1. 跟非 React 的程式碼整合時
2. 使用 `file input` 時：[file input](https://w3c.github.io/FileAPI/) 只允許手動設定，不可使用 JavaScript。因此 `file input `必須為 uncontrolled component。
3. 不需取用 form 的 state 時：如果 form 的行為十分單純，不需複雜的驗證或處理，可以用 uncontrolled component

雖然，uncontrolled component 較容易實現，只需通過 `ref` 直接獲取 DOM 元素，並用 `.current.value` 就能否得到其值。

然而還是提倡盡量使用 controlled component，因為實際開發過程會需要考慮到表單資料的驗證、有條件地關閉 / 開啟按鈕點擊，以及強制輸入格式等功能，透過 React 來控制表單資料，有助於實現上述功能，且幫助開發者從繁重的直接操作 DOM 中釋放出來。

參考來源：
* [Controlled Component](https://zh-hant.reactjs.org/docs/forms.html#controlled-components)@MDN
* [Uncontrolled Component](https://zh-hant.reactjs.org/docs/uncontrolled-components.html)@MDN
* [I Want To Know React - 初探 Form & Controlled component](https://ithelp.ithome.com.tw/articles/10249496)
* [I Want To Know React - Controlled component 語法](https://ithelp.ithome.com.tw/articles/10250041)
* [I Want To Know React - Uncontrolled component](https://ithelp.ithome.com.tw/articles/10250448?sc=rss.iron)
* [[Day 27 - 即時天氣] React 中的表單處理（Controlled vs Uncontrolled）以及 useRef 的使用](https://ithelp.ithome.com.tw/articles/10227866)
* [Day 08 - 淚水交織的表單 (Form)](https://ithelp.ithome.com.tw/articles/10201339)
* [What are React controlled components and uncontrolled components?](https://stackoverflow.com/questions/42522515/what-are-react-controlled-components-and-uncontrolled-components)@stack overflow
* [[react] 元件（component）](https://pjchender.dev/react/react-component/)@PJCHENder
* [React 受控與非受控組件](https://hackmd.io/@chrisHsiao/rknVooSkP)
* [前端框架 React：React Form 報名表單](https://hugh-program-learning-diary-js.medium.com/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6-react-react-form-%E5%A0%B1%E5%90%8D%E8%A1%A8%E5%96%AE-ebd5e3a7201a)
* [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
* [formik](https://formik.org/)


###### tags:  `程式導師計畫` `React` `筆記`

