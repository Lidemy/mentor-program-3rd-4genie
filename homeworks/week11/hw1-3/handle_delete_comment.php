<!-- 處理刪除留言功能的程式邏輯-->

<?php
  require_once('./conn.php');  
  require_once('./utilis.php');

  /*************************************************
  檢查 query string，
  如果 query string 中有 id 傳入
  變數 id 為 輸入的 $_GET['id'] 
   *************************************************/
  if(
      empty($_GET['id']) 
   ){
      printMessage('資料不齊全','./update_comment.php');
    }


    $id = $_GET['id'];

  /**************************************
   變數 sql 為從 table "4genie_comments" 中，
   將 id 的這筆資料設為 is_deleted 為 1,
   （軟刪除,並非真的刪掉）
  **************************************/

    $sql = sprintf(
      "UPDATE 4genie_comments SET is_deleted = 1 WHERE id = '%s'",
      $id
    );


   /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則跳出連線錯誤訊息的視窗，
   並導回上一頁，斷開資料庫連線
   **************************************/ 

    $result = $conn->query($sql);

    if(!$result){
      printMessage($conn->error,.$_SERVER['HTTP_REFERER']);
      exit();
    }

    
    header('Location: ./index.php');
  
  
?>