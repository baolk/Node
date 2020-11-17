//实现一个HTTP服务器
const http = require("http");
const url = require("url");
const { route } = require("./router");
const { handle } = require("./requestHandlers")

function start(){
    http.createServer(function(request,response){   //基于事件驱动的回调
        let pathname = url.parse(request.url).pathname;
        console.log("Request for "+ pathname);
        route(handle,pathname,response,request);

    }).listen(8888);
    console.log("server has started.");
}

module.exports = {
    start,
}

//exports.start = start;