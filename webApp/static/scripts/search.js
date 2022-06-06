var endOfDescription = false;

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
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

let data; // ajax data
let url; // url to change to
let isData = false; // if o in url ?
let total = 0; // total products finded
let sorted = 0; // products count on current page
const maxproductspersite = 10; // also need to change it in python

function changeButtons() {
    if (maxproductspersite * curpage - 9 <= (curpage-1)*maxproductspersite+sorted && (curpage-1)*maxproductspersite+sorted < maxproductspersite * curpage) {
        $('#next').prop('disabled', true);
    } else {
        $('#next').prop('disabled', false);
    }
    if (curpage <= 1) {
        $('#back').prop('disabled', true);
    } else {
        $('#back').prop('disabled', false);
    }
}

function updateResult(data) {
    if (typeof data.o == 'undefined') { data.o = [''] };
    if (typeof data.string == 'undefined') { data.string = [0xFFFFFFFFFFFF] };
    if (typeof data.page == 'undefined') { data.page = ['1'] };
    if (typeof data.c == 'undefined') { data.c = [''] };
    $.ajax({
        method: 'post',
        url: '/listing',
        data: { 'page': data.page[0], 'text': data.string[0], 'o': data.o[0], 'c': data.c[0] },
        success: function (res) {
            sorted = 0;
            data = `<div class="row">`;
            $.each(res, function (index, value) {
                endOfDescription = false
                var description_mini = ''
                var selector = `${value.description}`;
                for (var i = 0; i<50; i++) {    
                    if (typeof(selector[i]) == "undefined" ) {  
                        endOfDescription = true
                        break   
                    }
                    else {
                        description_mini = description_mini.concat(selector[i])
                    }
                };
                if (!endOfDescription) {
                description_mini += "..."
                endOfDescription = false
                }
                data += `<div class="col-sm"><div class="card" style="width: 18rem;"><img class="card-img-top" src="/static/images/${value.image}" alt="Card image cap"><div class="card-body"><h5 class="card-title"><a href='/profile/${value.user}?product=${value.uuid_id}'>${value.name}</a></h5><p class="card-text">${description_mini}</p><p class="card-text">${value.price} zł</p><p class='card-text seller-username'>Sprzedaje: <a href='/profile/${value.user}'>${value.user}</a></p> <a href="/profile/${value.user}?product=${value.uuid_id}" class="btn btn-primary">Do produktu</a></div></div></div>`;
                total = value.count;
                sorted++;
            });
            if (data == `<div>`) {
                data += `<div class='noresult'>Nie znaleziono wyników</div>`
                console.log(data);
            }
            data += "</div>";
            changeButtons();
            $('.result').html(data);
        },
    });
}

let curpage = 1;
// {/* <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src="..." alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div> */}


$(document).ready(function () {
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
            url = `/search?${url.substring(0, url.length - 1)}`; // substring url.length-1 because of & at the end of string in for
        } else {
            url = `/search?page=${curpage}&${url.substring(0, url.length - 1)}`
        }
        window.history.pushState("", "", url);
        updateResult(parseURLParams(window.location.href));

    }
    catch {
    }



    $('#next').click(function () {
        if (!(maxproductspersite * curpage - 9 < total && total < maxproductspersite * curpage)) {
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
            url = `/search?${url.substring(0, url.length - 1)}`;
            window.history.pushState("", "", url);
            updateResult(parseURLParams(window.location.href));
        }
    });

    $('#back').click(function () {
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
            url = `/search?${url.substring(0, url.length - 1)}`;
            window.history.pushState("", "", url);
            updateResult(parseURLParams(window.location.href));
        }
    });

    $('#cat').change(function () {
        isData = false;
        url = '';
        data = parseURLParams(window.location.href);
        for (let index in data) {
            if (index == 'c') {
                isData = true;
                if ($(this).val() !== '') {
                    url += `${index}=${$(this).val()}&`;
                }
            } else {
                url += `${index}=${data[index]}&`;
            }
        }

        if (isData) {
            url = `/search?${url.substring(0, url.length - 1)}`;
            window.history.pushState("", "", url);
        } else {
            url = `/search?${url.substring(0, url.length - 1)}&c=${$(this).val()}`;
            window.history.pushState("", "", url);
        }
        updateResult(parseURLParams(window.location.href));
    });

    $('#orderby').change(function () {
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
        }

        if (isData) {
            url = `/search?${url.substring(0, url.length - 1)}`;
            window.history.pushState("", "", url);
        } else {
            url = `/search?${url.substring(0, url.length - 1)}&o=${$(this).val()}`;
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