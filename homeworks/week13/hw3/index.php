<?php
  session_start();
  require_once('./conn.php');
  require_once('./check_login.php');
  require_once('./utilis.php');


  $member = NULL;
  $username = NULL;

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $member = getUserFromUsername($_SESSION['username']);
  }

  $page = 1;
  if(!empty($_GET['page'])){
    $page = $_GET['page'];
  }
  $item_per_page = 3;
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT c.id as id, c.content as content, c.created_at as created_at, u.nickname as nickname, u.username as username FROM 4genie_comments as c LEFT JOIN 4genie_users as u ON c.username = u.username WHERE c.is_deleted is NULL AND c.parent_id = 0 ORDER BY c.id DESC LIMIT ? OFFSET ?";
  
  // 將 sql query 換成 prepared statement，避免 SQL Injection
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii',$item_per_page,$offset);
  $result = $stmt->execute();
  if(!$result){
    die("Error: ".$conn->error);
  }
  $result = $stmt->get_result();
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 Home</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css" >
  <link rel="stylesheet" href="./style.css">
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <script>
    function escape(toOutput) {
      return toOutput.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27')
        .replace(/\//g, '&#x2F');
    }

    $(document).ready(()=>{
      // 刪除留言
      $('.comments').on('click','.comment__delete-btn',function(e){
        if(!confirm('確認刪除嗎?')) return;
        const id = $(e.target).attr('data-id');

        $.ajax({
          method: "POST",
          url: "./handle_delete_comment.php",
          dataType: 'text',
          data: {
            id
          },
          success:(function(response){
            const msg = JSON.parse(response);
            alert(msg.message);
            const subComment = $(e.target).parents('.sub-comment')
            if(subComment.length === 0){
              $(e.target).parents('.comment').hide(500);
            }else{
              subComment.hide(500);
            }
          })
        })  
      })

      // 新增留言
      $('form').submit(e=>{
        e.preventDefault();
        const content = $(e.target).find('#spoiler').val();
        const parent_id = $(e.target).find('input[name=parent_id]').val();
        console.log(content, parent_id);
        $.ajax({
          type: 'POST',
          url: './handle_add_comment.php',
          data: {
            content,
            parent_id
          }
        }).done(function(data){
          console.log(data);
          if(!data.result){
            alert(data.message);
            return
          }
          content:$('textarea[name=add_comment]').val('');
          parent_id:$('input[name=parent_id]').val('');
          location.reload();
        });
      })
    })
  </script>
</head>

<body>
  <?php require_once('layout/nav.php');?>
  <main class="container">
    <p class="alert">警！！！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    
    <section class="comments comment__post">
      <form class="comment__form">
         <input type="hidden" value = 0 name="parent_id">
         <h2 class="title">爆雷有理，劇透無罪</h2>
         <div>
            <textarea name="add_comment" cols="40" rows="5" placeholder="我要爆料" id="spoiler"></textarea>
         </div>
         <?php
          if(isset($username) && !empty($username)){?>
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
          while($row = $result->fetch_assoc()){ ?>
          <!-- 主留言 -->
            <div class="comment show_comment" >
              <span class="comment__nickname">爆雷王:  <?= escape($row['nickname']) ?> (@<?= escape($row['username']) ?>)
                <span class="update_comment">
                  <?php if($row['username'] === $username){ ?> 
                    <a href="update_comment.php?id=<?= escape($row['id']); ?>" class="comment__edit-btn" data-id ="<?= escape($row['id']); ?>">編輯</a>
                    <div class="comment__delete-btn" data-id ="<?= escape($row['id']); ?>">刪除</div>
                  <?php }?>
                </span>
              </span>
                <div class="comment__content">我要爆料:  <?= escape($row['content']); ?></div>
                <div class="comment__time">留言時間： <?= escape($row['created_at']); ?></div>
                
                <!-- 子留言 -->
                <div class="sub-comments">
                  <?php
                    // 子留言的主留言的 id 為 parent_id
                    $parent_id = $row['id'];
                    $sql_sub = "SELECT c.id as id, c.content as content, c.created_at as created_at, u.nickname as nickname, u.username as username FROM 4genie_comments as c LEFT JOIN 4genie_users as u ON c.username = u.username WHERE c.is_deleted is NULL AND c.parent_id = ? ORDER BY c.id DESC";

                    // 將 sql query 換成 prepared statement，避免 SQL Injection
                    $stmt = $conn->prepare($sql_sub);
                    $stmt->bind_param('i', $parent_id);
                    $result_sub = $stmt->execute();
                    if(!$result_sub){
                      die("Error: ".$conn->error);
                    }
                    $result_sub = $stmt->get_result();
                    if($result_sub){
                       while($row_sub = $result_sub->fetch_assoc()){ 
                         // 當子留言的人為主留言本人，則留言的背景改為黑色，否則皆為深紅色
                         if($row['username']=== $row_sub['username']){ ?>
                            <div class="sub-comment user-comment show_comment">
                  <?php }else{ ?>
                            <div class="sub-comment show_comment">
                  <?php }?>

                              <div class="sub-comment__nickname">爆雷王:  <?= escape($row_sub['nickname']) ?> (@<?= escape($row_sub['username']) ?>)
                                <span class="update_comment">
                                  <?php if($row_sub['username'] === $username){ ?> 
                                    <a href="update_comment.php?id=<?= escape($row_sub['id']); ?>" class="comment__edit-btn" data-id ="<?= escape($row_sub['id']); ?>">編輯</a>
                                    <div class="comment__delete-btn" data-id ="<?= escape($row_sub['id']); ?>">刪除</div>
                                  <?php }?>
                                </span>
                              </div>
                                <div class="sub-comment__content">我要爆料:<?= escape($row_sub['content']); ?></div>
                                <div class="sub-comment__time">留言時間：<?= escape($row_sub['created_at']); ?></div>
                            </div>
                  <?php
                      }
                    }
                  ?>
                  </div>
                  <div class="add-sub-comment">
                    <h3>有料要追加</h3>
                    <form class="sub-comment__form">
                      <input type="hidden" value = <?= escape($row['id']); ?> name="parent_id">
                      <div>
                          <textarea name="add_comment1" cols="40" rows="5" placeholder="換我爆料" id="spoiler"></textarea>
                      </div>
                      <?php
                        if(isset($member) && !empty($member)){?>
                          <input type="submit" value="我來爆一個！">
                        <?php }else{ ?>
                          <div><h3>註冊或登入會員後才能留言喔～</h3></div>
                        <?php
                        }
                      ?>
                    </form>
                  </div>
            </div>
      <?php
          }
        }
      ?>
        
    </section>
    <section class="pagination">
      <?php
      // 將 sql query 換成 prepared statement，避免 SQL Injection
        $stmt = $conn->prepare(
          "SELECT count(id) as count FROM 4genie_comments WHERE is_deleted is NULL"
        );

        $result = $stmt->execute();
        if(!$result){
          die('Error: ' . $conn->error);
        }
        $result = $stmt->get_result();
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