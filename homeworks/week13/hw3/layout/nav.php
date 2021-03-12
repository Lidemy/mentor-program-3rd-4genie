<!-- *********************
將每個頁面都相同呈現的導覽列單獨寫出，然後每個頁面再導入nav.php。
這樣做的好處是如果導覽列有需要調整的地方，一起在這邊改就好，
不用每個頁面都要再改一次，比較不容易漏掉。
***********************-->

<nav class="nav">
  <ul class="nav__list nav__left">
    <li class="nav_item">
      <a href="./index.php">首頁</a>
    </li>
  </ul>
  <ul class="nav__list nav__right">
  <!-- 
    如果會員已登入，則導覽列只顯示"登出"選項， 
    若尚未登入，則出現"註冊"與"登入"
    HTML 寫在兩個 PHP 標籤之間-->
    
    <?php
      if(isset($username) && !empty($username)){?>
        <li class="nav__item">
          <a href="./logout.php">登出</a>
        </li>
    <?php }else{ ?>
        <li class="nav__item">
          <a href="./register.php">註冊</a>
        </li>
        <li class="nav__item">
          <a href="./login.php">登入</a>
        </li>
    <?php
        }
    ?>
    
  </ul>

</nav>

