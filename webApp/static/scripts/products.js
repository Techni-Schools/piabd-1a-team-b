$(document).ready(function () {
  var open = false;

  $(".clickable-button").click(function () {
    $(".clickable-button").css("pointer-events", "none");
    setTimeout(function () {
      $(".clickable-button").css("pointer-events", "auto");
    }, 250);
    if (!open) {
      setTimeout(function () {
        $(".product-discription-text").css("visibility", "visible");
        $(".product-discription-text").css("opacity", "1");
      }, 250);
      $(".product-discription").css("height", "300px");
      open = true;
    } else {
      $(".product-discription-text").css("visibility", "hidden");
      $(".product-discription-text").css("opacity", "0");
      $(".product-discription").css("height", "50px");
      open = false;
    }
  });
});
