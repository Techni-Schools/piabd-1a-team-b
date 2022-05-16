function chceckTa() {
  if (window.matchMedia("(max-width: 700px)").matches) {
  console.log("ta?");
  }
  else {
    window.onscroll = function () {
      if (niewiem.x == "header") {
            if (window.pageYOffset > 250) {
              document.getElementById("row-1").style.display = "flex";
              document.getElementById("news-text").className = "news start-animation";
            }
          }
      if (window.pageYOffset < 50) {
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("header").style.height = "100px";
        document.getElementById("logo").style.height = "75px";
      }
      if (window.pageYOffset > 0) {
        document.getElementById("header").style.backgroundColor = "grey";
        document.getElementById("header").style.height = "50px";
        document.getElementById("logo").style.height = "45px";
      }
    };
  }
}
window.addEventListener("resize", chceckTa());
