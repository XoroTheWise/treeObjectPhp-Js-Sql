<?php
//recursive call
if (isset($objectTree)): ?>
  <?php echo  renderTemplate('menu_part.php', ['objectTree'=>$objectTree]); ?>
<?php endif; ?>
