## Redux 如何解決非同步（例如說 call API 拿資料）的問題

Redux 利用 **middleware (中介軟體)** 來處理非同步的問題。

Redux middleware 是`action` 被 `dispatch` 送到 `reducer` 前會經過的中繼站。

> `action` 在被 `dispatch` 派送的過程中，傳到 `reducer` 前先經過 middleware 做一些額外的處理（例如call API、setTimeout() 延遲 action 等），接著 `dispatch` 再將處理後產出的新 `action` 傳到 `reducer`。

![](https://i.imgur.com/kvBQoUO.jpg)
[圖片來源](https://blog.csdn.net/hl582567508/article/details/76982756)


#### 常見處理非同步的 Redux middleware 有： 
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-promise](https://github.com/redux-utilities/redux-promise)
- [redux-saga](https://redux-saga.js.org/)
- [redux-observable](https://redux-observable.js.org/)



參考來源
- [Day 24 - 二周目 - Redux 如何發出非同步 action：引入非同步 middleware](https://ithelp.ithome.com.tw/articles/10204829)
- [[Day 20] 用 Redux Thunk 來處理非同步 action](https://ithelp.ithome.com.tw/articles/10240464)


## Redux middleware 是什麼？
 
### 什麼是 React  middleware： 
`action` 被 `dispatch` 送到 `reducer` 前會經過的中繼站，


> 想像坐爸爸的車去學校之前，中途先到便利商店買點東西；或者媽媽騎摩托車去市買菜前，中間先停在郵局辦點事。中間經過便利商店或郵局處理做一些額外的事情，大概就像 middleware 的概念。

![](https://i.imgur.com/GLUFZHj.png)
[圖片來源](https://max80713.medium.com/%E8%A9%B3%E8%A7%A3-redux-middleware-efd6a506357e)

透過 Redux middleware， 可以執行非同步行為(call API 拿取資訊或` setTimeout()` 等)、印出 log、回報錯誤等。

舉例來說，如果使用者點擊文章標題後，會 call api 拿到該文章，然後跳轉顯示文章全文頁

`Redux thunk` 這個 middleware 就可以幫的上忙，它做的事就是非同步結合 Redux 的資料流：

> `Redux thunk` 向 server 端發出非同步的 request，拿到 response 後，再將 response 結果放入 `action `的 `payload`，`dispatch` 接著傳給 `store` 中的` reducer` 修改 `store` 中的 `state`（詳見下方的官方範例動畫）。


![](https://i.imgur.com/SShjQg4.gif)
[圖片來源](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)



### 可以不用 middleware 嗎？

middleware 讓開發者可以 `dispatch` `action `以外的東西，然後再接著送至 reducer，middleware 能記錄（log）或調整 `action`。

而且可有不止一個 middleware，在設置多個 middleware 時會根據其目的調整 action，就像媽媽可能去郵局辦完事，再去髮廊剪個劉海，再去做個 SPA，然後才去菜市場買菜。

不使用 middleware 的話，Redux 的 `store` 只支援同步資料流，假使你的網站功能很單純，不需要非同步處理或其他像是印出 log、回報錯誤等行為，其實是可以不使用 Redux middleware。


### 其他的 Redux middleware 
#### [Redux Saga](https://redux-saga.js.org/)
處理更複雜的非同步操作，例如途中取消非同步操作、模擬類似資料庫 transaction 的操作方式等。
#### [Redux Observable](https://redux-observable.js.org/)
也是另一個處理複雜條件的非同步事件，例如點選一部影片，卻在影片載入完成前取消並點選了另一部影片時，這時 Redux Observable 可以協助做出判斷，


參考資料：
- [Redux Essentials, Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)@Redux 
- [Redux Fundamentals, Part 6: Async Logic and Data Fetching](https://redux.js.org/tutorials/fundamentals/part-6-async-logic) @Redux 
- [Getting Started with Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide) @Redux Toolkit
- [Redux Toolkit- createSlice](https://redux-toolkit.js.org/api/createslice) @Redux Toolkit
- [Async Action](https://chentsulin.github.io/redux/docs/advanced/AsyncActions.html)
- [Day 28: Redux 篇：使用 middleware (中介軟體) 處理異步動作](https://ithelp.ithome.com.tw/articles/10187802)
- [輕鬆應付複雜的非同步操作：RxJS Redux Observable](https://hackmd.io/c/MW18/%2F2X5MCfKoQxWOCOpZ7tqsgA)@huli
- [[Redux] middleware 筆記](https://pjchender.dev/react/redux-middleware/) @PJCHENder
- [Redux middleware | 原理解析](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/exploring-redux-middleware-b63b1fc4485f)
- [詳解 Redux Middleware](https://max80713.medium.com/%E8%A9%B3%E8%A7%A3-redux-middleware-efd6a506357e)
- [【Day 27】Redux middleware - redux-thunk](https://ithelp.ithome.com.tw/articles/10223346?sc=rss.iron)
- [[筆記] React 如何使用 Redux-Observable：副線打怪一下 (2)](https://ithelp.ithome.com.tw/articles/10230156)

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
### 什麼是 CSR？ 什麼是 SSR？
![](https://i.imgur.com/quBrXUc.png)

[圖片來源](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)

#### CSR（Client Side Rendering）
網頁的內容和畫面是在 Server 端傳送資料到瀏覽器後，由 JavaScript 動態產生，在 Client 端完成 render 的。

在 React CSR 的流程:

1. 瀏覽器請求 HTML
2. 瀏覽器請求 JavaScript
3. React mount 到 DOM 上 / call API / 監聽事件
4. 產生畫面

--- 
#### SSR（Server-side-rendering）
指內容和畫面在 Server 端就已渲染成一個完整的檔案，然後用 response 的形式傳給 Client 端。


React SSR 的流程:

1. 瀏覽器請求 HTML
2. 伺服器回傳 HTML
3. 瀏覽器請求 JavaScript
4. React 監聽事件


### CSR 與 SSR 的差別

最主要的差別為瀏覽器第一次向網站請求時，畫面是如何生成的

![](https://i.imgur.com/hxSA9hY.png)

[圖片來源](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)


#### CSR：
- 網站的內容和畫面由透過 JavaScript 動態產生，
- 等 JavaScript 被載入後，才由 React mount 到 DOM 上，以及 call API 去獲取資料，最後 render 出畫面，
- 用瀏覽器的 devtool 檢視原始碼時，HTML 會看不到實際資料
- 搜尋引擎的爬蟲可能會爬不到網頁內容，不利於 SEO 。
--- 
#### SSR：
- 網站的畫面由 Server 端渲染後回傳的 HTML 檔案產生，
- 檢視原始碼時，可看到完整資料，
- 爬蟲所撈到的資料為具完整內容的 HTML，有利於 SEO。

補充：[minw ](https://minw.medium.com/)助教之前補充的一張圖：
![](https://i.imgur.com/wfTSlx6.png)

### 為什麼我們需要 SSR？ 

由上述說明我們可以得知，SSR 是 Server 端先渲染好，再交給瀏覽器顯示 HTML。

由於資料綁定和結合 UI 都是在 Server 端完成，Server 端負荷太重，且每當更新時畫面需要重新載入，不利於使用者體驗（UX）。

為了解決這些問題，逐漸演變出 CSR 的方法，但任何新方法都可能是另一個新的雙面刃，CSR 自己也衍生出了一些待處理的情況，例如它**不利於搜尋引擎最優化（SEO）**，以及由於網頁內容都是 Javascript render 產生，**載入過大的 Javascript 檔案也造成使用者體驗不佳** (例如頁面要 load 比較久）


有些開發者們開始設想，我們是否能同時截取 CSR 以及 SSR 的優點呢？ （世界上大多的創新都是 remix 後的產物～）

於是，SSR 與 CSR 結合的結果為：

**SSR 負責第一次的渲染**：初始的畫面由 Server 端渲染並回傳完整的 HTML 內容，如此一來，有助於網站的 SEO，且因為不用等 Javascript 下載完成後再開始載入內容，載入及畫面呈現的速度較快；

**CSR 負責後續畫面與內容的處理**：後續的頁面操作則交由 Client 端的 Javascript 處理，動態產生內容與畫面，。

所以，回到一開頭的問題，為什麼我們需要 SSR 呢？ 我們現在可以知道，開發者使用 SSR 是為了彌補 CSR 的不足，提升網站的 SEO 排名，以及減少使用者從請求網頁到看見網頁內容時間。


參考來源：
- [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
- [[note] React SSR](https://pjchender.dev/react/note-react-ssr/)

## React 提供了哪些原生的方法讓你實作 SSR？

實作 SSR 的思路為：使用者進入網頁時，跟渲染伺服器請求 HTML，渲染伺服器將 HTML 以字串的形式回傳給使用者，瀏覽器解析 HTML 字串並顯示內容。

![](https://i.imgur.com/NAUjKFa.png)

[圖片來源](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)


若要實作上述的 SSR 時會需要解決兩個問題：

**1. 如何將一個 React Component 轉成字串。**

> React 的 `ReactDOMServer` 提供 `renderToString()`、`renderToStaticMarkup()` 兩個在伺服器端渲染的方法，將要渲染的 component 轉成 HTML 字串

**2. 如何讓網頁可以互動**

> 只看到回傳的純 HTML 還不行，因為任何的元素都未做事件處理，無法產生互動，因此使用 ` ReactDOM.hydrate() `，恢復原本元素上被綁定的事件。







### renderToString()
```
ReactDOMServer.renderToString ()
```

在 server 端將 React component 渲染成初始的 HTML string，當使用者發出 request 時，以 response 的形式回傳並顯示於頁面上

這麼做的好處是：加快頁面載入速度，並讓搜尋引擎爬取你的頁面，以達到 SEO 最佳化的效果。


```
import ReactDOMServer from 'react-dom/server';

// 範例 1
ReactDOMServer.renderToString(
    <HelloButton name="Mark" />
);

// 範例 2
const HTML = ReactDOMServer.renderToString(<div>...</div>);
res.write(HTML);
```






### renderToStaticMarkup()
```
ReactDOMServer.renderToStaticMarkup(element)
```

類似 `renderToString(element) `，同樣是將 React component 轉化為 HTML 字串，並當作 Response 回傳到 client 端。區別是不會產生 React 內部使用的 DOM 屬性，例如: `data-reactroot`

優點是：節省字節，減少檔案的大小，適合用在不需互動的靜態網頁

如果想讓網頁跟客戶端互動的話，會建議使用 `renderToString()` 配上 `hydrate()`



### ReactDOM.hydrate ()

```
ReactDOM.hydrate(element, container[, callback])
```
 `ReactDOMServer.renderToString()` 幫我們將元件（component）轉成 HTML String，並回傳給瀏覽器，雖然這個方法讓網站有了結構和樣式的 HTML 元素，卻無法動起來，至少需加上事件處理的功能（event listener）才行
 
> 就像房子內的格局和家電已佈置完成，卻還沒有接上水、電、瓦斯以及網路，屋內設施無法運轉起來

 `ReactDOM.hydrate()`：在原有的 HTML markup 基礎上附加與網頁互動有關的 event listener 功能，讓瀏覽器能看到 HTML 的內容之外，使用者也能與網頁正常互動。

###  React SSR 流程
1. 伺服器將 React App 透過 `ReactDOM.renderToString()` 產生 HTML 樣版。
2. 把產生好的 HTML 樣版丟到使用者的瀏覽器。
3. 瀏覽器轉譯此 HTML 樣版，並下載給 client 使用的 bundle.js 檔。
4. 瀏覽器載入並執行 bundle.js 檔案。
5. 在相同的 div 中，手動再次轉譯 React App。
6. React 會在瀏覽器轉譯 App，並比較新的 HTML 和原本的 HTML 樣版有何差異。
7. React 取代原本的伺服器所轉譯的樣版，綁定相關的事件處理器。

![](https://i.imgur.com/hmY9TXC.png)
[圖片來源](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)


參考來源：
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html#gatsby-focus-wrapper)
- [hydrate()](https://zh-hant.reactjs.org/docs/react-dom.html#hydrate)
- [What's the difference between hydrate() and render() in React 16?](https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16)
- [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
- [react中出现的"hydrate"这个单词到底是什么意思?](https://www.zhihu.com/question/66068748)
- [一看就懂的 React Server Rendering](https://blog.techbridge.cc/2016/08/27/react-redux-immutablejs-node-server-isomorphic-tutorial/)


## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

### [Prerender](https://prerender.io/)

prenrender 的概念很好理解：預先幫你完成網頁的渲染並儲存成靜態的 HTML，然後檢查收到的請求（request），看它是否來自搜尋引擎的爬蟲（crawler），如果是的話，prerender 就將渲染的結果交給搜尋引擎。

相較其他的解決方案，優點是配置簡單且不用修改原始碼。


### [Next.js](https://nextjs.org/)

Next.js 是在 React 框架基礎上，內建 SSR，提供 Pre-rendering 的功能，能直接建立 page 並在 build 的階段就產生渲染完的靜態頁面並回傳給客戶端。


#### Next.js 的特色為：

- 檔案架構即 routing 路徑。
    - 根據 pages 資料夾下的檔案名稱，自動產生路由（routing）。例如：檔案路徑為 `pages/about.js` 時，當輸入 [http:.../about](https://) ，就會顯示 `about.js` 的內容。
    
- 兩種 pre-rendering 的方法：
    - Static generation ：
        - 又稱 SSG（Static Site Generation）
        - 在 **build 階段** 預先渲染 HTML，並在其後的每一個 request 使用同樣的 HTML。
        - 適用於靜態網頁。
    - Server-side Rendering：
        - 能將 component 轉為 string
        - 可使用 `getInitialProps` 設置在一到頁面時就會執行像是 call API 等非同步操作，再把 return 的值用 props 傳入，SSR 能讓每次渲染時已完成非同步操作。
        
        ```
        // Next.js 提供的範例：
        
        function Page({ stars }) {
          return <div>Next stars: {stars}</div>
        }

        Page.getInitialProps = async () => { // 每到此頁都會執行
          const res = await fetch('https://api.github.com/repos/vercel/next.js')
          const json = await res.json()
          return { stars: json.stargazers_count }
        }

        export default Page
        ```

> 另外還有 [Egg + React + SSR boilerplate](https://github.com/ykfe/egg-react-ssr)、[Razzle](https://github.com/jaredpalmer/razzle/tree/9a3939ac880ac6d655aa275659d3cbaae41180e4)、[Gatsby](https://www.gatsbyjs.com/) 等 SSR 的解決方案可供參考。選你所愛，愛你所選～❤️


參考來源：
- [Next.js](https://nextjs.org/)
- [Next.js getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
- [Next.js getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
- [Next.js getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
- [react-ssr npm](https://www.npmjs.com/package/react-ssr)
- [Prerender.io](https://prerender.io/)
- [Prerender.io – Quick solution for the SEO of your SPA](https://www.hacksoft.io/blog/prerender-io-seo-of-spa)
- [Implement dynamic rendering](https://developers.google.com/search/docs/advanced/javascript/dynamic-rendering)
- [How the new Next.js 9.3 Preview Mode works and why it's a game-changer](https://www.datocms.com/blog/how-the-new-next-js-9-3-preview-mode-works)
- [[Day 15] Server-Side-Rendering - (2) feat. Next.js](https://ithelp.ithome.com.tw/articles/10245758)
- [Egg + React + SSR boilerplate](https://github.com/ykfe/egg-react-ssr)
- [什麼是 PreRender.io 預渲染](https://kknews.cc/tech/engngl4.html)
- [初探 Server-Side-Rendering 與 Next.js](https://medium.com/starbugs/%E5%88%9D%E6%8E%A2-server-side-rendering-%E8%88%87-next-js-%E6%8E%A8%E5%9D%91%E8%A8%88%E7%95%AB-d7a9fb48a964)
- [Async Actions](https://chentsulin.github.io/redux/docs/advanced/AsyncActions.html)
- [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
- [前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4)
- [React | 用實作了解 Server-Side Rendering 的運作原理](https://medium.com/starbugs/react-%E7%94%A8%E5%AF%A6%E4%BD%9C%E4%BA%86%E8%A7%A3-server-side-rendering-%E7%9A%84%E9%81%8B%E4%BD%9C%E5%8E%9F%E7%90%86-c6133d9fb30d)
- [Next.js 简明教程](https://zhuanlan.zhihu.com/p/130247139)
- [初探 nextjs 服務端渲染框架](https://www.gushiciku.cn/pl/pE1f/zh-tw)
- [從零開始用 React 搭建自己的技術部落格，遇到的問題](https://www.gushiciku.cn/pl/pAn4/zh-tw)


## hw1：SPA 部落格加強版
延續上週的作業，我們這次要把 Redux 給加進來。就如同我們教過的一樣，Redux 通常適合用在儲存「global 的狀態」，因此在這個作業中你必須增把 Navbar 的部分改成用 Redux 來處理，所以你應該會在 store 裡面儲存現在所在的分頁，而且還需要建立一個 action 來改變分頁的狀態。

除了這些以外呢，也希望你能新增一些功能：

發表文章
刪除文章
編輯文章


## hw1：SPA 部落格最後加強版
這我們要把有 API call 的地方都改成用 redux-promise 來實作，除了這些以外呢，也希望你能新增一些功能：


發表文章
刪除文章
編輯文章
Markdown 格式來撰寫及顯示文章

除了增加功能以外，我們原本 user 的資料是存在 context，這週的作業要請你把 context 拔掉，改用 redux 來存這個資訊。所以資料的更新也必須透過 redux。

除此之外，在發 API 的部分我們原本是在 component 裡面直接用 fetch，現在請你改用 redux-thunk 來完成，所以 API 的 loading 狀態以及 response 都會存在 store 裡面。



###### tags:  `程式導師計畫` `React` `筆記`