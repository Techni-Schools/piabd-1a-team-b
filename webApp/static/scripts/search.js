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
let total = 0;

function updateResult(data) {
    if (typeof data.o == 'undefined') {data.o = ['']};
    if (typeof data.string == 'undefined') {data.string = [0xFFFFFFFFFFFF]};
    if (typeof data.page == 'undefined') {data.page = ['1']};
    $.ajax({
        method: 'post',
        url: '/listing',
        data: {'page': data.page[0], 'text': data.string[0], 'o': data.o[0]},
        success: function (res) {
            data = `<div>`;
            $.each(res, function (index, value) {
                data += `${value.name} ${value.price}<br>`;
                total = value.count;
              });
              data += "</div>";
              $('.result').html(data);
        },
    });
}

let curpage = 1;



$(document).ready(function() {
    let defaultData = parseURLParams(window.location.href);
    try {
        Object.keys(defaultData).length;
        url = '';
        isData = false;
        for (let index in defaultData) {
            if (!isData && index == 'page') {
                isData = true;
                curpage = defaultData[index];
            }
            url += `${index}=${defaultData[index]}&`;
        };
        if (isData) {
            url = `/search?${url.substring(0, url.length-1)}`; // substring url.length-1 because of & at the end of string in for
        } else {
            url = `/search?page=${curpage}&${url.substring(0, url.length-1)}`
        }
        window.history.pushState("", "", url);
        updateResult(parseURLParams(window.location.href));
        changeButtons();

    }
    catch {
    }
  

    function changeButtons() {
        if (10*curpage-9 < total && total < 10*curpage) {
            $('#next').prop('disabled', true);
            $('#back').prop('disabled', false);
        }
        if (curpage <= 1) {
            $('#back').prop('disabled', true);
            $('#next').prop('disabled', false);

        }
    }

      $('#next').click(function() {
        if (!(10*curpage-9 < total && total < 10*curpage)) {
            curpage++;
            url = '';
            data = parseURLParams(window.location.href);
            for (let index in data) {
                if (index == 'page') {
                    url += `${index}=${curpage}&`
                } else {
                    url += `${index}=${data[index]}&`
                }
            }
            url = `/search?${url.substring(0, url.length-1)}`;
            window.history.pushState("", "", url);
            updateResult(parseURLParams(window.location.href));
            changeButtons();
        }
      });

      $('#back').click(function() {
        if (curpage > 1) {
            curpage--;
            url = '';
            data = parseURLParams(window.location.href);
            for (let index in data) {
                if (index == 'page') {
                    url += `${index}=${curpage}&`
                } else {
                    url += `${index}=${data[index]}&`
                }
            }
            url = `/search?${url.substring(0, url.length-1)}`;
            window.history.pushState("", "", url);
            updateResult(parseURLParams(window.location.href));
            changeButtons();
        }
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