``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```


## 執行流程
1. 執行第 1 行，設定參數'arr' 為[3, 5, 8, 13, 22, 35] 
2. 執行第 2 行，設定變數 i 是 0，檢查 i 是否 < 參數 'arr' 的長度 6，是，繼續執行，開始進入第一個迴圈
3. 執行第 3 行，判斷arr[0]的值是否小於等於 0，不是
4. 第一圈迴圈結束，跑回第 2 行，i++，i 變成 1，檢查是否 < 6，是，繼續執行
5. 執行第 3 行，判斷arr[1]的值是否小於等於 0，不是 
6. 第二圈迴圈結束，跑回第 2 行，i++，i 變成 2，檢查是否 < 6，是，繼續執行
7. 執行第 3 行，判斷arr[2]的值是否小於等於 0，不是 
8. 第三圈迴圈結束，跑回第 2 行，i++，i 變成 3，檢查是否 < 6，是，繼續執行
9. 執行第 3 行，判斷arr[3]的值是否小於等於 0，不是 
10. 第四圈迴圈結束，跑回第 2 行，i++，i 變成 4，檢查是否 < 6，是，繼續執行
11. 執行第 3 行，判斷arr[4]的值是否小於等於 0，不是 
12. 第五圈迴圈結束，跑回第 2 行，i++，i 變成 5，檢查是否 < 6，是，繼續執行
13. 執行第 3 行，判斷arr[5]的值是否小於等於 0，不是 
14. 第六圈迴圈結束，跑回第 2 行，i++，i 變成 6，檢查是否 < 6，否，執行完畢，跑到第 5 行
15. 執行第 5 行，設定變數 i 是 2，檢查 i 是否 < 參數 'arr' 的長度 6，是，繼續執行，開始進入第二輪的第一個迴圈
16. 執行第 6 行，判斷arr[2] 是否不等於 arr[1] + arr[0]，不是
17. 第一圈迴圈結束，跑回第 5 行，i++，i 變成 3，檢查是否 < 6，是，繼續執行
18. 執行第 6 行，判斷arr[3] 是否不等於 arr[2] + arr[1]，不是
19. 第二迴圈結束，跑回第 5 行，i++，i 變成 4，檢查是否 < 6，是，繼續執行
20. 執行第 6 行，判斷arr[4] 是否不等於 arr[3] + arr[2]，是
21. 執行第 6 行，return 'invalid' 
22. 執行完畢