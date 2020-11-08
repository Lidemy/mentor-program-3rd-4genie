<?php
  /*********************
  因為會重複用到，所以寫成 function
  主要是兩部分，
  1. 跳出訊息
  2. 轉址

  * htmlentities 函數可以把字符轉換為 HTML 實體。
  *********************/ 
  require_once('conn.php');

  function printMessage($msg,$redirect){
    echo '<script>';
    echo "alert('".htmlentities($msg,ENT_QUOTES)."');";
    echo "window.location = '".$redirect."'";
    echo '</script>';
  }

  /*********************
   產生 16 碼的英文大寫亂數
  *********************/ 
  function generateToken(){
    $s = '';
    for($i = 1; $i < 16; $i++){
      $s .= chr(rand(65,90));
    }
    return $s;
  }


  /*********************
   從 token 拿 nickname:
   1. 記得先將 $conn 變成全域變數
   2. 在 4genie_certificates 的 table 中由 token 拿到 username
   3. 在 4genie_users 的 table 中由 username 可以 return user 的資料(username、nickname、password)
   4. 將 sql query 換成 prepared statement，
   避免 SQL Injection
   *********************/ 
  function getNicknameFromToken($token){
    global $conn;
    $sql = "SELECT * FROM 4genie_certificates WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$token);
    $result = $stmt->execute();
    if(!$result){
      die('Error: ' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $username = $row['username'];

    $sql = "SELECT * FROM 4genie_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username);
    $result = $stmt->execute();
    if(!$result){
      die('Error: ' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  /***************************
  為了修補 XSS 攻擊，將呈現的資料內容用 escape 跳脫
   ***************************/
  function escape($str){
    return htmlspecialchars($str,ENT_QUOTES);
  }
?>