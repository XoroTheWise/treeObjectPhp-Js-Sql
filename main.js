//event click this object
$('body').on("click", ".object", function (e) {
  e.preventDefault();
  let objects = $('.object');
  let objectId = $(this).attr('id');
  let object = $(this);

  // red this object
  function activeObject() {
    for (var i = 0; i < objects.length; i++) {
      $(objects[i]).removeClass('active-object')
    }
    $(object).addClass('active-object');
    $('.message-right-block').css({
      'display':'inline',
      'color':'black'
    }).text(" ");
  }

  // display children object
  function recursionCheckChildren(thisObjectId) {
    for (let i = 0; i < objects.length; i++) {
      if (thisObjectId.id == objects[i].value) {
        if (objects[i].style.display == "block") {
          objects[i].style="display: none;";
        }
        recursionCheckChildren(objects[i]);
      }
    }
  }

  function checkChildrenOff(thisObjectId) {
    if (thisObjectId.style.display == "block") {
      thisObjectId.style = "display: none;";
    }
    recursionCheckChildren(thisObjectId);
  }

  function checkChildrenOn(thisObjectId) {
    for (let i = 0; i < objects.length; i++) {
      if (thisObjectId == objects[i].value) {
        if (objects[i].style.display == "none") {
          objects[i].style="display: block";
        }
        else {
          checkChildrenOff(objects[i]);
        }
      }
    }
  }

  //display description onclick
  function displayDescription(thisObjectId){
    $.ajax({
        url: "/script.php",
        type: "post",
        dataType: 'json',
        data: {
          thisObjectId: thisObjectId,
        },
        success (data) {
          $(".p-input").children('input[name = "objectId"]').val(data.description['id']);
          $(".p-input").children('textarea').val(data.description['description']);
          $(".p-input").children('input[name = "objectTitle"]').val(data.description['title']);
          if (data.parentName !== null) {
            $(".p-input").children('input[name = "objectParent"]').val(data.parentName);
          } else {
            $(".p-input").children('input[name = "objectParent"]').val("0");
          }
        }
    });
  }

activeObject();
displayDescription(objectId);
checkChildrenOn(objectId);
});

// active right block click on "create object"
$('body').on("click", ".createObject-button", function (e) {
    e.preventDefault();
    $('.delObject-button').css('display', 'none');
    $('.addObject-button').css('display', 'inline');
    $('.edtObject-button').css('display', 'none');
    $('.message-right-block').css('display', 'inline').text('To create a root object, enter 0 in the parent field');
    $(".p-input").children('input').css({
      'border-width' : '1px',
      'border-color':'#000000',
      'border-style':'solid',
      'background':'#f4fcff'
    }).attr('readonly', false);
    $(".p-input").children('textarea').css({
      'border-width' : '1px',
      'border-color':'#000000',
      'border-style':'solid',
      'background':'#f4fcff'
    }).attr('readonly', false);
});

// get data and validation and send to php on button click "Add"
$('body').on("click", ".addObject-button", function (e) {
    e.preventDefault();
      let objectTitle = $(".p-input").children('input[name = "objectTitle"]').val();
      let objectParent = $(".p-input").children('input[name = "objectParent"]').val();
      let objectDesc = $(".p-input").children('textarea').val();
      let obj = $('.object');
      let errors = [];
      let checkDuplicateName = "not found";
      let checkDuplicateParent = "not found";

      //validation
      if (objectTitle == "") {
        errors[0] = " Empty name! ";
      } else if (objectTitle.length > 20) {
        errors[0] = " Name max: 20! ";
      } else if (objectTitle == objectParent){
        errors[0] = "An object cannot be its own parent !";
      } else {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].innerHTML == objectTitle){
            checkDuplicateName = "available";
            break;
          }
        }
        if (checkDuplicateName == "available") {
          errors[0] = "This name already exists !";
        }
      }

      if (objectParent == "") {
        errors[1] = " Empty description! ";
      } else if (objectParent.length > 20) {
        errors[1] = " Parent max: 20! ";
      } else {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].innerHTML == objectParent){
              checkDuplicateParent = "available";
            break;
          }
        }
        if (checkDuplicateParent == "not found" && objectParent !== "0") {
          errors[1] = "This parent does not exist !";
        }
      }

      if (objectDesc == "") {
        errors[2] = " Empty description! ";
      } else if (objectDesc.length > 100) {
        errors[2] = " Desc max: 100! ";
      }

      //send php
      if (errors.length == 0) {
        $.ajax({
            url: "/script.php",
            type: "post",
            dataType: 'json',
            data: {
              objectTitle: objectTitle,
              objectParent: objectParent,
              objectDesc: objectDesc
            },
            success (data) {
              if (data.status == true) {
                $('.message-right-block').css('color', 'green').text(data.message);
                $(".left-block").load("/index.php .left-block > *");
              } else {
                $('.message-right-block').css('color', 'red').text(data.message);
              }
            }
        });
      } else {
        $('.message-right-block').css('color', 'red').text(errors);
      }
});

// active right block click on "delete object"
$('body').on("click", ".deleteObject-button", function (e) {
    e.preventDefault();
    $('.delObject-button').css('display', 'inline');
    $('.addObject-button').css('display', 'none');
    $('.edtObject-button').css('display', 'none');
    $('.message-right-block').css('display', 'inline').text('The object and its children will be deleted !');

    $(".p-input").children('input').css({
      'border' : 'none',
      'background':'#e6eeff'
    }).attr('readonly', true);
    $(".p-input").children('textarea').css({
      'border' : 'none',
      'background':'#e6eeff'
    }).attr('readonly', true);
});

// send to php on button click "Delete"
$('body').on("click", ".delObject-button", function (e) {
    e.preventDefault();
    let objectId = $(".p-input").children('input[name = "objectId"]').val();
    $.ajax({
        url: "/script.php",
        type: "post",
        dataType: 'json',
        data: {
          objectId: objectId
        },
        success (data) {
          if (data.status == true) {
            $('.message-right-block').css('color', 'green').text(data.message);
            $(".left-block").load("/index.php .left-block > *");
          } else {
            $('.message-right-block').css('color', 'red').text(data.message);
          }
        }
    });
});

// active right block click on "edit object"
$('body').on("click", ".editObject-button", function (e) {
    e.preventDefault();
    $('.delObject-button').css('display', 'none');
    $('.addObject-button').css('display', 'none');
    $('.edtObject-button').css('display', 'inline');
    $('.message-right-block').css('display', 'inline').text('');
    $(".p-input").children('input').css({
      'border-width' : '1px',
      'border-color':'#000000',
      'border-style':'solid',
      'background':'#f4fcff'
    }).attr('readonly', false);
    $(".p-input").children('textarea').css({
      'border-width' : '1px',
      'border-color':'#000000',
      'border-style':'solid',
      'background':'#f4fcff'
    }).attr('readonly', false);
    $(".p-input").children('input[name = "objectParent"]').css({
      'border' : 'none',
      'background':'#e6eeff'
    }).attr('readonly', true);
});

// get data and validation and send to php on button click "Change"
$('body').on("click", ".edtObject-button", function (e) {
    e.preventDefault();
      let objectId = $(".p-input").children('input[name = "objectId"]').val();
      let objectTitle = $(".p-input").children('input[name = "objectTitle"]').val();
      let objectParent = $(".p-input").children('input[name = "objectParent"]').val();
      let objectDesc = $(".p-input").children('textarea[name = "objectDesc"]').val();
      let objects = $('.object');
      let checkDuplicateName = "not found";
      let errors = [];

      //validation
      if (objectTitle == "") {
        errors[0] = " Empty name! ";
      } else if (objectTitle.length > 20) {
        errors[0] = " Name max: 20! ";
      } else {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i].innerHTML == objectTitle && objects[i].id !== objectId){
            checkDuplicateName = "available";
            break;
          }
        }
        if (checkDuplicateName == "available") {
          errors[0] = "This name already exists !";
        }
      }
      if (objectDesc == "") {
        errors[1] = " Empty description! ";
      } else if (objectDesc.length > 100) {
        errors[1] = " Desc max: 100! ";
      }

      //send to php
      if (errors.length == 0) {
        $('.message-right-block').text(" ");
        $.ajax({
            url: "/script.php",
            type: "post",
            dataType: 'json',
            data: {
              edtObjectId: objectId,
              edtObjectTitle: objectTitle,
              edtObjectParent: objectParent,
              edtObjectDesc: objectDesc
            },
            success (data) {
              if (data.status == true) {
                $('.message-right-block').css('color', 'green').text(data.message);
                $(".left-block").load("/index.php .left-block > *");
              } else {
                $('.message-right-block').css('color', 'red').text(data.message);
              }
            }
        });
      } else {
        $('.message-right-block').css('color', 'red').text(errors);
      }
});
