<!-- 處理登入功能的程式邏輯-->

<?php
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
    }


    $username = $_POST['username'];
    $password = $_POST['password'];

  /**************************************
   變數 sql 為從 table "4genie_users" 中，撈出
   username 為 $username 的資料
  **************************************/

    $sql = "SELECT * FROM 4genie_users WHERE username = '$username'";


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
   表示使用者輸入的帳號與資料庫的匹配，
   然後，檢查使用者輸入的密碼經過雜湊後，是否為此帳號的雜湊密碼。
   如果密碼正確，用 generateToken 這個 function 產生一組
   16 碼的 token 亂碼，在 4genie_certificates 的 table 中
   記錄 token 與 username 的關係，接著在瀏覽器儲存 token 的訊息在Cookie，
   保存此筆 token 24 小時，並且轉址到首頁。
   請瀏覽器下次發 Request 時，帶上這個 token，
   伺服器檢查是否有這個 token，有的話就代表確實時那個人
  *********************************************/
    $row = $result->fetch_assoc();
    if($result->num_rows === 0){
      printMessage('帳號或密碼錯誤！','./login.php');
    }

    if(password_verify($password,$row['password'])){
      // 如果登入成功，建立 token
      $token = generateToken();
      $sql = sprintf(
        "INSERT INTO 4genie_certificates(token,username) VALUES ('%s','%s')",
        $token,
        $username
      );

      $conn->query($sql);

      // 產生 cookie
      $expire = time()+ 3600;
      setcookie("token",$token,$expire);
      header('Location: ./index.php');
    }else{
      printMessage('帳號或密碼錯誤！','./login.php');
    }
  
?>