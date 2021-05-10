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
   1.如果留言為空，傳回 json 格式的錯誤訊息
   2.否則設定變數 todo, is_done
  **************************************/ 
    
  if(empty($_POST['todo'])){
    $json = array(
      "result"=>false,
      "message"=>"請輸入待辦事項"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];
  $is_done = intval($_POST['is_done']) ;
  /**************************************
   1.變數 sql 將新增的 todo，儲存至 
   table "4genie_todolist" 的中
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  **************************************/ 

  $sql = "INSERT INTO 4genie_todolist(todo,is_done) VALUES(?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si',$todo,$is_done);

  $result = $stmt->execute();
  
  /***********************************************************
   1.設定變數 result 為連線資料庫並且執行上述 sql 語法。
   如果無法執行，傳回 json 格式的連線錯誤訊息
   2.否則傳回 json 格式的正確訊息，並回傳新增 todo 在資料庫中的id，
  ************************************************************/ 
  if(!$result){
    echo json_encode(array(
      "result"=> false,
      "message"=>$conn->error
    ));
  }

  $json = array(
    "result"=> true,
    "message"=>"成功新增一筆待辦事項",
    // "id"=> $conn->insert_id // 回傳新增資料的在資料庫裡的 id
  );

  $response = json_encode($json);
  echo $response;
?>