<!-- 
  登出功能：
  1.啟動 PHP Session 機制 
  2.清除 browser 的session
  3.轉址到首頁
 -->
<?php
  session_start();
  session_destroy();
  header('Location: ./index.php');
?>
