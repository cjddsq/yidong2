// 向URL添加查询字符的参数
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
var url = "http://123.207.52.59:8088/paging";
var data = { limit: 5, page: 1 };
ajax("get", url, data, null);
function ajax(method, url, data, fn) {
    // 创建对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // open方法
    if (method == "get" && data) {
        url = addURLParam(url, "limit", 5);
        url = addURLParam(url, "page", 1);
    }
    console.log(url);
    xmlhttp.open(method, url, true);

    // send方法
    if (method == "get") {
        xmlhttp.send()
    } else {
        // post请求时执行
        // 声明发送的数据类型
        xmlhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }

    // 接收数据
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                // 数据接收成功后执行传来的函数
                fn(xmlhttp.responseText)
                console.log("nihao");
            } else {
                alert("错误" + xmlhttp.status)
            }
        }
    }
    // 进行超时设定,(仅适用于IE8+)
    xmlhttp.timeout = 1000;
    xmlhttp.ontimeout = function () {
        alert("请求在1秒内无响应");
    }
}