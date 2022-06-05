var data;
var timeout;
$(".0-1").mouseenter(function () {
  $(".br-0-1").css("width", "70px");
});
$(".0-1").mouseleave(function () {
  $(".br-0-1").css("width", "30px");
});
$(".0-2").mouseenter(function () {
  $(".br-0-2").css("width", "70px");
});
$(".0-2").mouseleave(function () {
  $(".br-0-2").css("width", "30px");
});
$(".0-3").mouseenter(function () {
  $(".br-0-3").css("width", "70px");
});
$(".0-3").mouseleave(function () {
  $(".br-0-3").css("width", "30px");
});

setTimeout(function () {
  $(".containder-main").css("display", "flex");
}, 600);

$(".add-button").mouseenter(function () {
  console.log("najechane");
  data = "<h4 class='yes'>Dodaj Produkt</h4>";
  timeout = setTimeout(function () {
    console.log("najechane po 500");
    $(".add-button").append(data);
  }, 325);
});
$(".add-button").mouseout(function () {
  clearTimeout(timeout);
  $(".add-button").children().remove(".yes");
});
// $(".fa-cart-plus").mouseout(function () {
//   // clearTimeout(timeout)
//   $(".add-button").children().remove(".yes")
// })
$(".copy").click(function () {
  text = $(this)["context"].innerText;
  console.log(text);
  navigator.clipboard.writeText(text);
});
