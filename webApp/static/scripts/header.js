function chceckTa() {
  if (window.matchMedia("(max-width: 768px)").matches) {
  
    document.getElementById("profile-button").onclick = () => {
      document.getElementById("niepowiem").style.display = "none";
      window.location.href = "www.google.com";
    }
  }
  window.onscroll = function () {
      if (!window.matchMedia("(max-width: 768px)").matches) {
        if (window.pageYOffset <= 10) {
          document.getElementById("header").style.backgroundColor = "white";
          document.getElementById("header").style.height = "auto";
          document.getElementById("logo").style.height = "75px";
        }
        else {
          document.getElementById("header").style.height = "80px";
          document.getElementById("logo").style.height = "65px";
        }
      }
      try {
        if (niewiem.x == "header") { 
          if (window.pageYOffset > 250) {
            document.getElementById("news-text").className = "news-text start-animation"
            document.getElementById("news-text").style.display = "block"            
          } 
          if (window.pageYOffset > 350) {
            document.getElementById("row-1").style.display = "flex";
            document.getElementById("news-1").className = "news start-animation";
          }
        }
      } catch (error) {
      }
    };
}
window.addEventListener("resize", chceckTa());
