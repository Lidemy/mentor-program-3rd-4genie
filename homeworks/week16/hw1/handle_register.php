<!-- 處理註冊功能的程式邏輯-->
<?php
  /************************
  啟動 PHP Session 機制
  *************************/
  session_start();
  require_once('./conn.php');   
  require_once('./utilis.php'); 

  /*************************************************
  檢查註冊頁面
  如果有 nickname、 username、password 的 input 送出，且不為空，則
  變數 nickname 為 輸入的 nickname 
  變數 username 為 輸入的 username 
  變數 password 為 輸入的 password 經過雜湊後的密碼
  否則，跳出錯誤訊息 
    *************************************************/

  if(
      !isset($_POST['nickname']) ||
      !isset($_POST['username']) ||
      !isset($_POST['password']) ||
      empty($_POST['nickname']) ||
      empty($_POST['username']) ||
      empty($_POST['password'])
   ){
     printMessage('資料不齊全','./register.php');
     exit();
   }

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    
    // 將密碼雜湊（hash）
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);

  /**************************************
   1.變數 sql 為將註冊的 nickname、username、password
   儲存到 table "4genie_users" 中
   2.存入雜湊後的密碼，避免資料庫被駭客看光時拿到密碼，提升資料的安全性
   3.將 sql query 換成 prepared statement，
   避免 SQL Injection 
  **************************************/
    $sql = "INSERT INTO 4genie_users(nickname,username,password) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$nickname,$username,$password);
    $result =$stmt->execute();

    // echo "SQL: ".$sql. "<br>";
    // exit();
  /***************************************************
   1. 如果連線資料庫後成功執行 sql，將變數 username 設定為
      瀏覽器的 session 中的 username 資料並轉址到首頁
   2. 否則跳出"送出錯誤"訊息視窗，轉址到註冊頁
  ****************************************************/
    
    if(!$result){
      $code = $conn->errno;
      if($code === 1062){
        printMessage('帳號已被註冊','./register.php');
        exit();
      }
      die($conn->error);
    }
  //   $token = generateToken();
  //   $sql = "INSERT INTO 4genie_certificates(token,username) VALUES (?,?)";
  //   $stmt =$conn->prepare($sql);
  //   $stmt->bind_param('ss',$token,$username);
  //   $result = $stmt->execute();
  //   if(!$result){
  //   die($conn->error);
  // }
  //   // 產生 cookie
  //   $expire = time()+ 3600;
  //   setcookie("token",$token,$expire);
    $_SESSION['username'] = $username;
    header('Location: ./index.php');
  
?>