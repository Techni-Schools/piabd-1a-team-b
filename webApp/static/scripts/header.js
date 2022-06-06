$(document).ready(function () {
  window.setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
  $(function () {
    $(this).scrollTop(0);
  });
  window.scrollTo(0, 0);
  window.scroll(0, 0);
  var phone = window.matchMedia("(max-width: 768px)").matches;
  var animationIndexText = 250;
  var animationIndexBlocks = 450;
  var animationIndexText2 = 700;
  var animationIndexBlocks2 = 950;

  if (phone) {
    $("#profile-button").click(function () {
      document.getElementById("niepowiem").style.display = "none";
      location.href = "/dashboard";
    });
    animationIndexText2 += 500;
    animationIndexBlocks2 += 650;
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
          if (window.pageYOffset > animationIndexText2) {
            document.getElementById("news-text").className =
              "news-text start-animation";
            document.getElementById("news-text").style.display = "block";
          }
          if (window.pageYOffset > animationIndexBlocks2) {
            document.getElementById("row-1").style.display = "flex";
            document.getElementById("news-1").className =
              "news start-animation";
            $(".fajnie").css("height", "auto");
          }
          if (window.pageYOffset > animationIndexText) {
            document.getElementById("welcome-text").className =
              "welcome-text start-animation";
            document.getElementById("welcome-text").style.display = "block";
          }
          if (window.pageYOffset > animationIndexBlocks) {
            document.getElementById("welcone").style.display = "flex";
            document.getElementById("welcone").className =
              "welcone start-animation";
            // $(".welcone").css("height", "auto");
          }
        }
      } catch (error) {}
    };
  }
  chceckTa();
  window.addEventListener("resize", chceckTa);
});
