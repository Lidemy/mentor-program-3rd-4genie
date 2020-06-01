<!-- 處理註冊功能的程式邏輯-->
<?php
  require_once('./conn.php');   
  require_once('./utilis.php'); 

  /*************************************************
  檢查註冊頁面
  如果有 nickname、 username、password 的 input 送出，且不為空，則
  變數 nickname 為 輸入的 nickname 
  變數 username 為 輸入的 username 
  變數 password 為 輸入的 password
    *************************************************/

  if(
    isset($_POST['nickname']) &&
    isset($_POST['username']) &&
    isset($_POST['password']) &&
    !empty($_POST['nickname']) &&
    !empty($_POST['username']) &&
    !empty($_POST['password'])
   ){

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = $_POST['password'];


  /**************************************
   變數 sql 為這註冊的 nickname、username、password
   儲存到 table "4genie_users" 中，
  **************************************/
    $sql = "INSERT INTO 4genie_users(nickname,username,password) VALUES ('$nickname','$username','$password')";

  /**************************************
   如果連線資料庫後成功執行 sql，轉址到首頁
    否則跳出"送出錯誤"訊息視窗，轉址到註冊頁
  **************************************/ 

    if($conn ->query($sql)){
      setcookie('username',$username, time()+3600*24);
      header('Location: ./index.php');
    }else{
      printMessage('送出錯誤！','./register.php');
      
    }
  }else{
    printMessage('請輸入註冊資料','./register.php');
  }
  
?>