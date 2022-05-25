$(document).ready(function () {
  console.log("siema");
  $(".tak").click(function () {
    $(".about-information").show();
    $(".addres-book").hide();
  });
  $(".nie").click(function () {
    $(".about-information").hide();
    $(".addres-book").show();
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
