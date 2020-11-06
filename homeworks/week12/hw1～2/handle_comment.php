<!-- 處理前端留言的程式邏輯-->

<?php
  require_once('./conn.php');
  require_once('./utilis.php');

  /**************************************
   1.如果有留言送出，且留言不為空，
    變數 username 可透過 cookie 所存的 token，
    用 getNicknameFromToken 這個 function 得出  
   2.變數 content 為 留言內容
  **************************************/ 
  
  if(isset($_POST['add_comment']) && !empty($_POST['add_comment'])){
    $user = getNicknameFromToken($_COOKIE['token']);
    $username = $user['username'];
    $content = $_POST['add_comment'];
    $parent_id = $_POST['parent_id'];
  }else{
    printMessage('請輸入內容','./index.php');
    exit();
  } 
    
  /**************************************
   1.變數 sql 將這則留言的 username、content
   儲存至 table "4genie_comments" 的中
   2.如果連線資料庫後成功執行 sql，轉址到首頁
   否則跳出錯誤訊息視窗，轉址到註冊頁
   3.將 sql query 換成 prepared statement，
   避免 SQL Injection
  **************************************/ 

  $sql = "INSERT INTO 4genie_comments(username,content,parent_id) VALUES(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi',$username,$content,$parent_id);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  header("Location: index.php");
?>