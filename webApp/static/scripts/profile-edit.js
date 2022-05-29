$(".tak").prop("disabled", true);
$(".tak").css("pointer-events", "none");
var cosie = 0;
$(document).ready(function () {
  console.log("siema");
  $(".tak").click(function () {
    setTimeout(function () {
      $(".about-information").show();
      $(".addres-book").hide();
      $(".tak").css("pointer-events", "none");
      $(".nie").css("pointer-events", "auto");
    }, 300);
    $(".addres-book").toggleClass("siema2");
    $(".about-information").toggleClass("siema");

    $(this).prop("disabled", true);
    $(".nie").prop("disabled", false);
    cosie += 1;
  });
  $(".nie").click(function () {
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

  var firstValid = false;
  var lastnameValid = false;
  var emailValid = false;
  var phoneValid = false;
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
    }
  });

  function checkLengthFirstPage(inputField) {
    console.log("jd");
    console.log($(inputField).attr("id"));
    var input = $(inputField);
    if (input.attr("id") == "first_name") {
      console.log("to jest", input.attr("id"));
      if (input.val().length >= 2) {
        firstValid = true;

        console.log("to jest", input.attr("id"));
      } else {
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      console.log("to jest", input.attr("id"));
      if (input.val().length >= 2) {
        lastnameValid = true;
      } else {
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
        emailValid = true;
      } else {
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
        streetValid = true;
      } else {
        input.css("border-color", "red");
        streetValid = false;
      }
    } else if (inputId == "city") {
      if (inputLength >= 4 && inputLength <= 50) {
        cityValid = true;
      } else {
        cityValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "zip_code") {
      if (inputLength == 6) {
        zipValid = true;
      } else {
        zipValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "state") {
      if (inputLength >= 4 && inputLength <= 50) {
        stateValid = true;
      } else {
        stateValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "country") {
      if (inputLength >= 4 && inputLength <= 50) {
        countryValid = true;
      } else {
        countryValid = false;
        input.css("border-color", "red");
      }
    }
  }
});
