# week 23 fe
## 為什麼我們需要 Redux？

> Redux 其實是另外一個存放 state 的地方。

在 React 中，資料流是單向傳遞的，因此當功能或資料越來越複雜，state 需要被不同的 component 使用時，比起 state 在各個 component 之間一層一層傳遞，將 state 集中儲存在一個類似 global 的共用地方，需要用到它時再去拿會方便許多。（如下圖）

![](https://i.imgur.com/cfkJGjZ.jpg)
[圖片來源](https://css-tricks.com/learning-react-redux/)


Redux 的出現，就是為了解決跨 component 傳遞資料的問題，透過 Store 儲存 state 的狀態。

> 舉例，小明前幾天去南部出差，回來之後準備向公司報銷這次的出差費，於是小明將發票、核銷單等文件整理好後，到三樓的人事處蓋章，然後跑到六樓給部門主管蓋章，主管再交給總經理蓋章，然後小明跑到會計部給新來的會計小華，小華說他審核後，還是要給會計部主任看過，確認無誤才會撥款下來。
> 
>身為履歷與面試中常常自誇自己擅長解決問題的小明，覺得這樣跑來跑出各部門只為了核銷費用，實在太繁瑣且浪費員工們的時間了，請示主管後，決定升級公司內部電腦的連線系統。於是，小明每天下班後留下來加班寫程式，終於在三天三夜不眠不休的努力下，完成這套新系統，以後小明要報帳時，只要直接將申請的資料上傳到公司公用區域，每個需要簽核此資料的相關人員，只要在公用區域打開後簽署即可，再也不用拿著文件在各部門間傳遞。
>
>小明因為這件事提升了公司效率被老闆加薪，而且上班時有更多的時間偷看同事傳來的貓咪影片，從此過著幸福美滿的日子～


### 使用 Redux 的優缺點：
#### 優點
* 統一管理 state
* 資料容易追踪，出問題時較容易找到問題點
#### 缺點
* 專案架構會變得較龐大、複雜

### 需考慮使用 redux 的情況：

* 很多的 components 需要傳遞相同的 state，但他們不是親子關係 (parent/child relationship)

### 使用 Redux 的意義：
很古早以前，那時前端還沒有這麼複雜，也沒有涉及資料數據方面的管理，[Lidemy](https://bootcamp.lidemy.com/) 的課或許只要上一個月就能畢業。不過隨著前端日新月異的發展，為了解決畫面與資料混雜在一起寫，不容易維護的問題，開始引入 MVC 架構，讓資料、UI、邏輯進行拆分處理，直到到近年來， React 框架讓前端開發者能夠只專注於對資料的處理，就能同步改變 UI。

即使畫面與資料已分開處理，資料本身仍然是分散的在各處，尤其是如果有很多地方都重複使用到的數據，想要修改、更新、同步數據的狀態，會變成一件很複雜的事。

Redux 將資料的 state 集中管理，讓單向資料流成為可能，也許未來有更好的方式取代 Redux，但無論使用哪種前端框架，我們都可以從 Redux 中學習管理資料與 UI 的設計模式 (pattern)。


參考資料：
- [Why we need redux in react](https://stackoverflow.com/questions/51064041/why-we-need-redux-in-react)@stack overflow
- [Leveling Up with React: Redux](https://css-tricks.com/learning-react-redux/)
- [Using Redux with React](https://www.kirupa.com/react/using_redux_with_react.htm)
- [First Day Guide to Redux](https://dev.to/voralagas/first-day-to-redux-531)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)@Dan Abramov
- [A beginner’s guide to Redux with React](https://vibrant-mcclintock-5a849d.netlify.app/a-beginner's-guide-to-redux-with-react)
- [Developing modern offline apps with ReactJS, Redux and Electron – Part 3 – ReactJS + Redux](https://blog.codecentric.de/en/2017/12/developing-modern-offline-apps-reactjs-redux-electron-part-3-reactjs-redux-basics/)
- [Day12 | React 的快樂小夥伴 - Redux 資料管理篇](https://ithelp.ithome.com.tw/articles/10219962)@神 Q 超人
- [Day 11 - 初探 Redux (State)](https://ithelp.ithome.com.tw/articles/10202594)
- [You don't have to use Redux](https://dev.to/anssamghezala/you-don-t-have-to-use-redux-32a6)
## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

### Redux 是什麽

隨著專案越來越龐大，資料中的 state、props 在各個層級的 component 中傳遞也變得越加複雜，例如當 component 像俄羅斯娃娃般的嵌套層級時，props 的傳遞會出現 [Prop drilling](https://dev.to/varunprashar5/what-is-prop-drilling-in-react-understanding-context-api-part-1-381l)，而且就算是平行關係的 component 彼此要互動也是一件很麻煩的事。
![](https://i.imgur.com/xXDF9Yz.png)
[圖片來源](https://www.kirupa.com/react/using_redux_with_react.htm)

於是，有開發者設計了全域的 state（Global State）的資料傳遞模式，幫助管理複雜的狀態，也更有效的讓專案的「畫面」及「資料」分離。


Redux 做的就是幫你管理整個專案需要的 state，component 從Redux 中取得它需要的 state，想像它是圖書館或檔案室，將資料集中管理。

![](https://i.imgur.com/NU5FMKN.png)
[圖片來源](https://www.kirupa.com/react/using_redux_with_react.htm)

Redux 是一種設計模式，與 React 沒有相依關係，不是偶像愛情劇，沒有誰一定要誰不可，所以 Redux 可以單獨使用或搭配其他前端框架使用

### Redux 的各個元件
#### Action：下指令用的

是 store 唯一的資訊來源。描述這個 action 的類型（type）、與即將要改變的值（payload）有哪些。

> 就像玩桌遊時，玩家有可能拿到機會卡與命運卡這兩種牌卡，牌卡上會顯示以下資訊：
> 1，這是什麼卡？機會卡還是命運卡
> 2. 這張卡上的訊息是什麼？

```
// 舉一個簡易的計數器 APP 為例， 它的加 1 的 action 可能為以下： 
// 變數 addCount， 裡面有類別（type） 與帶入的資訊（payload） 
export const addCount = () => {
  type: 'ADD_COUNT'
  payload: {
    number: 2
  }
}
```

然後，透過 dispatch，將 action 傳送到 reducer 那邊進行資料處理。

> 想像這張牌卡的內容需要 dispatch 這個差使幫你傳送到 reducer 部門執行

---
#### Reducer：執行指令
兩個重點：設計 State / 處理 Action。 

Reducer 首先拿到原始的 state，接著處理收到的 action 指令，根據不同的 action.type，決定要用哪個邏輯來改變 store 裡的 state，然後用 action.payload 提供的資料改變 state 的內容，得到新的 state

> reducer 部門拿到牌卡後，根據牌卡的類型，把它分發到不同的執行部門，每個部門再透過牌卡內容，改變原本儲存的狀態（銀行給玩家獎金 1 萬、暫停一回合、蓋兩間旅館....）

```
// state 初始值
const initialState = 0;

export default function count(state = initialState, action) {
  // 用 switch 來處理多個 action 發生時的處理方式
  switch (action.type) {
    case ADD_COUNT:
      return state += action.payload.number
    default:
      return state;
  }
}
```
---
#### Store：統一管理 state 
一句話： 儲存 state 的地方 

store 是 Redux 運作的核心，集中管理整個專案的 state

> 想像 store 是一個記錄現在遊戲狀態的地方（玩家們有多少金幣、多少間旅館、玩了多少回合、排名...）

### Redux 的資料流

一種單向的資料流，原理是將要做的 action 透過 dispatch 傳送給 store 中的 reducer，reducer 執行後再把新的 state 儲存在 store 裡面

![](https://i.imgur.com/KpYg2MV.gif)
[圖片來源：Redux 官方網站](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

上例大致流程為：

1. **事件發生**： 使用者通過 UI 畫面的點擊，觸發事件發生(onclick)
2. **發送 Action**： 觸發的事件透過 Dispatch 的方法向 Store 發送 Action
3. **更改 State**： Store 調用 Reducer，Reducer 拿到 State 和 Action 後，根據不同的 action.type，決定要用哪個邏輯來改變 state 狀態，得到新的 State


參考資料：
- [Getting Started with Redux](https://redux.js.org/introduction/getting-started)@Redux 官網
- [Redux中文版](https://chentsulin.github.io/redux/index.html)
- [[Redux] Redex 核心概念筆記](https://note.pcwu.net/2017/03/04/redux-intro/)
- [Redux Crash Course with Hooks](https://dev.to/chrisachard/redux-crash-course-with-hooks-a54)@Chris Achard
- [Fundamentals of Redux Course from Dan Abramov](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)@Dan Abramov
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)@Dan Abramov
- [Using Presentational and Container Components with Redux](https://www.newline.co/fullstack-react/p/using-presentational-and-container-components-with-redux/)
- [Container 與 Presentational Components 入門](https://github.com/kdchang/reactjs101/blob/master/Ch08/container-presentational-component-.md)@kdchang
- [Implementing the Container Pattern using React Hooks](https://blog.bitsrc.io/implementing-the-container-pattern-using-react-hooks-f490a8492d05)
- [為什麼需要使用 Redux 在專案上](https://blog.yyisyou.tw/bff9cac8/)
- [猴子也能看懂的 React 教學 - 4 - 從 React 走向框架，把後端移到前端](https://j6qup3.github.io/2016/08/19/%E7%8C%B4%E5%AD%90%E4%B9%9F%E8%83%BD%E7%9C%8B%E6%87%82%E7%9A%84-React-%E6%95%99%E5%AD%B8-4/#%E6%A6%82%E5%BF%B5-Front-End-Routing)
- [redux 入门](https://qt92.github.io/2018/09/28/redux%E5%85%A5%E9%97%A8/)
- [解读 redux 工作原理](https://segmentfault.com/a/1190000004236064?_ea=1674132)
- [Day 26: Redux 篇 - 第一次使用 Redux 於 React 應用](https://ithelp.ithome.com.tw/articles/10187640)
- [【Day.28】React 進階 - 導入 Redux，讓元件溝通更簡潔](https://ithelp.ithome.com.tw/articles/10252663?sc=pt)
- [【DAY 11】Redux 不是小三！它只是和 ReactJS 較契合！](https://ithelp.ithome.com.tw/articles/10202494)
- [Redux 学习手册](https://juejin.cn/post/6844903661273874440)
- [React Tutorial 27 - Todo-List with Redux | Editing Todo-List](https://www.youtube.com/watch?v=vDZMSvsw66o)
- [[實作] 使用 Redux 實作 Todo-List](https://medium.com/lion-f2e/%E5%AF%A6%E4%BD%9C-%E4%BD%BF%E7%94%A8-redux-%E5%AF%A6%E4%BD%9C-todo-list-43fd1d73d4c1)
- [Redux Style Guide (中文翻譯) — Part 1](https://medium.com/@a401120174/tr-85e00315cd73)@Louis Liao
- [Redux Style Guide (中文翻譯) — Part 2](https://medium.com/@a401120174/redux-%E5%AE%98%E6%96%B9%E9%A2%A8%E6%A0%BC%E6%8C%87%E5%8D%97-%E8%AD%AF-part-2-a438fb544b61)@Louis Liao
- [Still don't understand why you need Redux? Read this...](https://almerosteyn.com/2016/08/redux-explained-again)
- [8 no-Flux strategies for React component communication](https://www.javascriptstuff.com/component-communication/#5-parent-component)


## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？

**SPA（Single Page Application），單頁式應用**：

指整個網站中，使用者看到的只有一個頁面，所有的畫面與互動都是透過前端的 JavaScript 動態產生的，瀏覽器並非真的跳轉到另一個頁面，而是 Javascript 透過管理 Router 的狀態，改變 UI

![](https://i.imgur.com/6JlVUf0.png)
[圖片來源](https://lvivity.com/single-page-app-vs-multi-page-app)


SPA 的原理是透過 AJAX 非同步的方式，解決傳統 MPA (Multi-Page Application)，頁面收到 response 後重新整理的問題

![](https://i.imgur.com/pS01PYV.png)
![](https://i.imgur.com/jWEJWPZ.png)
[圖片來源](http://www.code2succeed.com/single-page-application/)

### 使用 SPA 的優缺點
- 優點：
    - **良好的使用者體驗**：網頁服務不會被中斷，或出現換頁時的白畫面
- 缺點：
    - **開發變複雜**：要處理原本後端負責的路由、狀態
    - **資料變龐大**：只有一頁，卻要下載一大包 JavaScript 或是其他頁面的 template。
    - **不利於 SEO**：client side render 的關係，內容是由 JavaScript 動態產生的，檢視原始碼會發現幾乎為空，有些搜尋引擎可能會爬不到資料


### SPA 架構的頁面常見於需要在換頁時不中斷內容的服務： 
- 音樂串流網站： 一邊播音樂，一邊切換歌手介紹、專輯介紹等列表如時，音樂還是持續播放
- 影片串流、直播網站： 像是 Youtube、Twitch，在你瀏覽其他頁面的時候，原本在看的影片會縮小到右下角。
- 網頁遊戲

參考來源：
- [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://hulitw.medium.com/introduction-mvc-spa-and-ssr-545c941669e9)@Huli
- [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)@Huli
- [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
- [React | 用實作了解 Server-Side Rendering 的運作原理](https://medium.com/starbugs/react-%E7%94%A8%E5%AF%A6%E4%BD%9C%E4%BA%86%E8%A7%A3-server-side-rendering-%E7%9A%84%E9%81%8B%E4%BD%9C%E5%8E%9F%E7%90%86-c6133d9fb30d)@神 Q 超人

## 該怎麼把 React 跟 Redux 串起來？
> 範例：建立一個React 串接 Redux 的簡單 APP，功能為顯示一個數字，滑鼠每點數字一下就會 + 1，

1. 安裝 [redux](https://redux.js.org/introduction/installation)：`npm install redux `
2. 安裝 [react-redux ](https://react-redux.js.org/introduction/getting-started): `npm install --save react-redux`
3. 建立 store
```
// ./redux/store.js
// 創建一個 store，統一儲存 rootReducer 的 state
import { creareStore } from 'redux';
import rootReducer from './reducers';

export default creareStore(rootReducer)
```

4. 建立 reducer (如果有很多個 reducer => 另外建立 combineReducer)
```
// ./redux/reducers/ count.js

import { ADD_COUNT } from '../actionTypes';

// state 初始值
const initialState = 0;

export default function count(state = initialState, action) {
  // 用 switch 來處理多個 action 發生時的處理方式
  switch (action.type) {
    case ADD_COUNT:
      return state += action.payload.number
    default:
      return state;
  }
}
```

```
// ./redux/reducers/index.js
// 結合多個 reducer 的地方 => 建立 combineReducer
import { combineReducers } from 'redux';
import count from './count';

const rootReducer = combineReducers({
  count,
});

export default rootReducer;
```
5. 建立 actions (如果有很多 action => 另外建立 actionType 統一管理 action 的名稱)

```
// ./redux/actions.js
import * as types from './actionTypes';

export const addCount = () => {
  type: 'ADD_COUNT'
  payload: {
    number: 2
  }
}
```

```
// ./redux/actionTypes.js
// 建立 actionTypes
// 避免 actionType 打錯字產生難以追蹤的錯誤,比較容易 debug

export const ADD_COUNT = 'ADD_COUNT';
```

6. 建立 selector 來方便拿取 store 裡面的資料
```
// ./redux/selectors.js
// 輸出多個 selector
export const getCount = (store) => store.count;
```

7. 建立 Provider
```
// index.js

//在 React 的 index.js 裡面用 Provider 包住整個 App
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
8. 改寫原本的 App.js
    - 用 `useSelector` 拿出 state，
    - 之後在需要改變 state 的地方引入 `useDispatch` 跟會用到的 action 之後就可以用 `dispatch(action())` 來改變 state

```
// app.js

import { getCount } from './redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addCount } from './redux/actions';

function App() {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  return <div onClick={() => dispatch(addCount())}>{count}</div>;
}

export default App;
```


參考資料：
- [Tutorial: Using the connect API](https://react-redux.js.org/tutorials/connect)@Redux
- [Flux 介紹](https://facebook.github.io/flux/docs/in-depth-overview/)@facebook
- [Flux For Beginners](https://blog.andrewray.me/flux-for-stupid-people/)
- [React/Flux in Action 實戰經驗分享](https://speakerdeck.com/coodoo/flux-in-action-shi-zhan-jing-yan-fen-xiang)@Jeremy Lu
- [從 Flux 與 MVC 的差異來簡介 Flux](https://blog.techbridge.cc/2016/04/29/introduce-flux-from-flux-and-mvc/)
