$(".tak").prop("disabled", true);
$(".tak").css("pointer-events", "none");
// $(".nie").
var cosie = 0;
$(document).ready(function () {
  console.log("siema");
  $(".tak").click(function () {
    //about information
    setTimeout(function () {
      $(".about-information").show();
      $(".addres-book").hide();
      $(".tak").css("pointer-events", "none");
      $(".nie").css("pointer-events", "auto");
    }, 300);
    // $(".about-information").show();
    $(".addres-book").toggleClass("siema2");
    $(".about-information").toggleClass("siema");
    // $(".addres-book").hide();
    $(this).prop("disabled", true);
    $(".nie").prop("disabled", false);
    cosie += 1;
  });
  $(".nie").click(function () {
    // button  addres book
    setTimeout(function () {
      $(".about-information").hide();
      $(".addres-book").show();
      $(".tak").css("pointer-events", "auto");
      $(".nie").css("pointer-events", "none");
    }, 300);
    if (cosie >= 1) {
      $(".addres-book").toggleClass("siema2");
    }
    $(".about-information").toggleClass("siema");
    $(".addres-book").addClass("addres-book");
    // $(".addres-book").toggleClass("siema2")
    // $(".addres-book").show();
    $(this).prop("disabled", true);
    $(".tak").prop("disabled", false);
  });

  function startFieldProfile() {
    var Array = $("dd").children(".niewiem");
    console.log(Array.length);
    for (var x = 0; x < Array.length; x++) {
      var idOfInput = $("dd").children(".niewiem")[x].id;
      var newId = idOfInput + "-field";
      document.getElementById(newId).innerHTML =
        $("dd").children(".niewiem")[x].value;
      console.log(newId);
    }
  }
  startFieldProfile();

  function fieldProfile(inputDate) {
    var clickedInput = $(inputDate).attr("id");
    console.log(clickedInput);
    console.log($(inputDate));
    var id = clickedInput + "-field";
    console.log("nowe id: ", id);
    console.log("znaeziono id: ", document.getElementById(id));
    document.getElementById(id).innerHTML = $(inputDate).val();
  }

  $(".niewiem").keyup(function () {
    fieldProfile(this);
  });

  // update validation //

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

  $(".zmien-button1").click(function () {
    console.log("siema");
    var Array = $("dd").children(".niewiem");
    console.log(Array);
    for (var x = 0; x < Array.length; x++) {
      var fajnie = $("dd").children(".niewiem")[x];
      checkLengthFirstPage(fajnie);
      checkLengthSecondPage(fajnie);
    }
    if (
      firstValid == true &&
      lastnameValid == true &&
      emailValid == true &&
      phoneValid == true &&
      streetValid == true &&
      cityValid == true &&
      zipValid == true &&
      stateValid == true &&
      countryValid == true
    ) {
      $("#form").submit();
    }
  });
  $(document).on("keypress", function (key) {
    if (key.which == 13) {
      if (
        firstValid == true &&
        lastnameValid == true &&
        emailValid == true &&
        phoneValid == true &&
        streetValid == true &&
        cityValid == true &&
        zipValid == true &&
        stateValid == true &&
        countryValid == true
      ) {
        $("#form").submit();
      }
    }
  });

  function checkLengthFirstPage(inputField) {
    console.log("jd");
    console.log($(inputField).attr("id"));
    var input = $(inputField);
    if (input.attr("id") == "first_name") {
      console.log("to jest", input.attr("id"));
      if (input.val().length >= 2) {
        // input.css("border-color", "green");
        firstValid = true;
        // clearError(inputField);
        // checkErrors();
        console.log("to jest", input.attr("id"));
      } else {
        // showError(inputField);
        // checkErrors();
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      console.log("to jest", input.attr("id"));
      if (input.val().length >= 2) {
        // input.css("border-color", "green");
        lastnameValid = true;
        // clearError(inputField);
        // checkErrors();
      } else {
        // showError(inputField);
        // checkErrors();
        lastnameValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "email") {
      console.log("to jest", input.attr("id"));
      if (
        input.val().length >= 6 &&
        input.val().includes("@") &&
        input.val().includes(".") &&
        !input.val().includes(" ")
      ) {
        // clearError(inputField);
        // checkErrors();
        // input.css("border-color", "green");
        emailValid = true;
      } else {
        // showError(inputField);
        // checkErrors();
        emailValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "phone_number") {
      console.log("to jest", input.attr("id"));
      if (
        input.val().length >= 9 &&
        input.val().length <= 12 &&
        !isNaN(parseInt($(input).val()))
      ) {
        // input.css("border-color", "green");
        phoneValid = true;
        // clearError(inputField);
        // checkErrors();
      } else {
        // showError(inputField);
        // checkErrors();
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
        // input.css("border-color", "green");
        streetValid = true;
        // clearError(inputField);
        // checkErrors();
      } else {
        // showError(inputField);
        // checkErrors();
        input.css("border-color", "red");
        streetValid = false;
      }
    } else if (inputId == "city") {
      if (inputLength >= 4 && inputLength <= 50) {
        input.css("border-color", "green");
        cityValid = true;
        // clearError(inputField);
        // checkErrors();
      } else {
        // showError(inputField);
        // checkErrors();
        cityValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "zip_code") {
      if (inputLength == 6) {
        // input.css("border-color", "green");
        zipValid = true;
      } else {
        zipValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "state") {
      if (inputLength >= 4 && inputLength <= 50) {
        // input.css("border-color", "green");
        stateValid = true;
      } else {
        stateValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "country") {
      if (inputLength >= 4 && inputLength <= 50) {
        // input.css("border-color", "green");
        countryValid = true;
      } else {
        countryValid = false;
        input.css("border-color", "red");
      }
    }
  }
});
