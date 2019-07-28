
function createNewElement(parentNode, TagName, className) {
    var element = document.createElement(TagName);
    if(className) {
        element.className = className;
    }
    parentNode.appendChild(element);
}
// 页码栏初始化并进行讨论
function showInitPages(totalpages) {
    var pagecontrol = document.getElementsByClassName('pagebar')[0];
    var nextpage = document.getElementById("next-page");// 添加页码
    if(totalpages <= 5) {
        for (var i = 0; i < totalpages; i++) {
        var page_temp = document.createElement("div");
        page_temp.className = "page";
        pagecontrol.insertBefore(page_temp, nextpage);
        // 把页码添加到页面上
        var page = document.getElementsByClassName("page")[i];
        page.innerHTML = i + 1;
    }
}
    // 当页码数大于5时
    else {
        for (var i = 0; i < 5; i++) {
        var page_temp = document.createElement("div");
        page_temp.className = "page";
        pagecontrol.insertBefore(page_temp, nextpage);
        var page = document.getElementsByClassName("page")[i];
        // 下面来分析每一种具体情况
        if(i < 3) {
            page.innerHTML = i + 1;
        }
        else if(i == 3) {
            page.innerHTML = "...";
        }
        else if(i == 4) {
            page.innerHTML = totalpages;
        }
    }
    }
    // 添加说明文本“共 x 页”
    var total = document.getElementsByClassName("total")[0];
    total.innerHTML = "共 " + totalpages + " 页"; 
     
}
// 进行页面的切换
function readyToChangePage(pagesnumber, totalpages,arr) {
    var pages = document.getElementsByClassName("page");
    // 初始状态是第一页显示
    pages[0].id = "selected";
    showSortPage(arr, 1, pagesnumber);
    // 点击上一页是的切换     
    $("#last-page").click(function() { 
        if(totalpages <= 5) {
            for (var i = 0; i < totalpages; i++) {
                if (pages[i].id == "selected" && i != 0) {
                    pages[i].id = "";
                    pages[i - 1].id = "selected";
                    console.log(i);
                    showSortPage(arr, i, pagesnumber);
                    break;
                }
            }
        }
        else {
            // 第二页（左二）跳转至第一页（左一）
            if (pages[1].id == "selected") 
            {
                pages[1].id = "";
                pages[0].id = "selected";
                showSortPage(arr, 1, pagesnumber);;
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 3) {
                pages[2].id = " ";
                pages[1].id = "selected";
                showSortPage(arr, 2, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 4) {
                pages[1].innerHTML = 2;
                pages[2].innerHTML = 3;
                pages[3].innerHTML = "···";
                showSortPage(arr, 3, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML > 4 && pages[2].innerHTML < totalpages - 2) {
                pages[2].innerHTML = parseInt(pages[2].innerHTML) - 1;
                showSortPage(arr, totalpages, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == totalpages - 2) {
                pages[2].innerHTML = totalpages - 3;
                pages[3].innerHTML = "···";
                showSortPage(arr, totalpages - 3, pagesnumber);
            }
            else if(pages[3].id == "selected") {
                pages[3].id = " ";
                pages[2].id = "selected";
                showSortPage(arr, totalpages - 2, pagesnumber);
            }
            else if(pages[4].id == "selected") {
                pages[4].id = " ";
                pages[3].id = "selected";
                showSortPage(arr, totalpages - 1, pagesnumber);
            }
        }
    });
    // 点击下一页时
    $("#next-page").click(function() {
            if(totalpages <= 5) {
            for(var i = 0; i < totalpages; i++) {
                if(pages[i].id == "selected" && i != totalpages - 1) {
                    pages[i].id = " ";
                    pages[i + 1].id = "selected";
                    showSortPage(arr, i + 2, pagesnumber);
                    break;
                }
            }
        }
        else {
            if(pages[0].id == "selected") {
                pages[0].id = " ";
                pages[1].id = "selected";
                showSortPage(arr, 2, pagesnumber);
            }
            else if(pages[1].id == "selected") {
                pages[1].id = " ";
                pages[2].id = "selected";
                showSortPage(arr, 3, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 3) {
                pages[1].innerHTML = "···";
                pages[2].innerHTML = 4;
                if (totalpages == 6) {
                    pages[3].innerHTML = 5;
                }
                showSortPage(arr, 4, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML > 3 && pages[2].innerHTML < totalpages - 3) {
                pages[2].innerHTML = parseInt(pages[2].innerHTML) + 1;
                showSortPage(arr, pages[2].innerHTML, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == totalpages - 3) {
                pages[2].innerHTML = totalpages - 2;
                pages[3].innerHTML = totalpages - 1;
                showSortPage(arr, totalpages - 2, pagesnumber);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == totalpages - 2) {
                pages[2].id = " ";
                pages[3].id = "selected";
                if (pages[2].innerHTML == 4) {
                    pages[3].innerHTML = 5;
                }
                showSortPage(arr, totalpages - 1, pagesnumber);
            }
            else if (pages[3].id == "selected") {
                pages[3].id = " ";
                pages[4].id = "selected";
                showSortPage(arr, totalpages, pagesnumber);
            }
        }
    });
    // 直接点击小圆点时实现页面跳转
    if (totalpages <= 5) {
        total = totalpages;
    }
    else {
        total = 5;
    }
    for (var i = 0; i < total; i++) {
        (function (i) {
            // 点击页码时
            pages[i].addEventListener("click", show2);
                function show2() {
                    if (pages[i].innerHTML == "···") {
                    return false;
                }
                for (var j = 0; j < total; j++) {
                    if (pages[j].id == "selected" || pages[j].id == "temp") {
                        if (j == i) {
                            return false;
                        }
                        pages[j].id = "";
                    }
                }
                pages[i].id = "selected";
                showSortPage(arr, pages[i].innerHTML, pagesnumber);
                if (i == 0 && totalpages > 5) {
                    for (var k = 0; k < 5; k++) {
                        if (k < 3) {
                            pages[k].innerHTML = k + 1;
                        }
                        else if (k == 3) {
                            pages[k].innerHTML = "···";
                        }
                        else if (k == 4) {
                            pages[k].innerHTML = totalpages;
                        }
                    }
                }
                if (i == 4 && totalpages > 5) {
                    // 页面数大于5且点击最后一页
                    for (var k = 0; k < 5; k++) {
                        if (k == 0) {
                            pages[k].innerHTML = 1;
                        }
                        else if (k == 1) {
                            pages[k].innerHTML = "···";
                        }
                        else if (k > 1) {
                            pages[k].innerHTML = totalpages + k - 4;
                        }
                    }
                }
            }
            // 指针移动到页码上方时
            pages[i].addEventListener("mouseover", show3);
                function show3() {
                    if (pages[i].innerHTML == "···") {
                    return false;
                }
                for (var j = 0; j < total; j++) {
                    if (pages[j].id == "selected" && j != i) {
                        pages[j].id = "temp";
                        pages[i].id = "hover";
                        pages[i].style.cursor = "pointer";
                    }
                }
            }
            // 指针离开页码上方时
            pages[i].addEventListener("mouseout", show4);
                function show4(){
                    if (pages[i].innerHTML == "···") {
                    return false;
                }
                if (pages[i].innerHTML == "···") {
                    return false;
                }
                for (var j = 0; j < total; j++) {
                    if (pages[j].id == "temp" && j != i) {
                        pages[j].id = "selected";
                        pages[i].id = "";
                    }
                }
            }
        })(i);
    }
}
function showCertainPage(pagesnumber, totalgoods, pages) {
    // 移除原来的页面
    var wrap = document.getElementsByClassName("shopbar-1")[0]
    if (wrap.getElementsByClassName("goods")[0]) {
        wrap.removeChild(wrap.getElementsByClassName("goods")[0]);
    }
    createNewElement(wrap, "div", "goods");
    var wrapper = document.getElementsByClassName("goods")[0];
    if (document.getElementById("goods-wrapper")) {
        wrapper.id = "searchpage-goods";
    }
    else if (document.getElementById("goods-wrapper")) {
        wrapper.id = "categorypage-goods";
    }
    if (pages * pagesnumber <= totalgoods) {
        for (var i = 0; i < pagesnumber; i++) {
        createNewElement(wrapper, "div", "commodity");
        // 添加外层元素
            // 创建商品的首页
            var commodity = document.getElementsByClassName("commodity")[i];
            // 创建存放商品图片的容器
            createNewElement(commodity, "img", "goodsPhoto");
            // 创建存放商品信息的容器
            createNewElement(commodity, "div", "goodsMessages");
            var goodsMessages = document.getElementsByClassName("goodsMessages")[i];
            // 创建存放商品名字的容器
            createNewElement(goodsMessages, "div", "name");
            // 创建存放商品价格的容器
            createNewElement(goodsMessages, "div", "price");
            // 创建存放热度的容器
            createNewElement(goodsMessages, "div", "hot");
            // 创建存放介绍的容器
            createNewElement(goodsMessages, "div", "introduction");
        }
    } 
    if (pages * pagesnumber > totalgoods && (pages - 1) * pagesnumber < totalgoods) {
        for (var i = 0; i < (totalgoods - (pages - 1) * pagesnumber); i++) {
            createNewElement(wrapper, "div", "commodity");
            // 添加外层元素
            // 创建商品的首页
            var commodity = document.getElementsByClassName("commodity")[i];
            // 创建存放商品图片的容器
            createNewElement(commodity, "img");
            // 创建存放商品信息的容器
            createNewElement(commodity, "div", "goodsMessages");
            var goodsMessages = document.getElementsByClassName("goodsMessages")[i];
            // 创建存放商品名字的容器
            createNewElement(goodsMessages, "div", "name");
            // 创建存放商品价格的容器
            createNewElement(goodsMessages, "div", "price");
            // 创建存放热度的容器
            createNewElement(goodsMessages, "div", "hot");
            // 创建存放介绍的容器
            createNewElement(goodsMessages, "div", "introduction");
        }
    }
    
}