<!-- 處理編輯留言功能的程式邏輯-->

<?php
  require_once('./conn.php');  
  require_once('./check_login.php');
  require_once('./utilis.php');

  /*************************************************
  檢查編輯留言的頁面
  如果有 content 的 input 送出，且不為空，
  變數 content 為 輸入的 content 
  變數 id 為 輸入留言的 id
   *************************************************/
  if(
      empty($_POST['content'])
   ){
      printMessage('資料不齊全','./update_comment.php?id='.$_POST['id']);
    }


    $id = $_POST['id'];
    $content = $_POST['content'];

  /**************************************
   變數 sql 為將table "4genie_comments" 中，
   id 為 $id 的 content 資料更新成 $content
  **************************************/

    $sql = sprintf(
      "UPDATE 4genie_comments SET content = '%s' WHERE id = '%s'",
      $content,
      $id
    );


   /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則跳出連線錯誤訊息的視窗，
   並轉址到登入頁，斷開資料庫連線
   **************************************/ 

    $result = $conn->query($sql);

    if(!$result){
      printMessage($conn->error,'./update_comment.php');
      exit();
    }
  
  
    header('Location: ./index.php');
  
?>