$(".tak").prop("disabled", true);
$(".tak").css("pointer-events", "none");
var animationCount = 0;
var phone_number_copy;
var respond;
var isPossible = true;
$(document).ready(function () {
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
    animationCount += 1;
  });
  $(".nie").click(function () {
    setTimeout(function () {
      $(".about-information").hide();
      $(".addres-book").show();
      $(".tak").css("pointer-events", "auto");
      $(".nie").css("pointer-events", "none");
    }, 300);
    if (animationCount >= 1) {
      $(".addres-book").toggleClass("siema2");
    }
    $(".about-information").toggleClass("siema");
    $(".addres-book").addClass("addres-book");
    $(this).prop("disabled", true);
    $(".tak").prop("disabled", false);
  });

  function startFieldProfile() {
    var Array = $("dd").children(".niewiem");
    for (var x = 0; x < Array.length; x++) {
      var idOfInput = $("dd").children(".niewiem")[x].id;
      if (idOfInput == "phone_number") {
        phone_number_copy = $("dd").children(".niewiem")[x].value;
        console.log(
          "jest numer telefonu posiadany",
          idOfInput,
          "jego wartosc to: ",
          phone_number_copy
        );
      }
      var newId = idOfInput + "-field";
      document.getElementById(newId).innerHTML =
        $("dd").children(".niewiem")[x].value;
    }
  }
  startFieldProfile();

  function fieldProfile(inputDate) {
    var clickedInput = $(inputDate).attr("id");
    var id = clickedInput + "-field";
    document.getElementById(id).innerHTML = $(inputDate).val();
    console.log(phone_number_copy);
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
    var Array = $("dd").children(".niewiem");
    for (var x = 0; x < Array.length; x++) {
      var fajnie = $("dd").children(".niewiem")[x];
      checkLengthFirstPage(fajnie);
      checkLengthSecondPage(fajnie);
    }
    setTimeout(function () {
      if (
        firstValid == true &&
        lastnameValid == true &&
        emailValid == true &&
        streetValid == true &&
        cityValid == true &&
        zipValid == true &&
        stateValid == true &&
        countryValid == true &&
        phoneValid == true
      ) {
        $("#form").submit();
      } else {
        console.log(phoneValid);
        $(".error").empty();
        console.log(isPossible);
        if (!isPossible) {
          if (respond == "Phone number is invalid or already taken") {
            var data =
              "<h3 style='color: red;'>Taki numer telefonu juz instnieje </h3>";
          }
          if (respond == "Nie ma takiego telefon wariacie") {
            var data =
              "<h3 style='color: red;'>Nie ma takiego numeru telefonu </h3>";
          }
        } else {
          var data =
            "<h3 style='color: red;'> Gdzieś masz Błąd, sprawdz dokladnie! </h3>";
        }
        $(".error").append(data);
      }
    }, 300);
  });
  $(document).on("keypress", function (key) {
    if (key.which == 13) {
      var Array = $("dd").children(".niewiem");
      for (var x = 0; x < Array.length; x++) {
        var fajnie = $("dd").children(".niewiem")[x];
        checkLengthFirstPage(fajnie);
        checkLengthSecondPage(fajnie);
      }
      if (
        firstValid == true &&
        lastnameValid == true &&
        emailValid == true &&
        streetValid == true &&
        cityValid == true &&
        zipValid == true &&
        stateValid == true &&
        countryValid == true &&
        phoneValid == true
      ) {
        $("#form").submit();
      } else {
        $(".error").empty();
        var data =
          "<h3 style='color: red;'> Gdzieś masz Błąd, sprawdz dokladnie! </h3>";
        console.log(phoneValid);
        $(".error").append(data);
      }
    }
  });

  function checkLengthFirstPage(inputField) {
    var input = $(inputField);
    if (input.attr("id") == "first_name") {
      if (input.val().length >= 2) {
        firstValid = true;
      } else {
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      if (input.val().length >= 2) {
        lastnameValid = true;
      } else {
        lastnameValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "email") {
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
      if ($("#phone_number").val() === phone_number_copy) {
        console.log(phone_number_copy);
        console.log($("#phone_number").val());
        console.log("niesprawdzono");
        phoneValid = true;
        isPossible = true;
        input.css("border-color", "black");
      } else {
        console.log("sprawdzam... ");
        if (input.val().length <= 12 && input.val().length >= 9) {
          $.ajax({
            method: "post",
            url: "/phone_validity_checks",
            data: { phone: input.val() },
            success: function (res) {
              console.log(input.val());
              if (res == "Phone number is invalid or already taken") {
                respond = "Phone number is invalid or already taken";
                phoneValid = false;
                input.css("border-color", "red");
              } else if (res == "Nie ma takiego telefon wariacie") {
                respond = "Nie ma takiego telefon wariacie";
                isPossible = false;
                phoneValid = false;
                input.css("border-color", "red");
              } else {
                respond = "";
                console.log("zgadza sie");
                isPossible = true;
                phoneValid = true;
              }
            },
          });
        } else {
          isPossible = false;
          phoneValid = false;
          input.css("border-color", "green");
        }
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
