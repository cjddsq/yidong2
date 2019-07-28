var id = window.location.search.substr(1).split("id=")[1];
if(id) {
    showDetailPhoto(id);
}
// 把所有的图片放在一起
function showDetailPhoto(id) {
    $.ajax({
        url: "http://123.207.52.59:8088/getImg",
        type: "GET",
        data: {
            id: id,
        },
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data);
            fangDaJing(data.data.detailedImg[0], data.data.detailedImg[1]);
        }
    })
}
function fangDaJing(photo1, photo2) {
// $("#img-1").hover(function () {
    $(".small img").attr("src", photo1)
    $(".big img").attr("src", photo2)
// })
}
$("#img-2").hover(function () {
    $(".small img").attr("src", "images/q7.jpg")
    $(".big img").attr("src", "images/q6.jpg")
})
$("#img-3").hover(function () {
    $(".small img").attr("src", "images/q12.jpg")
    $(".big img").attr("src", "images/q11.jpg")
})
$("#img-4").hover(function () {
    $(".small img").attr("src", "images/q3.jpg")
    $(".big img").attr("src", "images/q5.jpg")
})
$("#img-5").hover(function () {
    $(".small img").attr("src", "images/q12.jpg")
    $(".big img").attr("src", "images/q11.jpg")
})

$(function() {
    $(".all").hover(function() {
        $(".all span").toggle();
        $(".all .big").toggle();
    })
    // 除以二视为了让鼠标在中心
    var sp = $(".all span").width()/2;
    var osm = $(".all .small").width();
    $(".all .small").mousemove(function(e) {
        var ox = $(".all .small").offset().left;
        var oy = $(".all .small").offset().top;
        var ex = e.pageX;
        var ey = e.pageY;
        var sx = ex - ox;
        var sy = ey - oy;
        if(sx < sp) {
            sx = sp;
        }
        if(sx > osm - sp) {
            sx = osm - sp;
        }
        if (sy < sp) {
            sy = sp;
        }
        if (sy > osm - sp) {
            sy = osm - sp;
        }
        $(".all span").css({left: sx - sp, top: sy - sp})
        // 加负号视为了反向移动
        $(".all .big img").css({left: -osm/(2*sp)*(sx-sp),
            top: -osm / (2 * sp) * (sy - sp)})
    })
})
