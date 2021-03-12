<?php
/*************************************
  檢查 cookie 的資料，如果 cookie 存有 token 且 token 不為空，
  將變數 member 設為 cookie 存的 token，
  否則 變數 member 為 null
  *************************************/
  if(
    isset($_SESSION['username']) &&
    !empty($_SESSION['username'])
  ){
    $username = $_SESSION['username'];

  }else{
    $username = null;
  }

?>