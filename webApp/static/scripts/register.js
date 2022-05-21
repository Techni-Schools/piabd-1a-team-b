$(document).ready(function () {
  var pageNumber = 1;
  var validPoints = 0;
  //   first  page valid variables

  var firstValid = false;
  var lastnameValid = false;
  var emailValid = false;
  var phoneValid = false;

  // second page valid variables
  var streetValid = false;
  var cityValid = false;
  var zipValid = false;
  var stateValid = false;
  var countryValid = false;
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
    } else if (pageNumber == 4) {
      $("#register-form").submit();
    }
  }

  function pageNext() {
    if (pageNumber <= 5) {
      if (pageNumber == 1) {
        if (
          firstValid == true &&
          lastnameValid == true &&
          emailValid == true &&
          phoneValid == true
        ) {
          pageNumber += 1;
        }
      }
      if (pageNumber == 2) {
        if (
          streetValid == true &&
          cityValid == true &&
          zipValid == true &&
          stateValid == true &&
          countryValid
        ) {
          pageNumber += 1;
        }
      }
    }
    console.log(pageNumber);
    checkPage();
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
    var input = $(inputField);
    if (input.attr("id") == "first_name") {
      console.log("to jest usernmae");
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        firstValid = true;
      } else {
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      console.log("to jest nazwisko");
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        lastnameValid = true;
      } else {
        lastnameValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "email") {
      console.log("to jest email");
      if (
        input.val().length >= 6 &&
        input.val().includes("@") &&
        input.val().includes(".")
      ) {
        input.css("border-color", "green");
        emailValid = true;
      } else {
        emailValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "phone_number") {
      console.log("to jest numer telefonu");
      if (input.val().length == 9) {
        input.css("border-color", "green");
        phoneValid = true;
      } else {
        phoneValid = false;
        input.css("border-color", "red");
      }
    }
  }

  function checkLengthSecondPage(inputField) {
    var input = $(inputField);
    var inputId = $(inputField).attr("id");
    var inputLength = $(inputField).val().length;
    if ($(inputField).attr("id") == "street") {
      if (inputLength >= 5 && inputLength <= 50) {
        input.css("border-color", "green");
        streetValid = true;
      } else {
        input.css("border-color", "red");
        streetValid = false;
      }
    } else if (inputId == "city") {
      if (inputLength >= 4 && inputLength <= 50) {
        input.css("border-color", "green");
        cityValid = true;
      } else {
        cityValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "zip_code") {
      if (inputLength == 6) {
        input.css("border-color", "green");
        zipValid = true;
      } else {
        zipValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "state") {
      if (inputLength >= 4 && inputLength <= 50) {
        input.css("border-color", "green");
        stateValid = true;
      } else {
        stateValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "country") {
      if (inputLength >= 4 && inputLength <= 50) {
        input.css("border-color", "green");
        countryValid = true;
      } else {
        countryValid = false;
        input.css("border-color", "red");
      }
    }
  }

  $("input").focusout(function () {
    if (pageNumber == 1) {
      checkLengthFirstPage(this);
    }
    if (pageNumber == 2) {
      checkLengthSecondPage(this);
    }
  });
  $("input").focus(function () {
    $(this).css("border-color", "black");
  });
});
