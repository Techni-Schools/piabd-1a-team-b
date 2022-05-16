$(document).ready(function () {
  var nextButton = document.getElementById("nextButton");
  var pageNumber = 1;

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
});
