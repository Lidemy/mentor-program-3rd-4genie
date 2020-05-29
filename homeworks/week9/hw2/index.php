<?php
  require_once('./db_conn.php');
  require_once('./check_login.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 Home</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css" >
  <link rel="stylesheet" href="./style.css">
  
</head>
<body>
  <?php include_once('layout/nav.php');?>
  <main class="container">
    <p class="alert">警！！！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    
    <section class="comments comment__post">
      <form action="./handle_comment.php" method="POST" class="comment__form">
         <h2 class="title">爆雷有理，劇透無罪</h2>
         <div>
            <textarea name="add_comment" cols="40" rows="5" placeholder="我要爆料" id="spoiler"></textarea>
         </div>
         <?php
          if($member){?>
            <input type="submit" value="是的，我要爆雷！">
          <?php }else{ ?>
            <div><h3>註冊或登入會員後才能留言喔～</h3></div>
          <?php
          }
         ?>
      </form>
    </section>

    <section class="comments">
      <?php
        $sql = "SELECT c.content, c.created_at, u.nickname FROM msg_comments as c LEFT JOIN msg_users as u ON c.username = u.username ORDER BY c.id DESC LIMIT 50";

        $result = $conn->query($sql);
        if($result->num_rows>0){
          while($row = $result->fetch_assoc()){?>
            <div class="comment">
              <div class="comment__nickname">爆雷王:  <?= $row['nickname'] ?></div>
              <div class="comment__content">我要爆料:  <?= $row['content']?></div>
              <div class="comment__time">留言時間： <?= $row['created_at']?></div>
            </div>
            
      <?php
          }
        }
      ?>
      
    </section>
  </main>
  
  
</body>
</html>