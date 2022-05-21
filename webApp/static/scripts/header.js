function chceckTa() {
  var phone = window.matchMedia("(max-width: 768px)").matches;
  var animationIndexText = 250;
  var animationIndexBlocks = 350;

  if (phone) {
    animationIndexText += 100;
    animationIndexBlocks += 250;
    document.getElementById("profile-button").onclick = () => {
      document.getElementById("niepowiem").style.display = "none";
      window.location.href = "dashboard";
    };
  }
  window.onscroll = function () {
    if (!phone) {
      if (window.pageYOffset <= 10) {
        document.getElementById("header").style.height = "auto";
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
          document.getElementById("news-1").className = "news start-animation";
        }
      }
    } catch (error) {}
  };
}
window.addEventListener("resize", chceckTa());
