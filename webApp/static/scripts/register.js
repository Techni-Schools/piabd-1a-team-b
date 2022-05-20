$(document).ready(function () {
  var nextButton = document.getElementById("nextButton");
  var pageNumber = 1;


// function checkNextPage {
// 
// }

function checkPage() {
  if (pageNumber == 1 ) {
    $("#0-1").show();
    $("#0-2").hide();
    $("#0-3").hide();
    $("#backButton").hide()
  }
  else if (pageNumber == 2) {
  $("#0-1").hide();
  $("#0-2").show();
  $("#0-3").hide();
  $("#backButton").show();
  } 
  else if (pageNumber == 3) {
  $("#0-1").hide();
  $("#0-2").hide();
  $("#0-3").show();
  } 
  else if (pageNumber == 4) {
      $("#register-form").submit();
    }
  }

  function pageNext() {
    if (pageNumber <= 5) {
      pageNumber += 1;
      console.log(pageNumber);
      checkPage();
    }
  }

  function pageBack() {
    if (pageNumber > 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 0;
    }
    checkPage();
  }
  $("#nextButton").click(pageNext);
  $("#backButton").click(pageBack);




  function checkLength(inputField) {
    console.log($(inputField).attr('id'));
    if ($(inputField).attr('id') == "first_name") {
      console.log("to jest usernmae")
      if ($(inputField).val().length >= 2) {
        $(inputField).css("background-color", "green")
      }
      else {
        $(inputField).css("background-color", "white")
      }
    }
    else if ($(inputField).attr('id') == "last_name") {
      console.log("to jest nazwisko");
      if ($(inputField).val().length >= 2) {
        $(inputField).css("background-color", "green")
      }
      else {
        $(inputField).css("background-color", "white")
      }
    }
    else if($(inputField).attr('id') == "email") {
      console.log("to jest email")
      console.log($(inputField).attr('id').focusout)
      if($(inputField).val().length >= 6 && $(inputField).val().includes("@") && $(inputField).val().includes(".")) {
        console.log("jest okej")
        $(inputField).css("background-color", "green")
      }
      else {
        $(inputField).css("background-color", "white")
      }
    }
  }

  $('input').focusout(function() {
    checkLength(this);
  })
  $('input').focus(function() {
    $(this).css("background-color", "white")
  })
  // $("#register-button").click(function() {
  //   checkLength();
  // })
});

