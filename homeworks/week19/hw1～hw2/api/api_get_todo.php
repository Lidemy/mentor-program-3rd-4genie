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
   1.如果網址列的 id 參數為空，傳回 json 格式的錯誤訊息
   2.否則設定變數 id 為 網址列 id 的參數
  **************************************/ 
  if(
    empty($_GET['id'])
  ){
    $json = array(
      "ok"=>false,
      "message"=>"Please input id in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = $_GET['id'];

  /**********************************************
   1.變數 sql 為透過變數 id，找到儲存至 
   table "4genie_todolist" 的 id、todo、is_done
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  ***********************************************/ 
  $sql = "SELECT id, todo, is_done FROM 4genie_todolist where id = ? AND is_deleted is NULL";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);

  $result = $stmt->execute();
  
  /**************************************************
   1.設定變數 result 為連線資料庫並且執行上述 sql 語法。
     如果無法執行，傳回 json 格式的連線錯誤訊息
   2.否則傳回 json 格式的正確訊息，回傳 id、todo、is_done 資料
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

  $result = $stmt->get_result();
  $get_todos = array();
  while($row = $result->fetch_assoc()){
    array_push($get_todos,array(
      "id"=>$row['id'],
      "todo" =>$row['todo'],
      "isDone"=>$row['is_done']   
    ));
  }
  
  $json = array(
    "ok"=>true,
    "todo"=>$get_todos
  );
  
  
  $response = json_encode($json);
  echo $response;
?>