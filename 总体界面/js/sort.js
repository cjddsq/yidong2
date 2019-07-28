function readyToShowData(limit, page) {
    $.ajax(
        {
            url: "http://123.207.52.59:8088/paging",
            type: "GET",
            data: {
                limit: limit,
                page: page,
            },
            dataType: "json",
            success: function (data) {
                var totalpages = Math.ceil(data.data.count/limit);
                var arr = sort(data.data.count);
                var arr1 = arr.SortById();
                showInitPages(totalpages);
                readyToChangePage(limit, totalpages, arr1);
                clickSortByPriceUp(arr, limit, totalpages);
                clickSortByPriceDown(arr, limit, totalpages);
                clickSortByHotUp(arr, limit, totalpages);
                clickSortByHotDown(arr, limit, totalpages);
            }
        }
    )
}
readyToShowData(5, 1);
$("option").click(function () {
    // 获取该节点在兄弟节点的位置
    var index = $(this).index();
    $(".page").remove();
    $("#last-page").unbind();
    $("#next-page").unbind();
    readyToShowData(index + 1, 1);
});
function clickSortByPriceUp(arr, limit, totalpages) {
    $("#sortPriceUp").click(function () {
        //  移除页数和事件
        $(".page").remove();
        $("#last-page").unbind();
        $("#next-page").unbind();
        showInitPages(totalpages);
        var arr2 = arr.SortByPriceUp();
        readyToChangePage(limit, totalpages, arr2);
    });
}
function clickSortByPriceDown(arr, limit, totalpages) {
    $("#sortPriceDown").click(function () {
        //  移除页数和事件
        $(".page").remove();
        $("#last-page").unbind();
        $("#next-page").unbind();
        showInitPages(totalpages);
        var arr3 = arr.SortByPriceDown();
        readyToChangePage(limit, totalpages, arr3);
    });
}
function clickSortByHotUp(arr, limit, totalpages) {
    $("#sortHotUp").click(function () {
        //  移除页数和事件
        $(".page").remove();
        $("#last-page").unbind();
        $("#next-page").unbind();
        showInitPages(totalpages);
        var arr4 = arr.SortByHotUp();
        readyToChangePage(limit, totalpages, arr4);
    });
}
function clickSortByHotDown(arr, limit, totalpages) {
    $("#sortHotDown").click(function () {
        //  移除页数和事件
        $(".page").remove();
        $("#last-page").unbind();
        $("#next-page").unbind();
        showInitPages(totalpages);
        var arr5 = arr.SortByHotDown();
        readyToChangePage(limit, totalpages, arr5);
    });
}
function sort(goods) {
    var arr = [];
    for(let i = 1; i <= goods; i++) {
        $.ajax(
            {
                url: "http://123.207.52.59:8088/getInfo",
                type: "GET",
                data: {
                    id: i,
                },
                dataType: "json",
                // 同步
                async: false,
                success: function (data) {
                    obj = {
                        Id: i,
                        Price: data.data.price,
                        Hot: data.data.hot,
                        Img: data.data.img,
                        Introduction: data.data.introduction,
                        Name: data.data.name,
                    }
                    arr[i - 1] = obj;
                }
            }
        )
    }
    function sortById(obj1, obj2) {
        if (obj1.Id < obj2.Id) {
            return -1;
        } else if (obj1.Id > obj2.Id) {
            return 1;
        } else {
            return 0;
        } 
    }
    function sortByPriceUp(obj1, obj2) {
        if (parseFloat(obj1.Price) < parseFloat(obj2.Price)) {
            return -1;
        } else if (parseFloat(obj1.Price) > parseFloat(obj2.Price)) {
            return 1;
        } else {
            return 0;
        }           
    }
    function sortByPriceDown(obj1, obj2) {
        if (parseFloat(obj1.Price) > parseFloat(obj2.Price)) {
            return -1;
        } else if (parseFloat(obj1.Price) < parseFloat(obj2.Price)) {
            return 1;
        } else {
            return 0;
        }     
    }
    function sortByHotUp(obj1, obj2) {
        if (parseFloat(obj1.Hot) < parseFloat(obj2.Hot)) {
            return -1;
        } else if (parseFloat(obj1.Hot) > parseFloat(obj2.Hot)) {
            return 1;
        } else {
            return 0;
        }     
    }
    function sortByHotDown(obj1, obj2) {
        if (parseFloat(obj1.Hot) > parseFloat(obj2.Hot)) {
            return -1;
        } else if (parseFloat(obj1.Hot) < parseFloat(obj2.Hot)) {
            return 1;
        } else {
            return 0;
        } 
    }

    return {
        SortById: function() {
            arr.sort(sortById);
            return arr;
        },
        SortByPriceUp : function() {
            arr.sort(sortByPriceUp);
            return arr;
        },
        SortByPriceDown: function () {
            arr.sort(sortByPriceDown);
            return arr;
        },
        SortByHotUp: function () {
            arr.sort(sortByHotUp);
            return arr;
        },
        SortByHotDown: function () {
            arr.sort(sortByHotDown);
            return arr;
        },
    }
}
// 新构建的数组，为的是减少接口的调用
function showSortPage(arr, page, limit) {
   showCertainPage(limit, arr.length, page);
  for (let i = limit * (page - 1); (i < limit * page) && (i < arr.length); i++) {
        j = i - limit * (page - 1);
        var commodity = document.getElementsByClassName("commodity")[j].getElementsByTagName("img")[0];
        commodity.src = arr[i].Img;
        document.getElementsByClassName("name")[j].innerHTML = "商品名称:" + arr[i].Name;
        document.getElementsByClassName("price")[j].innerHTML = "价格:" + arr[i].Price;
        document.getElementsByClassName("hot")[j].innerHTML = "热度:" + arr[i].Hot;
        document.getElementsByClassName("introduction")[j].innerHTML = "商品介绍:" + arr[i].Introduction;
    }
    $(".commodity").click(function() {
        // 获取该节点在兄弟节点的位置
        index = $(this).index() + limit * (page - 1);
        window.location.href = "fandajin.html?id=" + arr[index].Id;
    }); 
}