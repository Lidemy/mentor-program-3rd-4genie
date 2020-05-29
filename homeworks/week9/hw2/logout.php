<!-- 
  登出功能：
  將 cookie 的 username 設為空，然後轉址到首頁
 -->
<?php
  setcookie('username','',time()+3600*24);
  header('Location: ./index.php');
?>