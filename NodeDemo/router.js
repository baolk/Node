//一个简单的路由

function route(handle,pathname,response,request){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
        console.log("request handler found for" + pathname);
    }else{
        console.log("No request handler found for"+ pathname);
        response.writeHead(400,{"Content-Type":"text/html"}); //响应头
        response.write("404 Not found"); //响应内容
        response.end(); //关闭响应
    }
}

module.exports = {
    route,
}