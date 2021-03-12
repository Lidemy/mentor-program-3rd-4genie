<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 會員登入</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css" >
  <link rel="stylesheet" href="./style.css">
  
</head>
<body>
  <?php require_once('layout/nav.php');?>
  <main class="container">
    <h4>警！！！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</h4>

    <section class="register">
      <form action="./handle_login.php" method="POST" class="form__wrapper">  <h2 class="title_member">登入</h2>
        <div class="form__row">
          <input type="text" name = "username" placeholder="請輸入你的帳號">
        </div>
        <div class="form__row">
          <input type="password" name = "password" placeholder="密碼">
        </div>
        <div class="form__row">
          <input type="submit" value="登入">
        </div>
      </form>
    </section>
  </main>
</body>
</html>