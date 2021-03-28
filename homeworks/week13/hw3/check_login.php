<?php
/*************************************
  檢查瀏覽器的 session，如果 session 中存有 username 的資料，且資料不為空，
  將變數 username 設為 session 中的所存的 username 的資料，
  否則 變數 username 為 null
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