<section class="comments">
<!-- 主留言 -->
  <div class="comment show_comment" >
    <span class="comment__nickname">爆雷王:  aaa> (@bb)
      <span class="update_comment">
        <?php if($row['username'] === $username){ ?> 
          <div class="comment__edit-btn" data-id ="<?= escape($row['id']); ?>">編輯</div>
          <div class="comment__delete-btn" data-id ="<?= escape($row['id']); ?>">刪除</div>
        <?php }?>
      </span>
    </span>
      <div class="comment__content">我要爆料:  fdsfewf</div>
      <div class="comment__time">留言時間： 2020-12-08</div>
      
      <!-- 子留言 -->
      <div class="sub-comments">
                if($row['username']=== $row_sub['username']){ ?>
                  <div class="sub-comment user-comment show_comment">
        <?php }else{ ?>
                  <div class="sub-comment show_comment">
        <?php }?>

                    <div class="sub-comment__nickname">爆雷王:  <?= escape($row_sub['nickname']) ?> (@<?= escape($row_sub['username']) ?>)
                      <span class="update_comment">
                        <?php if($row_sub['username'] === $username){ ?> 
                          <div class="comment__edit-btn" data-id ="<?= escape($row_sub['id']); ?>">編輯</div>
                          <div class="comment__delete-btn" data-id ="<?= escape($row_sub['id']); ?>">刪除</div>
                        <?php }?>
                      </span>
                    </div>
                      <div class="sub-comment__content">我要爆料:<?= escape($row_sub['content']); ?></div>
                      <div class="sub-comment__time">留言時間：<?= escape($row_sub['created_at']); ?></div>
                  </div>
        </div>
        <div class="add-sub-comment">
          <h3>有料要追加</h3>
          <form action="./handle_comment.php" method="POST" class="sub-comment__form">
            <input type="hidden" value = <?= escape($row['id']); ?> name="parent_id">
            <div>
                <textarea name="add_comment" cols="40" rows="5" placeholder="換我爆料" id="spoiler"></textarea>
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
    </section>