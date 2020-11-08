<?php
  require_once('./conn.php');
  require_once('./utilis.php');
  require_once('./check_login.php');
  
  /*************************************
  檢查 query string。
  如果 query string 中帶有 id， 
  變數 id 為 $_GET['id']，
  變數 id 為 輸入留言的 id
   *************************************/

  $id = $_GET['id'];
  $username = NULL;
  if(!empty($_COOKIE['token'])){
    $token = $_COOKIE['token'];
    $user = getNicknameFromToken($_COOKIE['token']);
    $username = $user['username'];
  }


  /**************************************
   1.變數 sql 為選取 table "4genie_comments" 中，
   id 為 $id 的資料
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  **************************************/

  $sql ="SELECT * FROM 4genie_comments WHERE id = ? AND username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is',$id,$username);
  $result = $stmt->execute();

  /*********************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則顯示連線錯誤訊息，斷開資料庫連線
   *********************************************/

  if(!$result){
    die('Error'.$conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>編輯留言</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css" >
  <link rel="stylesheet" href="./style.css">
  
</head>
<body>
  <?php require_once('layout/nav.php');?>
  <main class="container">
    <p class="alert">警！！！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    
    <section class="comments comment__post">
      <form action="./handle_update_comment.php" method="POST" class="comment__form">
         <h2 class="title">編輯留言</h2>
         <div>
            <textarea name="content" cols="40" rows="5" id="spoiler"><?= escape($row['content']); ?></textarea>
            <input type="hidden" name="id" value="<?= escape($row['id']);?>">
            <input type="submit" value="送出留言！">
         </div>
      </form>
    </section>
  </main>
</body>
</html>