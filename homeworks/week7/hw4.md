## 1.什麼是 DOM？

DOM 全名為 Document Object Model（文件物件模型)。DOM 將 HTML 的階層關係轉換成**節點（node）** 和**物件（object）** 的結構。

簡單來說，DOM 就像是 Javascript 與 HTML 之間的橋梁，讓 Javescript 可以選擇並且改變瀏覽器畫面。

![](https://i.imgur.com/gnwMZs9.png)
圖片來源：[https://ithelp.ithome.com.tw/articles/10202689](https://ithelp.ithome.com.tw/articles/10202689)

## 2.事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

**事件**:使用者對畫面元素做了某些事情時，如點擊、滑鼠移過去..etc 時觸發的事情,稱之為"事件"
**事件傳遞**:是指網頁元素接受事件的順序，
**事件傳遞機制的順序**：先捕獲（Capture Phase），到目標階段（Target Phase），再冒泡（Bubbling Phase）。

事件流程由兩種方向傳遞：
**由下而上：事件冒泡（event bubbling）**

- 從啟動事件的節點（event target）開始，逐層往上傳遞，直到根節點 document 為止

![](https://i.imgur.com/qI09xJw.png)
（圖片來源：[https://javascript.info/bubbling-and-capturing](https://javascript.info/bubbling-and-capturing)）

**由上而下：事件捕獲（event capturing）**

- 當點擊某個元素時，瀏覽器會先從最高層開始 capturing，一路前往到事件 target，再向上 bubbling，

![](https://i.imgur.com/0GSl6VE.png)

（圖片來源：[https://javascript.info/bubbling-and-capturing](https://javascript.info/bubbling-and-capturing)）

## 3.什麼是 event delegation，為什麼我們需要它？

**event delegation**: 透過事件冒泡的機制，將 child 的事件向上傳遞給 parent，而非直接將事件綁定在 child 上，與其一一管理個別的 listener，這種由父元素統一監聽，再分頭委派的實作技巧，稱之為**事件代理(event delegation)**

event delegation 的好處是可以減少監聽器的數量:

1. **比較有效率**，不需浪費資源監聽每一個事件，尤其是當這些事件要做的事情都差不多的時候，用一個 event listener 管理即可.
2. **可以處理動態新增的元素**，例如子元素為動態新增按鈕，那麼掛在父元素的上 event listener 仍然可以監聽到新增按鈕的事件.

## 4.event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

#### e.preventDefault(): 阻止瀏覽器的一些預設行為

- `<form>` 的 `submit` -預設行為是送出表單，所以 `e.preventDefault()` 阻止送出表單
- `<a>`- 預設點擊後到超鏈接網址， `e.preventDefault()` 阻止跳轉到超鏈接- 預設點擊後到超鏈接網址， `e.preventDefault()` 阻止跳轉到超鏈接

#### e.stopPropagation(): 阻止事件繼續傳遞，也就是說加在哪邊，事件的傳遞就斷在哪裡，不會繼續往下(或往上)傳遞。

這邊指的「事件傳遞被停止」，意思是說不會再把事件傳遞給「下一個節點」，但若是你在同一個節點上有不只一個 listener，還是會被執行到。儘管已經用 e.stopPropagation，但對於同一個層級，剩下的 listener 還是會被執行到。

若是你想要讓其他同一層級的 listener 也不要被執行，可以改用 e.stopImmediatePropagation();

如果我們想要阻止後續的傳遞機制，可以輸入下面這個指令

```javascript=
e.stopPropagation(); // 阻止後續傳遞機制
e.stopImmediatePropagation(); // 如果有多個監聽，同時阻止所有後續的傳遞機制
```

總而言之，`e.preventDefault()` 是阻止預設行為，`e.stopPropagation()` 是阻止事件繼續傳遞。

參考來源：[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
