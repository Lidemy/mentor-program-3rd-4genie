<?php
  require_once('./conn.php');
  require_once('./check_login.php');
  require_once('./utilis.php');


  $member = NULL;
  $username = NULL;

  if(!empty($_COOKIE['token'])){
    $user = getNicknameFromToken($_COOKIE['token']);
    $member = $user['nickname'];
    $username = $user['username'];
  }

  $page = 1;
  if(!empty($_GET['page'])){
    $page = $_GET['page'];
  }
  $item_per_page = 3;
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT c.id as id, c.content as content, c.created_at as created_at, u.nickname as nickname, u.username as username FROM 4genie_comments as c LEFT JOIN 4genie_users as u ON c.username = u.username WHERE c.is_deleted is NULL ORDER BY c.id DESC LIMIT $item_per_page OFFSET $offset";

  $result = $conn->query($sql);
  if(!$result){
    die("Error: ".$conn->error);
  }
  
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
  <?php require_once('layout/nav.php');?>
  <main class="container">
    <p class="alert">警！！！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    
    <section class="comments comment__post">
      <form action="./handle_comment.php" method="POST" class="comment__form">
         <h2 class="title">爆雷有理，劇透無罪</h2>
         <div>
            <textarea name="add_comment" cols="40" rows="5" placeholder="我要爆料" id="spoiler"></textarea>
         </div>
         <?php
          if(isset($member) && !empty($member)){?>
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
        if($result->num_rows>0){
          while($row = $result->fetch_assoc()){?>
            <div class="comment">
              <span class="comment__nickname">爆雷王:  <?= $row['nickname'] ?> (@<?= $row['username'] ?>)
                <span class="update_comment">
                  <?php if($row['username'] === $username){ ?> 
                    <a  href="update_comment.php?id=<?= $row['id']; ?>>">編輯</a>
                    <a  href="handle_delete_comment.php?id=<?= $row['id']; ?>"> 刪除</a>
                  <?php }?>
                </span>
              </span>
                <div class="comment__content">我要爆料:  <?= $row['content']?></div>
                <div class="comment__time">留言時間： <?= $row['created_at']?></div>
            </div>
      <?php
          }
        }
      ?>
      
    </section>
    <section class="pagination">
      <?php
        $sql = "SELECT count(id) as count FROM 4genie_comments WHERE is_deleted is NULL";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $item_per_page);

      ?>
      <div class="page-info">
        <span>總共 <?php echo $count ?> 筆留言，</span>
        <span><?php echo $page ?> / <?php echo $total_page ?> 頁</span>
      </div>
      <div class="paginator">
        <?php if($page != 1){ ?>
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page -1; ?>">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page){ ?>
          <a href="index.php?page=<?php echo $page + 1; ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page; ?>">尾頁</a>
        <?php } ?> 
      </div>
    </section>
  </main>
</body>
</html>