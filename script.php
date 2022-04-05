<?php
include 'bd.php';

//description
$thisObjectId = $_POST['thisObjectId'];

//create
$objectTitle = $_POST['objectTitle'];
$objectParent = $_POST['objectParent'];
$objectDesc = $_POST['objectDesc'];

// edit
$edtObjectId = $_POST['edtObjectId'];
$edtObjectTitle = $_POST['edtObjectTitle'];
$edtObjectParent = $_POST['edtObjectParent'];
$edtObjectDesc = $_POST['edtObjectDesc'];

//delete
$objectId = $_POST['objectId'];

//description
if (isset($thisObjectId)) {
  getDescription($thisObjectId, $db);
}
//create
if (isset($objectTitle) && isset($objectParent) && isset($objectDesc)) {
  addTreeObject($db, $objectTitle, $objectParent, $objectDesc);
}
//delete
if (isset($objectId)) {
  deleteObject($objectId, $db);
}
//edit
if (isset($edtObjectId) && isset($edtObjectTitle) && isset($edtObjectParent) && isset($edtObjectDesc)) {
  changeObject($db, $edtObjectId, $edtObjectTitle, $edtObjectParent, $edtObjectDesc);
}

//click to object
function getObjects($db){
  if ($result = mysqli_query($db, "SELECT * FROM objects")) {
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
  }
}

function createTree($arr){
  $parents_arr = array();
  foreach ($arr as $key => $item) {
    $parents_arr[$item['parent_id']][$item['id']] = $item;
  }
  $treeElem = $parents_arr[0];
  generateElemTree($treeElem, $parents_arr);

  return $treeElem;
}

function generateElemTree(&$treeElem, $parents_arr){
  foreach ($treeElem as $key => $item) {
    if (!isset($item['children'])) {
      $treeElem[$key]['children'] = array();
    }
    if (array_key_exists($key, $parents_arr)) {
      $treeElem[$key]['children'] = $parents_arr[$key];
      generateElemTree($treeElem[$key]['children'], $parents_arr);
    }
  }
}

function renderTemplate($path, $arr) {
  $output = '';
  if (file_exists($path)) {
    extract($arr);
    ob_start();
    include $path;
    $output = ob_get_clean();
  }
  return $output;
}

//description
function getDescription($thisObjectId, $db){
  $query = mysqli_query($db, "SELECT * FROM objects Where $thisObjectId = id ");
  $description = mysqli_fetch_assoc($query);
  $idDesc = $description['parent_id'];
  $queryParentName = mysqli_query($db, "SELECT title FROM objects Where $idDesc = id ");
  $parentName = mysqli_fetch_assoc($queryParentName);
  $response = [
    'description' => $description,
    'parentName' => $parentName['title']
  ];
  echo json_encode($response);
}

// created object
function addTreeObject($db, $objectTitle, $objectParent, $objectDesc){
  $objectTitle = stripslashes(htmlspecialchars(strip_tags($objectTitle)));
  $objectParent = stripslashes(htmlspecialchars(strip_tags($objectParent)));
  $objectDesc = stripslashes(htmlspecialchars(strip_tags($objectDesc)));

  if ($objectParent != "0") {
    $thisObjectQuery = mysqli_query($db,
      "SELECT id FROM objects Where title = '$objectParent'"
    );
      $objectParentId = mysqli_fetch_assoc($thisObjectQuery);
      $objectParentId = $objectParentId['id'];
  } else if ($objectParent == "0"){
      $objectParentId = "0";
  }

  $insertObject = mysqli_query($db,
    "INSERT INTO objects (title, parent_id, description)
    VALUES ('$objectTitle', '$objectParentId', '$objectDesc')"
  );
  if ($insertObject == true) {
    $response = [
      'message' => "Object created successfully",
      'status' => true
    ];
  } else {
    $response = [
      'message' => "Object no created",
      'status' => false
    ];
  }
  echo json_encode($response);
}

//delete object
function deleteObject($objectId, $db){
  if ($objectId !== "") {
    $deleteChildren = mysqli_query($db, "DELETE FROM objects Where $objectId = parent_id ");
    if ($deleteChildren == true) {
      $deleteObj = mysqli_query($db, "DELETE FROM objects Where $objectId = id ");
      if ($deleteObj == true) {
        $response = [
          'message' => "Object deleted successfully",
          'status' => true
        ];
      }
    }
  } else {
    $response = [
      'message' => "Choose an object",
      'status' => false
    ];
  }
  echo json_encode($response);
}

//edit object
function changeObject($db, $edtObjectId, $edtObjectTitle, $edtObjectParent, $edtObjectDesc){
  $edtObjectId = stripslashes(htmlspecialchars(strip_tags($edtObjectId)));
  $editObjectTitle = stripslashes(htmlspecialchars(strip_tags($edtObjectTitle)));
  $edtObjectParent = stripslashes(htmlspecialchars(strip_tags($edtObjectParent)));
  $edtObjectDesc = stripslashes(htmlspecialchars(strip_tags($edtObjectDesc)));

  $query = mysqli_query($db, "UPDATE objects SET description = '$edtObjectDesc', title = '$editObjectTitle' WHERE id = $edtObjectId");
  if ($query) {
    $response = [
      'message' => "Object сhanged",
      'status' => true
    ];
  } else {
    $response = [
      'message' => "Failed change",
      'status' => false
    ];
  }
  echo json_encode($response);
}
