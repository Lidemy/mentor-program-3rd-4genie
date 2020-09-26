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
   2. 在 4genie_tokens 的 table 中由 token 拿到 username
   3. 在 4genie_users 的 table 中由 username 可以 return user 的資料(username、nickname、password)
   *********************/ 
  function getNicknameFromToken($token){
    global $conn;
    $sql = sprintf(
      "SELECT * FROM 4genie_tokens WHERE token = '%s'",
      $token
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $username = $row['username'];

    $sql = sprintf(
      "SELECT * FROM 4genie_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }
?>