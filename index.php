<?php
include 'bd.php';
include 'script.php'
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>testNEBO</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <div class="container">
      <div class="left-block">
        <h2 class="title-block">Оbject Tree</h2>
        <?php
        //Formation of objects from the database by recursive PHP templating
        $objectTree = getObjects($db);
        $objectTree = createTree($objectTree);
        echo renderTemplate('template.php', ['objectTree'=>$objectTree]);
        ?>
      </div>
      <div class="center-block">
        <h2 class="title-block">Actions</h2>
        <button type="button" name="button" class="createObject-button">Create Object</button>
        <button type="button" name="button" class="deleteObject-button">Delete Object</button>
        <button type="button" name="button" class="editObject-button">Edit Object</button>
      </div>

      <div class="right-block">
        <h2 class="title-block">Info</h2>
        <p class="p-text">
          <p class="p-input" style="display:none">
            <input type="text" name="objectId" value="" readonly></p>
          <p class="p-input"><label for="objectTitle">Name</label>
            <input type="text" name="objectTitle" value="" readonly></p>
          <p class="p-input"><label for="objectParent">Parent</label>
            <input type="text" name="objectParent" value="" readonly></p>
          <p class="p-input"><label for="objectDesc">Description</label>
            <textarea type="text" name="objectDesc" readonly></textarea></p>
        </p>
        <p>
          <button type="button" name="button" class="addObject-button">Add</button>
          <button type="button" name="button" class="delObject-button">Delete</button>
          <button type="button" name="button" class="edtObject-button">Change</button>
        </p>
        <p class="message-right-block">The object and its children will be deleted !</p>

      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
