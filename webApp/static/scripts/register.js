$(document).ready(function(){


  // ------------------------------------------Zmienne ---------------------------------------------

  var PageNumber = 1;
  var siema = document.getElementById("nextButton");

  //------------------------------------------ Input Values ----------------------------------------

  // ------------ 1 strona ------------
  first_name = $("#first_name");
  last_name = document.getElementById("last_name");
  email = document.getElementById("email");
  date_of_birth = document.getElementById("date_of_birth");
  phone_number = document.getElementById("phone_number");

  // ----------  2 strona -----------

  street = document.getElementById("street");
  city = document.getElementById("city");
  zip_code = document.getElementById("zip_code");
  state = document.getElementById("state");
  country = document.getElementById("country");

  // -----------3 strona ------------

  username = document.getElementById("username");
  password = document.getElementById("password");
  passwordConfirm = document.getElementById("confirm");
  accept_tos = document.getElementById("accept_tos");

  // ----------------------------------------------------------------------------------------------

  //------------------------------------ Strony -----------------------------------

  firstpage = document.getElementById("0-1");
  secondpage = document.getElementById("0-2");
  thirdpage = document.getElementById("0-3");

  // ------------------------------------------------------------------------------ 

  function PageSiema() {
    if (PageNumber == 1 ) {
      firstpage.style.display = "block";
      secondpage.style.display = "none";
      thirdpage.style.display = "none";
      document.getElementById("backButton").style.display = "none"  
    }
    if (PageNumber == 2) {
        firstpage.style.display = "none";
        secondpage.style.display = "block";
        thirdpage.style.display = "none";
        document.getElementById("backButton").style.display = "block"
        document.getElementById("submitButton").style.display = "none"
    }
    if (PageNumber == 3 ) {
      firstpage.style.display = "none";
      secondpage.style.display = "none";
      thirdpage.style.display = "block";
      document.getElementById("submitButton").style.display = "block"
    }
  }

  $('#nextButton').click(function() {

    PageNumber += 1;  

    console.log(PageNumber);
    PageSiema();
  })
  document.getElementById("backButton").onclick = () => {
    if (PageNumber > 1 ) {
      PageNumber -= 1;
      PageSiema();
    } 
    else {
      PageNumber = PageNumber;
    }
  }
});

