## 交作業流程
***
    **使用Git Flow 流程概念：**

    1. 就是要改東西前，為了保險起見，通常會先 copy 原檔(檔案A)
    2. 然後在 copy 的檔案上面做修改(檔案B)，這樣如果發生錯誤，至少還有檔案 A 的初始內容留底
    3. 等檔案 B 新增或修改完並確認無誤後，內容再與檔案A結合，成為最新的內容

----
### 第一次交作業前的準備工作：）
**目標：**

 * 建立 Github Classroom、
 * 將作業原始檔下載到本機端、
 * 安裝 Node 軟體套件管理系統

**流程：**

1.登入 Github 賬號 (以自己的 Github 賬號 4genie 為例)

2.點擊提供課程所提供的 [Github Classroom](https://classroom.github.com/a/V4hZopA2) 鏈接 

3.選擇 Accept 接受，系統會要求輸入 Github 密碼

4.建立並進入有作業內容的 repository

* [https://github.com/Lidemy/mentor-program-3rd-4genie](https://github.com/Lidemy/mentor-program-3rd-4genie)

5.點擊右邊的綠色 **Clone or downloa button **並複製 URL: 

* https://github.com/Lidemy/mentor-program-3rd-4genie.git

6.回到電腦上，開啟 command line 工具(Windows： Cmder/ Mac： terminal)

7.進入要下載作業的路徑位置，然後輸入下載指令：
```git clone https://github.com/Lidemy/mentor-program-3rd-4genie.git```

8.用切換到作業所在的根資料夾：
```cd Genie\Lidemy\homework\mentor-program-3rd-4genie```

9.安裝 Node Package Manager(npm)：
```npm install```

10.交作業的前置準備工作完成了，好棒棒！

----

### 交作業流程
**目標：**

 * 在分支上寫作業
 * 上傳到 Github
 * 分支 merge 到 master 中
 * 作業批改完成後，將最新的作業內容下載下來


**流程：**

1.在作業資料夾的中開一個分支（ex 分支名： week1）

* 進入作業資料夾
``cd Genie\Lidemy\homework\mentor-program-3rd-4genie```

* 建立分支
``` git branch week1```
* 進入分支
``` git checkout week1```


3.到當週的作業資料夾中，找到要寫的作業檔，開始寫吧！


4.作業寫完後記得先存檔！然後執行``` git add .```將目前的所有進度放在 Git 版本控制的 staged

5.確定無誤後就```git commit```囉！

6.推推推，用```git push origin week1```，將分支的內容推到 Github 上

7.在 Github 上點擊 **Compare & pull request** 請求將分支合併到 master 上 (base: master/ compare: week1)

8.填寫 **title** 以及 **description** (optional)

9.點擊 ** create pull request**

10.進入第三期實驗計劃交作業專用的repo [https://github.com/Lidemy/homeworks-3rd](https://github.com/Lidemy/homeworks-3rd)

11.到 [Issues](https://github.com/Lidemy/homeworks-3rd/issues) 新增 Issue，標題格式為：[WeekX]，X 請填入要交作業的週數。改完作業之後Huli會把 Issue close 掉。

12.等待作業批改，如果需要修正會在 Github 上通知。

13.做的超好的！現在伸伸懶腰，出去散個步吧！