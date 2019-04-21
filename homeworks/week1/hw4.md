## 跟你朋友介紹 Git

**我**：菜哥，你之前的笑話檔案有版本一、版本二甚至到版本十，這樣的方式好像是做了備份，卻有幾個不清楚的地方，例如：光看資料夾的名稱無法每個版本之間差異在哪裡、修改的內容是什麼、也無法知道備份的原因，如果以後笑話越來越多，超過 100 個以上的檔案，情況想必會更加的混亂。

**我**：為了更有效率，我們可以使用目前最熱門的「版本控制系統」 Git 來管理你的笑話檔案。

**菜哥**：好喔！ Git 要怎麼用呢？

**我**：好問題，首先我們先來安裝 Git

* Mac 電腦：直接到 Git 官方網站上下載並手動安裝：[https://git-scm.com/download/mac](https://git-scm.com/download/mac)

* Windows 電腦：直接到 Git 官方網站上下載並手動安裝：[https://git-scm.com/download/win](https://git-scm.com/download/win)

**菜哥**：Git 已經下載並安裝好了，接下來呢？

**我**：很好，接下來我們要為你的笑話建立一個檔名為 jokes 的資料夾來管理，菜哥你先將所有的笑話文字檔都移入 jokes 資料夾中。

**菜哥**：搞定！

**我**：好，再來我們要為這個資料夾註冊 Git 版本控制。
打開終端機（Windows：cmd.exe,或下載Cmder/ Mac: terminal），在 jokes 資料夾下，輸入指令：

```git init``` 

    git init 會將這個jokes資料夾註冊到版本控制，也就是建立一個 Git 儲存庫 (repository)

**菜哥**：git init 後資料夾就開始可以進行版本控制是吧，ok ok～

**我**：當修改笑話並存檔後，接著輸入指令：

```git add <file name>```

若使用```git add .```則可以一口氣登記選出路徑內的所有檔案。

    git add是把檔案先登記起來，若沒有問題，接下來再提交記錄成正式的版本節點。

**菜哥**：等一下，我先做個筆記，先 git init ，接著 git add . 

**我**：是的，當 git add 登記之後，若確認登記的內容無誤，這時候我們就可以提交囉，輸入指令：

```git commit -m "提交訊息說明"```

    git commit message，提交修改完成的版本到本地的 Git 儲存庫 (repository)

```-m``` 是 ```--message``` 的縮寫，可以為這筆 commit 附上說明。

**菜哥**：git commit 提交後就完成了嗎？

**我**：如果只是在本地電腦上使用，這樣就行了。只要有修改，就重複```git add```、```git commit```的步驟，可是菜哥如果你要公開分享笑話集，我們就需要將 jokes 資料夾放在雲端上，現在，我們就要進一步將你電腦上的 Git repository 與雲端連結，帶給更多人歡樂。

**我**：首先我們要註冊 [GitHub](https://github.com) 帳號

**我**：登入平台，點選 **new repository** ，輸入 **repository** 的名稱以及描述（optional），按下 **Create repository**。

**我**： 找到下列這一行  
``...or push an existing repository from the command line``

複製

    git remote add origin [your github repo]
    git push -u origin master

終端機輸入上述複製的兩行指令，把檔案“推”上 Github 雲端，並按下Enter

此時回到 GitHub 的專案頁面，你會看見 jokes 資料夾已經出現在遠端了，任何人只要進入這個頁面，都可以看見菜哥你的笑話集囉！

**菜哥**：太好了，這樣我的笑話就可以流傳到全世界，無遠弗屆了！ 最後再問一個問題，那如果我臨時想到新的梗，想將雲端上的笑話下載到電腦上修改，要怎麼做了？

**我**：菜哥，這是個很好的問題，如果上傳 Github 雲端後想要下載下來修改的話，可以用 ```pull``` 這個指令：

```git pull origin master```

把 Github 上的 存放笑話集的 jokes repository 拉到電腦上就可以了：）

**菜哥**： 原來如此， Git 的功能實在太強大了，這樣我就可以專心的想好笑的笑話囉！ 那天得到電視笑話冠軍，得獎感言上一定會提到你的。

**我**： 好喔，很期待！ 