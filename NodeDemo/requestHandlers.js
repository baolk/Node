//请求处理程序

const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable")

function start(response){
    console.log("Start~");

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+ 
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200,{"Content-Type":"text/html"}); //响应头
    response.write(body); //响应内容
    response.end(); //关闭响应
}

function upload(response,request){
    console.log("upload~");

    var form = new formidable.IncomingForm();
    form.parse(request,function(error,fields,files){
        fs.renameSync(files.upload.path,"/tmp/test.png");
        response.writeHead('200',{"Content-Type":"text/html"});
        response.write("received image:<br />");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response){
    console.log("show~");
    fs.readFile("/tmp/test.png","binary",function(err,file){
        if(err){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

let handle ={};
handle["/"] = start;
handle["/start"] = start;
handle["/upload"] = upload;
handle["/show"] = show;

module.exports = {
    handle
}

