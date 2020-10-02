<?php
  require_once('./conn.php');
  require_once('./utilis.php');
  require_once('./check_login.php');

  
  
  /*************************************
  檢查 query string。
  如果 query string 中帶有 id， 
  變數 idid 為 $_GET['id']，
  變數 id 為 輸入留言的 id
   *************************************/

  $id = $_GET['id'];

  /**************************************
   變數 sql 為選取 table "4genie_comments" 中，
   id 為 $id 的資料
  **************************************/

  $sql = sprintf(
    "SELECT * FROM 4genie_comments WHERE id = '%s' ",
    $id
  );

  /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則顯示連線錯誤訊息，斷開資料庫連線
   **************************************/ 

  $result = $conn->query($sql);

  if(!$result){
    die('Error'.$conn->error);
  }
  
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
            <textarea name="content" cols="40" rows="5" id="spoiler"><?php echo $row['content']; ?></textarea>
            <input type="hidden" name="id" value="<?php echo $row['id'];?>">
            <input type="submit" value="送出留言！">
         </div>
      </form>
    </section>
  </main>
</body>
</html>