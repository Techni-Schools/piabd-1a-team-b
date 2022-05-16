function chceckTa() {
  window.onscroll = function () {
      if (!window.matchMedia("(max-width: 768px)").matches) {
        if (window.pageYOffset < 10) {
          document.getElementById("header").style.backgroundColor = "white";
          document.getElementById("header").style.height = "100px";
          document.getElementById("logo").style.height = "75px";
        }
        if (window.pageYOffset > 0) {
          document.getElementById("header").style.backgroundColor = "grey";
          document.getElementById("header").style.height = "80px";
          document.getElementById("logo").style.height = "75px";
        }
      }
      try {
        if (niewiem.x == "header") { // podstrona "index.html"
          if (window.pageYOffset > 350) {
            document.getElementById("news-text").className = "news-text start-animation"
            document.getElementById("news-text").style.display = "block"            
          } 
          if (window.pageYOffset > 550) {
            document.getElementById("row-1").style.display = "flex";
            document.getElementById("news-1").className = "news start-animation";
          }
        }
      } catch (error) {
      }
    };
}
window.addEventListener("resize", chceckTa());
