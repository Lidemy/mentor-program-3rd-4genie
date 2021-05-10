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
   1.如果 id 或 is_done 為空，傳回 json 格式的錯誤訊息
   2.否則設定變數 id 、todo 
  **************************************/ 
    
  if(
    empty($_POST['is_done']) ||
    empty($_POST['id'])
  ){
    $json = array(
      "result"=>false,
      "message"=>"id or isDone are missing"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // intval => 轉成數字
  $id = intval($_POST['id']);
  
  /*************************************************
  1.因為 mysql 中 boolean 的 true 與 false 為數字 0、1 
  2.由於 $_POST['is_done']) 的類型為字串，
    先將其轉為 boolean 之後，
    再轉成數字類型，儲存在 mysql 中
  **************************************************/ 
  $is_done = intval(($_POST['is_done']) === 'true');
  // $is_done = intval(($_POST['is_done']));

  
  /**********************************************
   1.變數 sql 為透過變數 id，找到儲存至 
   table "4genie_todolist " 的 id，將 id 的這筆資料設為
   is_done 為 1 或 0 
   2.將 sql query 換成 prepared statement，
   避免 SQL Injection
  ***********************************************/ 
  $sql = "UPDATE 4genie_todolist SET is_done = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii',$is_done,$id);

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
    "message"=>"更新是否完成的狀態",
  );
  
  $response = json_encode($json);
  echo $response;
?>