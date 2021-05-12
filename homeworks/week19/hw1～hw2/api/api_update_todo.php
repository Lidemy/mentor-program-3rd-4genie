<?php
  /*************************************
  1. 連接資料庫
  2. 設定 header 的 content type 為 json，編碼 utf-8
  3. Server 的 response header 
     加上 Access-Control-Allow-Origin 允許跨來源資源共享 （CORS）
  **************************************/
  require_once('./conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  /**************************************
   1.如果id 或 todo 為空，傳回 json 格式的錯誤訊息
   2.否則設定變數 id 、todo
  **************************************/ 
    
  if(
    empty($_POST['id']) ||
    empty($_POST['todo'])
  ){
    $json = array(
      "result"=>false,
      "message"=>"請輸入要改的內容"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // intval => 轉成數字
  $id = intval($_POST['id']);
  $todo = $_POST['todo'];
  /**********************************************
   1.變數 sql 為透過變數 id，找到儲存至 
   table "4genie_todolist" 的 id，將 id 的這筆資料設為
   is_deleted 為 1,（軟刪除,並非真的刪掉）
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  ***********************************************/ 
  $sql = "UPDATE 4genie_todolist SET todo = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si',$todo,$id);

  $result = $stmt->execute();
  
  /**************************************************
   1.設定變數 result 為連線資料庫並且執行上述 sql 語法。
     如果無法執行，傳回 json 格式的連線錯誤訊息
   2.否則傳回 json 格式的正確訊息，回傳 id、todo 資料
  ***************************************************/ 
  if(!$result){
    $json = array(
      "ok"=>false,
      "message"=>$conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

   $json = array(
    "ok"=>true,
    "message"=>"更新待辦事項",
  );
  
  $response = json_encode($json);
  echo $response;
?>