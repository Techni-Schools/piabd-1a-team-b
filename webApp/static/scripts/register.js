$(document).ready(function () {
  var pageNumber = 1;
  var validPoints = 0;
  //   first  page valid variables

  var data;

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

  var jd = 0;
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
      } else if (pageNumber == 3) {
        $("#register-form").submit();
      }
      // console.log(pageNumber);
    }
    // console.log(pageNumber);
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
    if ($(niewiem).attr("id") == "first_name" || $(niewiem).attr("id") == "last_name") {
      data = "Błąd przy " + $(niewiem).attr("aria-label") + "Input musi zawierac 4 znaki ale nie wykraczac poza 50 "
    }
    // if ($(niewiem).attr("id") == )
    lista.push(data)
    lista = lista.filter(onlyUnique);
    console.log(lista)
    let i;
    $('.errors').empty();
    for (i = 0; i < lista.length; i++) {
      $('.errors').append(lista[i])
    }
  }
  function clearError(niewiem) {
    var indesList = lista.indexOf(data)
    lista.splice(indesList, 1)
    console.log(lista)
    $('.errors').empty();
    for (i = 0; i < lista.length; i++) {
      $('.errors').append(lista[i])
    }
  }

  function checkErrors() {
    var siema;
    for (var x = 0; x < errorsList.length; x++) {
      siema = errorsList[x]
      // console.log(siema)
      if (!$('.errors').html().includes(siema)) {
        $(".errors").append(siema)
      }
    }
  }
  function checkLengthFirstPage(inputField) {
    var input = $(inputField);
    if (input.attr("id") == "first_name") {
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        firstValid = true;
        clearError(inputField)
        checkErrors();
      } else {
        showError(inputField)
        checkErrors()
        firstValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "last_name") {
      if (input.val().length >= 2) {
        input.css("border-color", "green");
        lastnameValid = true;
        clearError(inputField)
        checkErrors()
      } else {
        showError(inputField)
        checkErrors()
        lastnameValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "email") {
      if (
        input.val().length >= 6 &&
        input.val().includes("@") &&
        input.val().includes(".")
      ) {
        clearError(inputField)
        input.css("border-color", "green");
        emailValid = true;
      } else {
        showError(inputField)
        emailValid = false;
        input.css("border-color", "red");
      }
    } else if (input.attr("id") == "phone_number") {
      if (input.val().length == 9) {
        input.css("border-color", "green");
        phoneValid = true;
        clearError(inputField)
      } else {
        showError(inputField)
        phoneValid = false;
        input.css("border-color", "red");
      }
    }
    if (input.val().length == 0) {

      input.css("border-color", "black");
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
    if (input.val().length == 0) {
      input.css("border-color", "black");
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
});
