<!-- 
  檢查 cookie 的資料，如果 cookie 存有 token 且 token 不為空，
  將變數 member 設為 cookie 存的 token，
  否則 變數 member 為 null
 -->

<?php
  if(
    isset($_COOKIE['token']) &&
    !empty($_COOKIE['token'])
  ){
    $member = $_COOKIE['token'];

  }else{
    $member = null;
  }

?>