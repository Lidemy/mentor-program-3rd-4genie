資料庫名稱： mtr03group2

- table 名稱： msg_users

| 欄位名稱   | 欄位型態    | 說明         |
| ---------- | ----------- | ------------ |
| id         | int         | 會員 id      |
| nickname   | text        | 會員暱稱     |
| username   | varchar(20) | 會員帳號     |
| passoword  | varchar(20) | 會員密碼     |
| created_at | datetime    | 會員建立時間 |

- table 名稱： msg_comments

| 欄位名稱   | 欄位型態    | 說明         |
| ---------- | ----------- | ------------ |
| id         | int         | 留言 id      |
| username   | varchar(20) | 留言者名稱   |
| content    | text        | 留言內容     |
| created_at | datetime    | 留言建立時間 |
