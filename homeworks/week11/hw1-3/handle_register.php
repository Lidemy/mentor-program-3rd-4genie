<!-- 處理註冊功能的程式邏輯-->
<?php
  require_once('./conn.php');   
  require_once('./utilis.php'); 

  /*************************************************
  檢查註冊頁面
  如果有 nickname、 username、password 的 input 送出，且不為空，則
  變數 nickname 為 輸入的 nickname 
  變數 username 為 輸入的 username 
  變數 password 為 輸入的 password 經過雜湊後的密碼 
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
   }

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);

  /**************************************
   變數 sql 為將註冊的 nickname、username、password
   儲存到 table "4genie_users" 中，
  **************************************/
    $sql = sprintf(
        "INSERT INTO 4genie_users(nickname,username,password) VALUES ('%s','%s','%s')",
        $nickname,
        $username,
        $password
      );

    // echo "SQL: ".$sql. "<br>";
    // exit();
  /**************************************
   如果連線資料庫後成功執行 sql，建立 token 並轉址到首頁,
   否則跳出"送出錯誤"訊息視窗，轉址到註冊頁
  **************************************/ 
    $result = $conn->query($sql);
    
    if(!$result){
      $code = $conn->errno;
      if($code === 1062){
        printMessage('帳號已被註冊','./register.php');
      }
      die($conn->error);
    }

    $token = generateToken();
    $sql = sprintf(
      "INSERT INTO 4genie_tokens(token,username) VALUES ('%s','%s')",
      $token,
      $username
    );

    $conn->query($sql);

    // 產生 cookie
    $expire = time()+ 3600;
    setcookie("token",$token,$expire);
    header('Location: ./index.php');
  
?>