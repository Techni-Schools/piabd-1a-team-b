$(document).ready(function () {
  $(".submitBtn").prop("disabled", true)
  var pageNumber = 1;
  var validPoints = 0;
  //   first  page valid variables

  var data;
  var errorType;
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
  var fajnie;
  var animationButtonCount;

  const mini_text_1_page = "Witamy cie w 3 krokowej rejestracjim w tym kroku będziemy potrzebowac od ciebie: <b>Imienia</b>,<b>Nazwiska</b> <b>E-maila</b>, <b>daty urodzenia</b> i <b>Numeru Telefonu</b>"
  const mini_text_2_page = "Super!, teraz mamy krok 2, tutaj bedziemy potrzebowac danych na temat twojego adresu zamieszkania!"
  const mini_text_3_page = "No i mamy ostatni krok naszej rejestracji, teraz będziemy potrzebowac nazwy twojego konta i hasła"
  var jd = 0;


  // -------------------------------------------- Data do errorów ------------------------------------------- // 




  function checkPage() {
    if (pageNumber == 1) {
      $("#0-1").show();
      $("#0-2").hide();
      $("#0-3").hide();
      $("#backButton").hide();
      $(".register-step-text-mini").html(mini_text_1_page)
      $(".ball1").css("background-color", "grey")
      $(".ball2").css("background-color", "grey")
      $(".ball3").css("background-color", "grey")
    } else if (pageNumber == 2) {
      $("#0-1").hide();
      $("#0-2").show();
      $("#0-3").hide();
      $("#backButton").show();
      $(".register-step-text-mini").html(mini_text_2_page)
      $(".ball1").css("background-color", "#64dd17")
      $(".ball2").css("background-color", "grey")
      $(".ball3").css("background-color", "grey")
    } else if (pageNumber == 3) {
      $("#0-1").hide();
      $("#0-2").hide();
      $("#0-3").show();
      $(".register-step-text-mini").html(mini_text_3_page)
      $(".ball1").css("background-color", "#64dd17")
      $(".ball2").css("background-color", "#64dd17")
      $(".ball3").css("background-color", "grey")
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
          countryValid == true
        ) {
          pageNumber += 1;
        }
      } else if (pageNumber == 3) {
        setTimeout(function () {
          $("#register-form").submit();
        }, 1500)

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
  const errorsList = [];

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function showError(niewiem) {
    dataCheck(niewiem)
    lista.push(data);
    lista = lista.filter(onlyUnique);
    let i;
    $(".errors").empty();
    console.log("Lista po dodaniu", lista)
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
          clearError(this)
        }
        fajnie = true
        data =
          "<div class='siema yellow-div'>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " taki " + $(inputName).attr("aria-label") + " instnieje " +
          "</h4>" +
          "</div>" +
          "<br>";
      }
      else if (errorType == "none") {
        if (fajnie) {
          clearError(this)
        }
        fajnie = false
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
    }
    else if ($(inputName).attr("id") == "phone_number") {
      if (errorType == "is") {
        if (!fajnie) {
          clearError(this)
        }
        fajnie = true
        data =
          "<div class='siema yellow-div'>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "<h4>" +
          "Błąd przy " +
          $(inputName).attr("aria-label") +
          " taki " + $(inputName).attr("aria-label") + " instnieje " +
          "</h4>" +
          "</div>" +
          "<br>";
      }
      else if (errorType == "none") {
        if (fajnie) {
          clearError(this)
        }
        fajnie = false
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
    }
    else if (
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
    }
  }


  function clearError(niewiem) {
    dataCheck(niewiem)
    var indesList = lista.indexOf(data);
    if (indesList > -1) {
      lista.splice(indesList, 1);
      console.log("po usunieciu ")
      $(".errors").empty();
      for (i = 0; i < lista.length; i++) {
        console.log(lista[i])
        $(".errors").append(lista[i]);
      }
    }
  }

  function checkLengthFirstPage(inputField) {
    var input = $(inputField);
    if (input.val().length >= 1) {
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
            method: "get",
            url: "/profile/check",
            data: { email: input.val() },
            success: function (res) {
              if (res == "true") { //jesli sie nie udało
                errorType = "is"
                console.log("nie")
                showError(inputField);
                emailValid = false;
                input.css("border-color", "yellow");
              }
              else if (res == "false") {
                // clearError(inputField);
                errorType = "none"
                input.css("border-color", "green")
                clearError(inputField);
                emailValid = true;
              }
            }
          })
        } else {
          if (errorType == "is") {
            clearError(inputField);
          }
          errorType = "none"
          showError(inputField);
          emailValid = false;
          input.css("border-color", "red");
        }
      } else if (input.attr("id") == "phone_number") {
        if (input.val().length == 12) {
          clearError(inputField);
          // input.css("border-color", "green");
          $.ajax({
            method: "get",
            url: "/profile/check",
            data: { phone: input.val() },
            success: function (res) {
              if (res == "true") { //jesli sie nie udało
                errorType = "is"
                // data = "niewiem"
                console.log("nie")
                showError(inputField);
                phoneValid = false;
                input.css("border-color", "yellow");
              }
              else if (res == "false") {
                // clearError(inputField);
                errorType = "none"
                console.log("niewiem")
                input.css("border-color", "green")
                clearError(inputField);
                phoneValid = true;
              }
            }
          })
        } else {
          if (errorType == "is") {
            clearError(inputField);
          }
          errorType = "none"
          showError(inputField);
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
    if ($(".login-username-input").val().length >= 4 && $(".login-password-input").val().length >= 8) {
      $(".submitBtn").prop("disabled", false)
      console.log("siema")
    }
    else {
      // if (animationButtonCount = 0) {
      //   $(".submitBtn").toggleClass("button-login-animation")
      // }
      console.log("nie")
      // console.log($(".logi").val().length)
      $(".submitBtn").prop("disabled", true)
    }
  }
  setTimeout(function () {
    $(".login-username-input").focus()
  }, 300)
  buttonDisabled()
  $(".login-username-input").on('input', function () {
    buttonDisabled()
  })
  $(".login-password-input").on('input', function () {
    buttonDisabled()
  })
});
