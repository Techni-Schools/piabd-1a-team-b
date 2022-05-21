$(document).ready(function () {
  var pageNumber = 1;
  var validPoints = 0;

  //   first  page valid variables 

  var firstValid = false;
  var lastnameValid = false;
  var emailValid = false;
  var phoneValid = false;

  //

  function checkPage() {
    if (pageNumber == 1) {
      $("#0-1").show();
      $("#0-2").hide();
      $("#0-3").hide();
      $("#backButton").hide();
    } else if (pageNumber == 2) {
      $("#0-1").hide();
      $("#0-2").show();
      $("#0-3").hide();
      $("#backButton").show();
    } else if (pageNumber == 3) {
      $("#0-1").hide();
      $("#0-2").hide();
      $("#0-3").show();
      $("#nextButton").val() = "submit"
    } else if (pageNumber == 4) {
      $("#register-form").submit();
    }
  }

  function pageNext() {
    if (pageNumber <= 5) {
      if (pageNumber == 1 ) {
        if (firstValid == true && lastnameValid == true && emailValid == true && phoneValid == true) {
          pageNumber += 1; 
        }
      }
    }
    checkPage()
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

  function checkLengthFirstPage(inputField) {
    console.log($(inputField).attr("id"));
    if ($(inputField).attr("id") == "first_name") {
      console.log("to jest usernmae");
      if ($(inputField).val().length >= 2) {
        $(inputField).css("border-color", "green");
        firstValid = true;
      } else {
        firstValid = false;
        $(inputField).css("border-color", "red");
      }
    } else if ($(inputField).attr("id") == "last_name") {
      console.log("to jest nazwisko");
      if ($(inputField).val().length >= 2) {
        $(inputField).css("border-color", "green");
        lastnameValid = true
      } else {
        lastnameValid = false
        $(inputField).css("border-color", "red");
      }
    } else if ($(inputField).attr("id") == "email") {
      console.log("to jest email");
      if (
        $(inputField).val().length >= 6 &&
        $(inputField).val().includes("@") &&
        $(inputField).val().includes(".")
      ) {
        $(inputField).css("border-color", "green");
        emailValid = true 
      } else {
        emailValid = false
        $(inputField).css("border-color", "red");
      }
    } else if ($(inputField).attr("id") == "phone_number") {
      console.log("to jest numer telefonu");
      if ($(inputField).val().length == 9) {
        $(inputField).css("border-color", "green");
        phoneValid = true 
      } else {
        phoneValid = false;
        $(inputField).css("border-color", "red");
      }
    }
    console.log(validPoints)
  }

  $("input").focusout(function () {
    checkLengthFirstPage(this);
  });
  $("input").focus(function () {
    $(this).css("border-color", "black");
  });
});
