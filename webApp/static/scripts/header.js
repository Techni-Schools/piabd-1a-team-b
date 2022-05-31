$(document).ready(function () {
  var phone = window.matchMedia("(max-width: 768px)").matches;
  var animationIndexText = 250;
  var animationIndexBlocks = 350;

  if (phone) {
    $("#profile-button").click(function () {
      document.getElementById("niepowiem").style.display = "none";
      location.href = "/dashboard";
    })
    animationIndexText += 100;
    animationIndexBlocks += 250;
  }
  function chceckTa() {
    window.onscroll = function () {
      if (!phone) {
        if (window.pageYOffset == 0) {
          document.getElementById("header").style.height = "100px";
          document.getElementById("logo").style.height = "75px";
        } else {
          document.getElementById("header").style.height = "80px";
          document.getElementById("logo").style.height = "65px";
        }
      }
      try {
        if (niewiem.x == "header") {
          if (window.pageYOffset > animationIndexText) {
            document.getElementById("news-text").className =
              "news-text start-animation";
            document.getElementById("news-text").style.display = "block";
          }
          if (window.pageYOffset > animationIndexBlocks) {
            document.getElementById("row-1").style.display = "flex";
            document.getElementById("news-1").className =
              "news start-animation";
            $(".fajnie").css("height", "auto");
          }
        }
      } catch (error) { }
    };
  }
  chceckTa();
  window.addEventListener("resize", chceckTa);
});
