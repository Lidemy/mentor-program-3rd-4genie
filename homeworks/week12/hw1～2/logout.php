<!-- 
  登出功能：
  1.刪除 4genie_certificates 中的 token
  2.將 cookie 的 token 設為空，
  3.轉址到首頁
 -->
<?php
  require_once('./conn.php');

  $token = $_COOKIE['token'];
  $sql = "DELETE FROM 4genie_certificates WHERE token = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',$token);
  $result = $stmt->execute();

  setcookie("token","", time()-3600);
  header('Location: ./index.php');
?>
