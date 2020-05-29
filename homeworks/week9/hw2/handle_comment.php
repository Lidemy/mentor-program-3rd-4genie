<!-- 處理前端留言的程式邏輯-->

<?php
  require_once('./db_conn.php');
  require_once('./utilis.php');

  /**************************************
    如果有留言送出，且留言不為空，
    變數 username 為 cookie 所存的 username
    變數 content 為 留言內容
  **************************************/ 

  if(isset($_POST['add_comment']) && !empty($_POST['add_comment'])){
    $username = $_COOKIE['username'];
    $content = $_POST['add_comment'];
    
    
  /**************************************
   變數 sql 將這則留言的 username、content
   儲存至 table "msg_comments" 的中
  **************************************/ 

    $sql = "INSERT INTO msg_comments(username,content) VALUES ('$username','$content')";

  /**************************************
   如果連線資料庫後成功執行 sql，轉址到首頁
    否則跳出錯誤訊息視窗，轉址到註冊頁
  **************************************/ 
  
    if($conn->query($sql)){
      header('Location: ./index.php');
    }else{
      printMessage($conn->error,'./register.php'); 
    }
  }else{
    printMessage('請輸入內容','./index.php');
  }
?>