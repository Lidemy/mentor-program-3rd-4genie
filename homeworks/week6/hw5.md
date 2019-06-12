## **請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。**
1. `<hr>`: 若想在網頁中加入水平線，可以用`<hr>`。

2.  `<strong> </strong>`: 語義化標籤。如果有非常重要的內文，可用`<strong>`將想要強調或警示的內文包住，被包住的內文會變成粗體。雖然網頁上看起來跟`<b>`很像，都是文字變粗體，不同的是，若單純只想讓字有粗體效果，用`<b>`就好，但如果想要強調被包住的是具有重要意義的內文，則可以使用`<strong>`

3.  `<video></video>`: 若想在網頁中嵌入影片播放器，可以用`<video></video>`



---


## **請問什麼是盒模型（box modal）？**

在 HTML 裡每個元素都可以看成是一個盒子，稱之為「盒模型 (box model) 」可以用 CSS 調整盒子的屬性（width、height、padding、margin）
![](https://i.imgur.com/dX2iT9a.png)
###### [圖片來源](https://reurl.cc/pRDma)
* **margin**：邊框與周圍方塊之間的空間 (視為「外部」空間)
* **padding**：從方塊的邊框位移內容的空間 (視為「內部」空間)
* **border**：方塊的邊界 (無論是否可見)
* **content**：方塊中包含的內容 (例如文字、圖像等)

由於為元素設定 width 和 height 時，width 和 height 的數值會被對應到 content 的尺寸,瀏覽器計算時不會將 pading、border 算在內，所以在進行排版時，有可能會因為算錯尺寸而版型跑掉。為了解決這個問題，可以設定 CSS 的 `box-sizing`屬性:


![](https://i.imgur.com/inEcOSX.png)
###### [圖片來源]( https://reurl.cc/6RgyM)

`content-box`: 為預設值，設定的 width / height 是content的寬高；但整個元素的寬高會是content再向外加上padding、border，所以會大於我們設定的 width / height。

`border-box`: 比較符合人類的認知，也就是瀏覽器在計算 width / height 時，會把 content、padding、border 這三層一併算入，所以：

width = content 寬 + padding 寬 + border 寬
height =content 高 + padding 高 + border 高 


因此，一般來說會直接使用星號 (*) 選擇器讓 box-sizing: border-box 套用到所有的內容。

```
* {
  box-sizing: border-box;
}
```

---


## **請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？**

![](https://i.imgur.com/IJl1WBB.png)
###### [圖片來源](https://reurl.cc/vxnqj)



|  | **Block** | **Inline** | **Inline-block** |
| -------- | -------- | -------- | -------- | 
| 描述     | 例如 div、h1、p 標籤，元素一行行排下來，下一個元素被擠到下一行。     | 例如 a 標籤，後面的元素會緊鄰在這一行的後頭。inline 元素的寬度和高度是由內容決定的，無法隨意改變。     | 元素類似 block 元素，可以調整尺寸，同時又像 inline 元素，可以緊鄰排成同一行。     |
| 時機點 | 當內容需要一塊塊排列下來（如 section 標籤），建議使用 display：block。 | 當內容需要緊接在後成為一行（（如 超鏈接）建議使用 display：inline。 | 當內容需要成為一行排列，又想要調整尺寸大小（如網站上方的導覽列），建議使用 display：inline-block。 | 


---

## **請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合**

![](https://i.imgur.com/iVyo5Vg.png)
###### [圖片來源](https://internetingishard.com/html-and-css/advanced-positioning/)

static： 網頁預設的排版方式，按照display的設定順序排下去

relative：針對原本的位置做位移，其他元素不會改變，只會改變自己的位置

absolute：往上找，對第一個遇到不是static的元素的參考點做絕對定位，下一個元素會遞補這個元素預設的排版位置

fixed：相對於瀏覽器的窗口做定位，不管視窗捲軸怎麼捲動，元素都會固定在設好的位置



|  | **Static** | **Relative** | **Absolute** | **Fixed** 
| -------- | -------- | -------- | -------- | -------- |
| 描述     | 網頁預設的排版方式，按照display的設定順序排下去。     | 針對原本的位置做位移，其他元素不會改變，只會改變自己的位置。     | 往上找，對第一個遇到不是static的元素的參考點做絕對定位，下一個元素會遞補這個元素預設的排版位置。|相對於瀏覽器的窗口做定位，不管視窗捲軸怎麼捲動，元素都會固定在設好的位置。
| 時機點 | 需要元素按照預設順序排好，沒有要變動位置。 | 要某個元素移動位置，但不影響其他元素時。 | 元素需要不規律的佈局，有時候用margin、padding不好調整。 | 想要讓導覽列或廣告在顯示在網頁固定的位置。
