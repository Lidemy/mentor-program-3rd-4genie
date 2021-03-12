<?php
  session_start();
  require_once('./conn.php');  
  require_once('./utilis.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  /*************************************************
  檢查 query string，
  如果 query string 中有 id 傳入
  變數 id 為 輸入的 $_GET['id'] 
   *************************************************/
  if(
      empty($_POST['id']) 
   ){
      // printMessage('資料不齊全','./update_comment.php');
      // exit();
      echo json_encode(array(
      "result"=> 'failure',
      "message"=> "Do not have id"
    ));
    }


    $id = $_POST['id'];
    $username = $_SESSION['username'];
  /**************************************
   1.變數 sql 為從 table "4genie_comments" 中，
   將 id 的這筆資料設為 is_deleted 為 1,
   （軟刪除,並非真的刪掉）
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
   3. 只有留言本人才有權限刪除留言
  **************************************/

    $sql = "UPDATE 4genie_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is',$id,$username);
    $result = $stmt->execute();

   /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則跳出連線錯誤訊息的視窗
   並導回上一頁，斷開資料庫連線
   **************************************/ 
    if(!$result){
      echo json_encode(array(
        "result"=> 'failure',
        "message"=> "delete failed"
      ));
    }

    echo json_encode(array(
      "result"=> 'succsss',
      "message"=> "successfully deleted"
    ));
?>