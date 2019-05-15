## 請以自己的話解釋 API 是什麼
API為**Application Programming Interface**的縮寫，也就是提供一個介面（中介），讓開發人員可以透過請求，使用軟體開發商提供的資料。

舉例來說,大家一定都有自己或身邊的人去ATM領錢的經驗，ATM的操作介面就是一個API，我們輸入特定資料，告訴ATM介面今天想要執行的是領錢、匯款、還是存錢的功能，然後ATM介面再根據請求，跟後台的程式溝通，取得資料後完成使用者的請求。只要知道如何使用ATM介面，且介面與後台順利串接，我們就算不知道後台程式怎麼寫，也能操作介面提供的功能。

簡單來說： API就是一個媒介，讓應用程式可以串接資料
***

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
### **201** Created
request請求成功，而且新的資源成功被創建

### **401** Unauthorized
需要授權以回應請求

### **451** Unavailable For Legal Reasons
用戶端請求違法的資源，例如受政府審查的網頁。

***

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: [https://findrestaurant.com](https://findrestaurant.com)

#### 1.回傳所有餐廳資料 
```GET /restaurants```

Example： [https://findrestaurant.com/restaurants](https://findrestaurant.com/restaurants)

```
[
  {
    "id": "1",
    "name" : "Starbucks",
    "description": "Starbucks is a lovely coffee shop",
    "contact_no": "(408) 275-9368",
    "area": "San Jose",
    "type": "DRINK",
    "review star": 4
  },
  {
    "id": "2",
    "name" : "Wendy's burger",
    "description": "Wendy's burger has the most delicious burger in the world",
    "contact_no": "(409) 266-4918",
    "area": "LA",
    "type": "HAMBURGER",
    "review star": 6
  },
  {
    "id": "3",
    "name" : "Romeo Cake",
    "description": "Eating the cheese cake,you'll feel like finding your own Julie",
    "contact_no": "(352) 701-3142",
    "area": "Santiago",
    "type": "DESSERT",
    "review star": 8.5
  }
]
```

#### 2.回傳單一餐廳資料

```GET /restaurants/:id```

Example [https://findrestaurant.com/restaurants/1](https://findrestaurant.com/restaurants/1)

```
{
  "id": "1",
  "name" : "Starbucks",
  "description": "Starbucks is a lovely coffee shop",
  "contact_no": "(408) 275-9368",
  "area": "San Jose",
  "type": "DRINK",
  "review star": 4
}```
```
#### 3.刪除餐廳
```DELETE /restaurants/:id```
Example [https://findrestaurant.com/restaurants/1](https://findrestaurant.com/restaurants/1)

#### 4.新增餐廳
```POST /restaurants```
Example [https://findrestaurant.com/restaurants](https://findrestaurant.com/restaurants)
```
{
  "name" : "Hito Ramen",
  "description": "Authentic Japan noodle that you never forget",
  "contact_no": "(123) 190-6877",
  "area": "New York",
  "type": "Japanese FOOD",
  "review star": 10
}
```

#### 5.更改餐廳
```PATCH /restaurants/:id```
Example [https://findrestaurant.com/restaurants/1](https://findrestaurant.com/restaurants/1)

```
{
  "name" : "KFC",
  "description": "KFC is your best choice when hungry in the middle of night",
  "contact_no": "(555) 131-2248",
  "area": "San Jose",
  "type": "FAST FOOD",
  "review star": 7
}
```