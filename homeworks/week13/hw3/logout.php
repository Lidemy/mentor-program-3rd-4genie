<!-- 
  登出功能：
  1.刪除 4genie_certificates 中的 token
  2.將 cookie 的 token 設為空，
  3.轉址到首頁
 -->
<?php
  session_start();
  session_destroy();
  header('Location: ./index.php');
?>
