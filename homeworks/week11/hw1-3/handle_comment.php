<!-- 處理前端留言的程式邏輯-->

<?php
  require_once('./conn.php');
  require_once('./utilis.php');

  /**************************************
    如果有留言送出，且留言不為空，
    變數 username 可透過 cookie 所存的 token，
    用 getNicknameFromToken 這個 function 得出  
    變數 content 為 留言內容
  **************************************/ 

  if(isset($_POST['add_comment']) && !empty($_POST['add_comment'])){
    $user = getNicknameFromToken($_COOKIE['token']);
    $username = $user['username'];
    $content = $_POST['add_comment'];
    
    
  /**************************************
   變數 sql 將這則留言的 username、content
   儲存至 table "4genie_comments" 的中
  **************************************/ 

    $sql = sprintf(
      "INSERT INTO 4genie_comments(username,content) VALUES('%s','%s')",
      $username,
      $content
    );

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