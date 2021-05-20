```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // => 2
obj2.hello() // => 2
hello() // => undefined
```

在 Javasript 中，this 會根據在不同的情況指向不同的意思；大多情況下 this 代表呼叫 function 的物件


>  this 關乎於呼叫的方式，而非定義的位置 
> 
當遇到無法很快知道 this 值的時候，用 `call()` 的方法去想，就能快速幫助找到該程式碼的 this 是什麼


舉例來說：

我們可以把 ` obj.inner.hello() ` 想成是 `bj.inner.hello.call(obj.inner) ` , 這兩個是相同的，但當換成後面的想法時, call() 裡面傳的第一個參數就是 `this`，我們可以很快的知道此時 `this` 是 `obj.inner` 。

再來練習一題：

把 `obj2.hello()`想成是` obj2.hello.call(obj2)`， `this` 是 call()裡面的第一個參數，也就是` obj2`


如此一來，上面的題目就可解出：

**1. obj.inner.hello()**

根據程式碼執行 `console.log(this.value)`, 由於 this 為 `obj.inner`, 所以找到 `this.value` => `obj.inner.value` => 2 

`印出 2`

**2. obj2.hello()**

`obj2.hello` 的 this 值為 `obj2`, 由於 `obj2` 等於 `obj.inner`, 所以看做與上述相同，所以 `console.log(this.value)` 時，`this.value` => `obj.inner.value` => 2 

`印出 2`

**3. hello()**

跟據之前的練習, hello() 可以看作是 hello.call(), 由於 hello 前面沒有物件在呼叫 hello，所以當普通執行 function 時，this 會為預設值，這個情況下在找 this 時會有一個 tricky 的地方，就是要看是什麼模式下呼叫的:

* 嚴格模式 (use strict) : this 預設值 => `undefined` => hello.call(undefined)
* 一般模式 ：
    * 瀏覽器：this 預設值 => `window` => hello.call(window)
    * node.js : this 預設值 => `global` => hello.call(global)

好的，了解 this 會是什麼之後，讓我們開始執行 hello(), 也就是 obj.inner.hello, 最後跑出console.log(this.value), 由於沒有特別設定最上層 global 或 window 的物件或變數，所以應該找不到 this 的 value 值 => this.value => undefined

嚴格模式下， this 已經為 undefined, 更不可能找到 undefined 的 value, 所以會出現錯誤

輸出結果為：

☞ 嚴格模式：
2
2
報錯：TypeError: Cannot read property 'value' of undefined

==============

☞ 一般模式：
2
2
undefined