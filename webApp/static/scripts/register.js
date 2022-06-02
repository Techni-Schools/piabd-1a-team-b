$(document).ready(function () {
  $(".submitBtn").prop("disabled", true);
  var pageNumber = 1;
  //   first  page valid variables

  var data;
  var errorType;
  var firstValid = false;
  var lastnameValid = false;
  var emailValid = false;
  var phoneValid = false;
  var dateValid = false;
  // second page valid variables

  var streetValid = false;
  var cityValid = false;
  var zipValid = false;
  var stateValid = false;
  var countryValid = false;
  var fajnie;
  var jd;
  var current_year;
  var current_month;
  var current_day;
  // -------------------------------------------- texty do stron w formularzu rejestracji ------------------------------------------- //

  const mini_text_1_page =
    "Witamy cie w 3 krokowej rejestracjim w tym kroku będziemy potrzebowac od ciebie: <b>Imienia</b>,<b>Nazwiska</b> <b>E-maila</b>, <b>daty urodzenia</b> i <b>Numeru Telefonu</b>";
  const mini_text_2_page =
    "Super!, teraz mamy krok 2, tutaj bedziemy potrzebowac danych na temat twojego adresu zamieszkania!";
  const mini_text_3_page =
    "No i mamy ostatni krok naszej rejestracji, teraz będziemy potrzebowac nazwy twojego konta i hasła";

  // --------------------------------------------------------------------------------------------------------------------------------- //

  function checkPage() {
    if (pageNumber == 1) {
      $("#0-1").show();
      $("#0-2").hide();
      $("#0-3").hide();
      $("#backButton").hide();
      $(".register-step-text-mini").html(mini_text_1_page);
      $(".ball1").css("background-color", "grey");
      $(".ball2").css("background-color", "grey");
      $(".ball3").css("background-color", "grey");
    } else if (pageNumber == 2) {
      $("#0-1").hide();
      $("#0-2").show();
      $("#0-3").hide();
      $("#backButton").show();
      $(".register-step-text-mini").html(mini_text_2_page);
      $(".ball1").css("background-color", "#64dd17");
      $(".ball2").css("background-color", "grey");
      $(".ball3").css("background-color", "grey");
    } else if (pageNumber == 3) {
      $("#0-1").hide();
      $("#0-2").hide();
      $("#0-3").show();
      $(".register-step-text-mini").html(mini_text_3_page);
      $(".ball1").css("background-color", "#64dd17");
      $(".ball2").css("background-color", "#64dd17");
      $(".ball3").css("background-color", "grey");
    }
  }

  function pageNext() {
    if (pageNumber <= 5) {
      if (pageNumber == 1) {
        if (
          firstValid == true &&
          lastnameValid == true &&
          emailValid == true &&
          phoneValid == true &&
          dateValid == true
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
          countryValid == true
        ) {
          pageNumber += 1;
        }
        // } else if (pageNumber == 3) {
        //   setTimeout(function () {
        //     $("#register-form").submit();
        //   }, 1500)
      }
    }
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

  let lista = [];

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function showError(niewiem) {
    dataCheck(niewiem);
    lista.push(data);
    lista = lista.filter(onlyUnique);
    let i;
    $(".errors").empty();
    console.log("Lista po dodaniu", lista);
    for (i = 0; i < lista.length; i++) {
      $(".errors").append(lista[i]);
    }
  }

  function dataCheck(inputName) {
    if (
      $(inputName).attr("id") == "first_name" ||
      $(inputName).attr("id") == "last_name"
    ) {
      data =
        "<div class='siema red-div'>" +
        "<i class='fa-solid fa-circle-xmark'></i>" +
        "<h4>" +
        "Błąd przy " +
        $(inputName).attr("aria-label") +
        " Input musi zawierac 2 znaki ale nie wykraczac poza 50" +
        "</h4>" +
        "</div>" +
        "<br>";
    } else if ($(inputName).attr("id") == "email") {
      if (errorType == "is") {
        if (!fajnie) {
          clearError(this);
        }
        fajnie = true;
        data =
          "<div class='siema yellow-div'>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " taki " +
          $(inputName).attr("aria-label") +
          " instnieje " +
          "</h4>" +
          "</div>" +
          "<br>";
      } else if (errorType == "none") {
        if (fajnie) {
          clearError(this);
        }
        fajnie = false;
        data =
          "<div class='siema red-div'>" +
          "<i class='fa-solid fa-circle-xmark'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " Input musi zawierac 5 znaki ale nie wykraczac poza 50, nie moze zawierac spacji!" +
          "</h4>" +
          "</div>" +
          "<br>";
      }
    } else if ($(inputName).attr("id") == "phone_number") {
      if (errorType == "is") {
        if (!fajnie) {
          clearError(this);
        }
        fajnie = true;
        data =
          "<div class='siema yellow-div'>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " taki " +
          $(inputName).attr("aria-label") +
          " instnieje " +
          "</h4>" +
          "</div>" +
          "<br>";
      } else if (errorType == "none") {
        if (fajnie) {
          clearError(this);
        }
        fajnie = false;
        data =
          "<div class='siema red-div'>" +
          "<i class='fa-solid fa-circle-xmark'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " Input musi zawierac 5 znaki ale nie wykraczac poza 50, nie moze zawierac spacji!" +
          "</h4>" +
          "</div>" +
          "<br>";
      }
    } else if (
      $(inputName).attr("id") == "city" ||
      $(inputName).attr("id") == "state" ||
      $(inputName).attr("id") == "zip_code" ||
      $(inputName).attr("id") == "country" ||
      $(inputName).attr("id") == "street"
    ) {
      data =
        "<div class='siema red-div'>" +
        "<i class='fa-solid fa-circle-xmark'></i>" +
        "<h4>" +
        "Błąd przy " +
        $(inputName).attr("aria-label") +
        " Input musi zawierac 4 znaki ale nie wykraczac poza 10 znaków" +
        "</h4>" +
        "</div>" +
        "<br>";
    } else if ($(inputName).attr("id") == "date_of_birth") {
      data =
        "<div class='siema red-div'>" +
        "<i class='fa-solid fa-circle-xmark'></i>" +
        "<h4>" +
        "Błąd przy " +
        $(inputName).attr("aria-label") +
        " Oj byczku 18 latek trzeba miec" +
        "</h4>" +
        "</div>" +
        "<br>";
    }
  }

  function clearError(niewiem) {
    dataCheck(niewiem);
    var indesList = lista.indexOf(data);
    if (indesList > -1) {
      lista.splice(indesList, 1);
      console.log("po usunieciu ");
      $(".errors").empty();
      for (i = 0; i < lista.length; i++) {
        console.log(lista[i]);
        $(".errors").append(lista[i]);
      }
    }
  }
  function isOverEighteen(year, month, day) {
    var now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ""));
    var dob = year * 10000 + month * 100 + day * 1; // Coerces strings to integers

    return now - dob > 180000;
  }
  function checkLengthFirstPage(inputField) {
    var input = $(inputField);

    if (input.attr("id") == "first_name") {
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        firstValid = true;
        clearError(inputField);
      } else {
        showError(inputField);
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        lastnameValid = true;
        clearError(inputField);
      } else {
        showError(inputField);
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
        clearError(inputField);
        // input.css("border-color", "green");
        $.ajax({
          method: "post",
          url: "/email_validity_checks",
          data: { email: input.val() },
          success: function (res) {
            if (res == "Email is already taken") {
              //jesli sie nie udało
              errorType = "is";
              console.log("nie");
              showError(inputField);
              emailValid = false;
              input.css("border-color", "yellow");
            } else {
              // clearError(inputField);
              errorType = "none";
              input.css("border-color", "green");
              clearError(inputField);
              emailValid = true;
            }
          },
        });
      } else {
        if (errorType == "is") {
          clearError(inputField);
        }
        errorType = "none";
        showError(inputField);
        emailValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "phone_number") {
      if (input.val().length == 12) {
        clearError(inputField);
        // input.css("border-color", "green");
        $.ajax({
          method: "post",
          url: "/phone_validity_checks",
          data: { phone: input.val() },
          success: function (res) {
            if (res == "Phone number is invalid or already taken") {
              //jesli sie nie udało
              errorType = "is";
              // data = "niewiem"
              console.log("nie");
              showError(inputField);
              phoneValid = false;
              input.css("border-color", "yellow");
            } else {
              // clearError(inputField);
              errorType = "none";
              console.log("niewiem");
              input.css("border-color", "green");
              clearError(inputField);
              phoneValid = true;
            }
          },
        });
      } else {
        if (errorType == "is") {
          clearError(inputField);
        }
        errorType = "none";
        showError(inputField);
        phoneValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "date_of_birth") {
      jd = $(input).val().split("-");
      current_year = jd[0];
      current_month = jd[1];
      current_day = jd[2];
      current_date = new Date(current_year, current_month, current_day);
      current_date_minus_18 = new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
      );
      console.log(current_date.getTime() - current_date_minus_18.getTime());
      if (isOverEighteen(current_year, current_month, current_day)) {
        input.css("border-color", "green");
        dateValid = true;
        clearError(inputField);
      } else {
        showError(inputField);
        dateValid = false;
        input.css("border-color", "red");
      }
    }
  }

  function checkLengthSecondPage(inputField) {
    var input = $(inputField);
    var inputId = $(inputField).attr("id");
    var inputLength = $(inputField).val().length;
    if (inputLength >= 1) {
      if ($(inputField).attr("id") == "street") {
        if (inputLength >= 5 && inputLength <= 50) {
          input.css("border-color", "green");
          streetValid = true;
          clearError(inputField);
        } else {
          showError(inputField);
          input.css("border-color", "red");
          streetValid = false;
        }
      } else if (inputId == "city") {
        if (inputLength >= 4 && inputLength <= 50) {
          input.css("border-color", "green");
          cityValid = true;
          clearError(inputField);
        } else {
          showError(inputField);
          cityValid = false;
          input.css("border-color", "red");
        }
      } else if (inputId == "zip_code") {
        if (inputLength == 6) {
          input.css("border-color", "green");
          zipValid = true;
          clearError(inputField);
        } else {
          showError(inputField);
          zipValid = false;
          input.css("border-color", "red");
        }
      } else if (inputId == "state") {
        if (inputLength >= 4 && inputLength <= 50) {
          input.css("border-color", "green");
          stateValid = true;
          clearError(inputField);
        } else {
          showError(inputField);
          stateValid = false;
          input.css("border-color", "red");
        }
      } else if (inputId == "country") {
        if (inputLength >= 4 && inputLength <= 50) {
          input.css("border-color", "green");
          countryValid = true;
          clearError(inputField);
        } else {
          showError(inputField);
          countryValid = false;
          input.css("border-color", "red");
        }
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

  // ------------------------------ LOGIN BUTTON DISABLED ------------------------------- //

  function buttonDisabled() {
    if (
      $(".login-username-input").val().length >= 4 &&
      $(".login-password-input").val().length >= 8
    ) {
      $(".submitBtn").prop("disabled", false);
      console.log("siema");
    } else {
      // if (animationButtonCount = 0) {
      //   $(".submitBtn").toggleClass("button-login-animation")
      // }
      console.log("nie");
      // console.log($(".logi").val().length)
      $(".submitBtn").prop("disabled", true);
    }
  }
  setTimeout(function () {
    $(".login-username-input").focus();
  }, 300);
  buttonDisabled();
  $(".login-username-input").on("input", function () {
    buttonDisabled();
  });
  $(".login-password-input").on("input", function () {
    buttonDisabled();
  });
});
