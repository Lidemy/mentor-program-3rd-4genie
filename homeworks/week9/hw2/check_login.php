<!-- 
  檢查 cookie 的資料，如果 cookie 存有 username 且 username 不為空，
  將 變數 member 設為 cookie 存的username，
  否則 變數 member 為 null
 -->

<?php
  if(
    isset($_COOKIE['username']) &&
    !empty($_COOKIE['username'])
  ){
    $member = $_COOKIE['username'];

  }else{
    $member = null;
  }

?>