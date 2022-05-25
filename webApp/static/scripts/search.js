function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

let data;
let url;
let data1;
let data2;
let isData = false;

function updateResult(data) {
    if (typeof data.o == 'undefined') {data.o = ['']};
    if (typeof data.string == 'undefined' || data.string[0] == '') {data.string = ['ale_czemu_tak_robisz_:(']};
    if (typeof data.page == 'undefined') {data.page = ['1']};
    $.ajax({
        method: 'post',
        url: '/listing',
        data: {'page': data.page[0], 'text': data.string[0], 'o': data.o[0]},
        success: function (res) {
            data = `<div>`;
            $.each(res, function (index, value) {
                data += `${value.price}<br>`;
              });
              data += "</div>";
              $('.result').html(data);
        },
    });
    
    // $.ajax({
    //     method: "post",
    //     url: "/livesearch",
    //     data: { text: $("#livebox").val() },
    //     success: function (res) {
    //       var data = "<div class='list-group'>";
    //       $.each(res, function (index, value) {
    //         data += `<a class='aa' href='/profile/${value.user}?product=${value.id}'>
    //           <p class='list-group-item list-group-item-action'>${value.name}</p></a>`;
    //       });
    //       data += "</div>";
    //       $("#datalist").html(data);
    //     },
    //   });

}


$(document).ready(function() {
    let defaultData = parseURLParams(window.location.href);
    try {
        Object.keys(defaultData).length;
        url = '';
        isData = false;
        for (let index in defaultData) {
            if (!isData && index == 'page') {
                isData = true;
            }
            url += `${index}=${defaultData[index]}&`;
        };
        if (isData) {
            url = `/search?${url.substring(0, url.length-1)}`; // substring url.length-1 because of & at the end of string in for
        } else {
            url = `/search?page=1&${url.substring(0, url.length-1)}`
        }
        window.history.pushState("", "", url);
        updateResult(parseURLParams(window.location.href));
    }
    catch {
    }
  
      $('#orderby').change(function() {
        isData = false;
        url = '';
        data = parseURLParams(window.location.href);
        for (let index in data) {
            if (index == 'o') {
                isData = true;
                if ($(this).val() !== '') {
                    url += `${index}=${$(this).val()}&`;
                }
            } else {
                url += `${index}=${data[index]}&`;
            }
        };
        if (isData) {
            url = `/search?${url.substring(0, url.length-1)}`;
            window.history.pushState("", "", url);
        } else {
            url = `/search?${url.substring(0, url.length-1)}&o=${$(this).val()}`;
            window.history.pushState("", "", url);
        }
        updateResult(parseURLParams(window.location.href));
      });
    //   $('#orderby').bind('keyup', function(e) {
    //     isData = false;
    //     url = '';
    //     data = parseURLParams(window.location.href);
    //     for (let index in data) {
    //         if (index == 'o') {
    //             isData = true;
    //             if ($(this).val() !== '') {
    //                 url += `${index}=${$(this).val()}&`;
    //             }
    //         } else {
    //             url += `${index}=${data[index]}&`;
    //         }
    //     };
    //     if (isData) {
    //         url = `/search?${url.substring(0, url.length-1)}`;
    //         window.history.pushState("", "", url);
    //     } else {
    //         if ($(this).val() === '') {
    //         url = `/search?${url.substring(0, url.length-1)}`;
    //         } else {
    //             url = `/search?${url.substring(0, url.length-1)}&o=${$(this).val()}`;
    //         }
    //         window.history.pushState("", "", url);
    //     }
    //     updateResult(parseURLParams(window.location.href));
    //   });
})