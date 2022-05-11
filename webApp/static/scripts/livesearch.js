$(document).ready(function () {
    $("#livebox").on("input", function (e) {
      $("#datalist").empty();
      $.ajax({
        method: "post",
        url: "/livesearch",
        data: { text: $("#livebox").val() },
        success: function (res) {
          var data = "<div class='list-group'>";
          $.each(res, function (index, value) {
            data +=
              "<p class='list-group-item list-group-item-action'><a href=" +
              "'/profile/" +
              value.user +
              "?product=" +
              value.name +
              "'" +
              ">" +
              value.name +
              "</a></p>";
          });
          data += "</div>";
          $("#datalist").html(data);
        },
      });
    });
    $("#livebox").on("click", function (event) {
      $("#datalist").empty();
      $.ajax({
        method: "post",
        url: "/livesearch",
        data: { text: $("#livebox").val() },
        success: function (res) {
          var data = "<div class='list-group'>";
          $.each(res, function (index, value) {
            data +=
              "<p class='list-group-item list-group-item-action'><a href=" +
              "'/profile/" +
              value.user +
              "?product=" +
              value.name +
              "'" +
              ">" +
              value.name +
              "</a></p>";
          });
          data += "</div>";
          $("#datalist").html(data);
        },
      });
    });
    $(document).on("click", function (event) {
      if (!$(event.target).closest("#search").length) {
        $("#datalist").empty();
      }
    });
  });