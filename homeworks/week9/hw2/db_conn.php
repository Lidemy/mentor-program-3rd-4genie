<!-- 
  設定 php 與資料庫的連線
  設定語系為 UTF8
 -->

<?php
  $servername = 'localhost';
  $username = 'root';
  $password = 'root';
  $dbname ='mtr03group2';

  $conn = new mysqli($servername,$username,$password,$dbname);
  
  if($conn->connect_error){
    die('Connection failed: ' .$conn->connect_error);
  }
  $conn->query('SET NAMES UTF8');

  
?>