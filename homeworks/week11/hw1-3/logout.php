<!-- 
  登出功能：
  1.刪除 4genie_tokens 中的 token
  2.將 cookie 的 token 設為空，
  3.轉址到首頁
 -->
<?php
  require_once('./conn.php');

  $token = $_COOKIE['token'];
  $sql = sprintf(
    "DELETE FROM 4genie_tokens WHERE token = '%s'",
    $token
  );

  $conn->query($sql);
  setcookie("token","", time()-3600);
  header('Location: ./index.php');
?>
