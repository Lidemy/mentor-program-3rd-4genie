<!-- 處理登入功能的程式邏輯-->

<?php
  require_once('./db_conn.php');  
  require_once('./utilis.php');

  /*************************************************
  檢查登入頁面
  如果有 username、password 的 input 送出，且不為空，
  變數 username 為 輸入的 username 
  變數 password 為 輸入的 password
   *************************************************/
  if(
    isset($_POST['username']) &&
    isset($_POST['password']) &&
    !empty($_POST['username']) &&
    !empty($_POST['password'])
   ){

    $username = $_POST['username'];
    $password = $_POST['password'];

  /**************************************
   變數 sql 為從 table "msg_users" 中，撈出
   username 為 $username 、且 password 為 $password 的資料
  **************************************/

    $sql = "SELECT * FROM msg_users WHERE username = '$username' AND password = '$password'";


   /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則跳出連線錯誤訊息的視窗，
   並轉址到登入頁，斷開資料庫連線
   **************************************/ 

    $result = $conn->query($sql);

    if(!$result){
      printMessage($conn->error,'./login.php');
      exit();
    }
  
  /*******************************************
   如果連線資料庫後並執行 sql，撈的資料筆數大於 0，
   表示使用者輸入的帳號與密碼與資料庫的匹配，
   因此設定 cookie，請瀏覽器在收到伺服器傳回的資料時
   保存此筆 username 24 小時，並且轉址到首頁

   否則跳出"帳號或密碼錯誤！"視窗，轉址到登入頁
  *********************************************/
    if($result->num_rows>0){
      setcookie('username',$username, time()+3600*24);
      header('Location: ./index.php');
    }else{
      printMessage('帳號或密碼錯誤！','./login.php');
    }
  }else{
    printMessage($conn->error,'./login.php');
  }
  
?>