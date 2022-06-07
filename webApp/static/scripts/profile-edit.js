$(".tak").prop("disabled", true);
$(".tak").css("pointer-events", "none");
var phone = window.matchMedia("(max-width: 565px)").matches;
console.log(phone);
var animationCount = 0;
var phone_number_copy; // kopia numeru telefonu aby sprawdzic czy sa takie same jesli uzytkownik nie zzmieni tego
var przypominajka_page = 1;
var email_copy;
var toggleClass = false; // uzywane do ładnego wysuniecia lewej strony menu
var respond;
var fajnie;
var clearTimeoutShow = 0;
var isPossible = true;
$(document).ready(function () {
  $(".profile-img").click(function () {
    $("#image").click();
  });
  $("#image-change").click(function () {
    $("#image").click();
  });
  $("#image").change(function () {
    var uploaded_images = "";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_images = reader.result;
      $(".profile-img").attr("src", uploaded_images);
      $(".image-change-img").attr("src", uploaded_images);
    });
    reader.readAsDataURL(this.files[0]);
  });
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
      }
      if (idOfInput == "email") {
        email_copy = $("dd").children(".niewiem")[x].value;
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
        listOfErrors = [];
        console.log(isPossible);
        var data =
          "<div class='error-banner'><i class='fa-solid fa-exclamation'></i><h3> Gdzieś masz bład!</h3></div>";
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
        input.css("border-color", "black");
      } else {
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      if (input.val().length >= 2) {
        lastnameValid = true;
        input.css("border-color", "black");
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
        if ($("#email").val() != email_copy) {
          console.log("sprawdzam");
          $.ajax({
            method: "post",
            url: "/email_validity_checks",
            data: { email: input.val() },
            success: function (res) {
              if (res == "Email is invalid or already taken") {
                //jesli sie nie udało
                console.log("niue prawidlowy mail");
                emailValid = false;
                input.css("border-color", "yellow");
              } else {
                // clearError(inputField);
                input.css("border-color", "green");
                emailValid = true;
              }
            },
          });
        } else {
          emailValid = true;
          input.css("border-color", "black");
        }
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
                phoneValid = false;
                input.css("border-color", "yellow");
              } else if (res == "Nie ma takiego telefon wariacie") {
                isPossible = false;
                phoneValid = false;
                input.css("border-color", "yellow");
              } else {
                respond = "";
                input.css("border-color", "black");
                console.log("zgadza sie");
                isPossible = true;
                phoneValid = true;
              }
            },
          });
        } else {
          isPossible = false;
          phoneValid = false;
          input.css("border-color", "red");
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
        input.css("border-color", "black");
      } else {
        input.css("border-color", "red");
        streetValid = false;
      }
    } else if (inputId == "city") {
      if (inputLength >= 4 && inputLength <= 50) {
        cityValid = true;
        input.css("border-color", "black");
      } else {
        cityValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "zip_code") {
      if (inputLength == 6) {
        zipValid = true;
        input.css("border-color", "black");
      } else {
        zipValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "state") {
      if (inputLength >= 4 && inputLength <= 50) {
        stateValid = true;
        input.css("border-color", "black");
      } else {
        stateValid = false;
        input.css("border-color", "red");
      }
    } else if (inputId == "country") {
      if (inputLength >= 4 && inputLength <= 50) {
        countryValid = true;
        input.css("border-color", "black");
      } else {
        countryValid = false;
        input.css("border-color", "red");
      }
    }
  }

  //rozwijanie przypominajki

  $(".clickable-button").click(function () {
    // zamykanie przypominajki
    if (clearTimeoutShow >= 1) {
      $(".clickable-button").css("pointer-events", "none");
      $(".przypominajka-text").fadeOut();
      setTimeout(function () {
        $(".clickable-button").css("pointer-events", "auto");
        $(".przypominajka").toggleClass("show_przypominajka");
        $(".przypominajka-text").toggleClass("show_przypominajka-text");
        $(".arrow-change").css("transform", "rotate(" + 0 + "deg)");
      }, 300);
      if (!phone) {
        setTimeout(function () {
          $(".side-menu").css("width", "200px"); // zmniejszanie side menu
        }, 600);
      }
      clearTimeoutShow = 0;
    } else {
      $(".clickable-button").css("pointer-events", "none"); // otwieranie przypominajki
      // $(".przypominajka").toggleClass("show_przypominajka");
      if (!phone) {
        setTimeout(function () {
          $(".side-menu").css("width", "20vw"); // zwiekszanie side menu
        }, 300);
      }
      setTimeout(function () {
        $(".przypominajka").toggleClass("show_przypominajka");
        $(".clickable-button").css("pointer-events", "auto");
        $(".przypominajka-text").fadeIn();
        $(".przypominajka-text").toggleClass("show_przypominajka-text");
        $(".arrow-change").css("transform", "rotate(" + 180 + "deg)");
        // toggleClass = true;
      }, 600);
      clearTimeoutShow++;
    }
  });

  function checkPrzypomijakaPage() {
    if (przypominajka_page == 1) {
      $(".informacje-o-mnie-przypominajka").show();
      $(".ksiazka-addresowa-przypominajka").hide();
    } else {
      $(".informacje-o-mnie-przypominajka").hide();
      $(".ksiazka-addresowa-przypominajka").show();
    }
  }
  checkPrzypomijakaPage();
  //przewijanie stron przypominajki
  $(".button-next").click(function () {
    console.log("siema");
    if (przypominajka_page < 2) {
      przypominajka_page++;
    }
    console.log(przypominajka_page);
    checkPrzypomijakaPage();
  });
  $(".button-back").click(function () {
    console.log("siema");
    if (przypominajka_page > 1) {
      przypominajka_page--;
    }
    console.log(przypominajka_page);
    checkPrzypomijakaPage();
  });
});
