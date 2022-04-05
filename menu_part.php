<ul class="ul-group">

  <?php
  //Parsing objects from an "array" and wrapping them in tags
   include 'bd.php';
   $numObjectsAll = count(getObjects($db));

   foreach ($objectTree as $obj){
    $result = mysqli_query($db, "SELECT * FROM objects WHERE $obj[id]= parent_id");
    $numObjects = mysqli_num_rows($result);
    ?>
    <li
      class =
      <? if ($numObjects == 0): ?>
          "object parent"
      <? endif; if ($numObjects !== 0):  ?>
          "object children"
      <? endif;  ?>
      id = "<? echo $obj['id']; ?>"
      value = "<? echo $obj['parent_id']; ?>"
      style = <? if ($obj['parent_id'] == 0) {
                      ?>"display:block;"<?
                    } else {
                      ?> "display:none;" <?
                    }?>
    ><?php echo $obj['title']; ?></li>
  </label>

    <?php
    if (count($obj['children']) > 0) {
      echo  renderTemplate('menu_part.php', ['objectTree'=>$obj['children']]);
    }
   }
?>

</ul>
