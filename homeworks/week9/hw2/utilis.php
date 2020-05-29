<!-- 
  因為會重複用到，所以寫成 function
  主要是兩部分，
  1. 跳出訊息
  2. 轉址

  * htmlentities 函數可以把字符轉換為 HTML 實體。
 -->

<?php
  function printMessage($msg,$redirect){
    echo '<script>';
    echo "alert('".htmlentities($msg,ENT_QUOTES)."');";
    echo "window.location = '".$redirect."'";
    echo '</script>';
  }
?>