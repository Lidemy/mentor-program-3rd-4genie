<!-- 處理登入功能的程式邏輯-->
  
<?php
  /*************************************
  1. 啟動 PHP Session 機制
  **************************************/
  session_start();
  require_once('./conn.php');  
  require_once('./utilis.php');

  /*************************************************
  檢查登入頁面
  如果有 username、password 的 input 送出，且不為空，
  變數 username 為 輸入的 username 
  變數 password 為 輸入的 password
   *************************************************/
  if(
      !isset($_POST['username'])||
      !isset($_POST['password']) ||
      empty($_POST['username']) ||
      empty($_POST['password'])
   ){
      printMessage('資料不齊全','./login.php');
      exit();
    }


    $username = $_POST['username'];
    $password = $_POST['password'];

  /**************************************
   1.變數 sql 為從 table "4genie_users" 中，撈出
   username 為 $username 的資料
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  **************************************/

    $sql = "SELECT * FROM 4genie_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();

   /**************************************
   設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，則跳出連線錯誤訊息的視窗，
   並轉址到登入頁，斷開資料庫連線
   **************************************/ 

    if(!$result){
      printMessage($conn->error,'./login.php');
      exit();
    }
  
  /******************************************************************
   如果連線資料庫後並執行 sql，撈的資料筆數大於 0，
   表示使用者輸入的帳號與資料庫的匹配，
   然後，檢查使用者輸入的密碼經過雜湊後，是否為此帳號的雜湊密碼。
   如果密碼匹配無誤，將變數 username 設定為瀏覽器的 session 中的 username
   並且轉址至首頁
   若密碼不匹配，則跳出錯誤訊息
  *******************************************************************/
  $result = $stmt->get_result();
  if($result->num_rows === 0){
    printMessage('帳號或密碼錯誤！','./login.php');
    exit();
  } 
  $row = $result->fetch_assoc();
  if(password_verify($password,$row['password'])){
    // 1.如果登入成功，建立 token
    // 2.將 sql query 換成 prepared statement，避免 SQL Injection
    // $token = generateToken();
    // $sql = "INSERT INTO 4genie_certificates(token,username) VALUES (?,?)";
    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param('ss',$token,$username);
    // $result = $stmt->execute();
    // if(!$result){
    //   die($conn->error);
    // }

    // // 產生 cookie
    // $expire = time()+ 3600;
    // setcookie("token",$token,$expire);
    $_SESSION['username']= $username;
    header('Location: ./index.php');
  }else{
    printMessage('帳號或密碼錯誤！','./login.php');
  }
  
?>