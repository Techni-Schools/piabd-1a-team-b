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
          data += `<a class='aa' href='/product?id=${value.id}'>
            <p class='list-group-item list-group-item-action'>${value.name}</p></a>`;
        });
        data += "</div>";
        $("#datalist").html(data);
      },
    });
  });
  $("#livebox").on("click", function (event) {
    $("#livebox").css("pointer-events", "none");
    setTimeout(function () {
      $("#livebox").css("pointer-events", "auto");
    }, 500);
    $("#datalist").empty();
    $.ajax({
      method: "post",
      url: "/livesearch",
      data: { text: $("#livebox").val() },
      success: function (res) {
        var data = "<div class='list-group'>";
        $.each(res, function (index, value) {
          data += `<a class='aa' href='/product?id=${value.id}'>
            <p class='list-group-item list-group-item-action'>${value.name}</p></a>`;
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
