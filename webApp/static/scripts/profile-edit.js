$(document).ready(function () {
    console.log("siema")
    $(".tak").click(function () {
        $(".about-information").show()
        $(".addres-book").hide()
    })
    $(".nie").click(function () {
        $(".about-information").hide()
        $(".addres-book").show()
    })

    function fieldProfile(inputDate) {
        var clickedInput = $(inputDate).attr("id")
        console.log(clickedInput)
        console.log($(inputDate))
        var id = clickedInput + "-field"
        console.log("nowe id: ", id)
        console.log("znaeziono id: ", document.getElementById(id))
        document.getElementById(id).innerHTML = $(inputDate).val()
    }

    $(".niewiem").keyup(function () {
        fieldProfile(this)
    })
});

