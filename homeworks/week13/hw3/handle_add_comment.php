<?php
  /*************************************
  1. 啟動 PHP Session 機制
  2. 設定 header 的 content type 為 json，編碼 utf-8
  3. Server 的 response header 
     加上 Access-Control-Allow-Origin 允許跨來源資源共享 （CORS）
  **************************************/
  session_start();
  require_once('./conn.php');
  require_once('./utilis.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  /**************************************
   1.如果留言為空，傳回 json 格式的錯誤訊息
   2.否則設定變數 content、parent_id，
     並從瀏覽器的 session 取得 username
  **************************************/ 
    
  if(empty($_POST['content'])){
    $json = array(
      "result"=>false,
      "message"=>"Please input content"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $content = $_POST['content'];
  $parent_id = $_POST['parent_id'];
  $username = $_SESSION['username'];

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
  
  /**************************************************
   1.設定變數 result 為連線資料庫並且執行上述 sql 語法。
     如果無法執行，傳回 json 格式的連線錯誤訊息
   2.否則傳回 json 格式的正確訊息
  ***************************************************/ 
  if(!$result){
    echo json_encode(array(
      "result"=> false,
      "message"=>$conn->error
    ));
  }

  $json = array(
    "result"=>true,
    "message"=>"You add a new comment"
  );

  $response = json_encode($json);
  echo $response;
?>