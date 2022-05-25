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

function updateResult(data) {
    // $.ajax({
    //     method: 'post',
    //     url: '/listing',
    //     data: {}
    // });
    
    for (let index in data) {
        console.log(index, data[index]);
    }
}

let data;
let url;
let data1;
let data2;
let isData = false;
$(document).ready(function() {
    let defaultData = parseURLParams(window.location.href);
    try {
        Object.keys(defaultData).length;
    }
    catch {
        window.history.pushState("", "", '/search?page=1');
    }
    $.ajax({
        method: "post",
        url: "/listing",
        data: { text: '' , page: 1 , o: ''},
        success: function (res) {
          var data = "<div>";
          $.each(res, function (index, value) {
            data += `${value.name}<br>`;
          });
          data += "</div>";
          $('.result').html(data);
        },
      });  
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
      $('#orderby').bind('keyup', function(e) {
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
            if ($(this).val() === '') {
            url = `/search?${url.substring(0, url.length-1)}`;
            } else {
                url = `/search?${url.substring(0, url.length-1)}&o=${$(this).val()}`;
            }
            window.history.pushState("", "", url);
        }
        updateResult(parseURLParams(window.location.href));
      });
})