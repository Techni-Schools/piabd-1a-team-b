$(".tak").prop("disabled", true)
$(".tak").css("pointer-events", "none")
// $(".nie").
var cosie = 0
$(document).ready(function () {
  console.log("siema");
  $(".tak").click(function () { //about information
    setTimeout(function () {
      $(".about-information").show()
      $(".addres-book").hide();
      $(".tak").css("pointer-events", "none")
      $(".nie").css("pointer-events", "auto")
    }, 500)
    // $(".about-information").show();
    $(".addres-book").toggleClass("siema2")
    $(".about-information").toggleClass("siema")
    // $(".addres-book").hide();
    $(this).prop("disabled", true)
    $(".nie").prop("disabled", false)
    cosie += 1
  });
  $(".nie").click(function () { // button  addres book
    setTimeout(function () {
      $(".about-information").hide()
      $(".addres-book").show();
      $(".tak").css("pointer-events", "auto")
      $(".nie").css("pointer-events", "none")
    }, 500)
    if (cosie >= 1) {
      $(".addres-book").toggleClass("siema2")
    }
    $(".about-information").toggleClass("siema")
    $(".addres-book").addClass("addres-book")
    // $(".addres-book").toggleClass("siema2")
    // $(".addres-book").show();
    $(this).prop("disabled", true)
    $(".tak").prop("disabled", false)
  });

  function startFieldProfile() {
    var Array = $("dd").children(".niewiem");
    console.log(Array.length);
    for (var x = 0; x < Array.length; x++) {
      var idOfInput = $("dd").children(".niewiem")[x].id;
      var newId = idOfInput + "-field";
      document.getElementById(newId).innerHTML =
        $("dd").children(".niewiem")[x].value;
      console.log(newId)
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
});
