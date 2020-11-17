# Node

- <a href="#id1">一、Node总结</a>
- <a href="#id2">二、Node入门</a>

# <a id="id1">一、Node总结</a>

书籍：《深入浅出Node.js》——偏原理，没有实战内容

Node入门：http://www.nodebeginner.org/index-zh-cn.html

官方API：https://nodejs.org/dist/latest-v6.x/docs/api/

1. Node.js不是语言，不是框架，而是Javascript运行时环境，即Node.js可以解析和执行JavaScript代码，构建于chrome V8引擎之上；
2. Node.js中的JavaScript没有BOM和DOM，只有ECMAScript基本语法；在 Node 中为 JavaScript 提供了一些服务器级别的 API；
   - 文件读写
   - 网络服务构建
   - 网络通信
   - http服务器等……
3. Node.js的特性
   - event-driven 基于事件驱动的回调（Node.js是事件驱动的）
   - non-blocking I/O model 非阻塞IO模型（异步）
   - lightweight and efficient 轻量和高效
4. Node.js的用途
   - Web服务器后台
   - 命令行工具（npm/hexo/webpack）
5. 进程和线程
   - 进程
     - 负责为程序运行提供必备的环境
     - 进程就相当于工厂中的车间
   - 线程
     - 线程是计算机中最小的计算单位，线程负责执行进程中的程序
     - 线程相当于工厂中的工人
   - 单线程：Node服务器，但是在后台拥有一个I/O线程池
   - 多线程：传统的服务器

6.  模块化开发
   - CommonJS规范是为了弥补当前JavaScript没有标准的缺陷，希望JS能够在任何地方运行
   - CommonJS对模块的定义十分简单：
     - 模块引用
     - 模块定义
     - 模块标识
   - 在Node中，通过**require( )函数**来引入外部模块；
   - 在Node中，一个js文件就是一个模块，每一个JS文件的js代码都是独立运行在一个函数中，而不是全局作用域，所以一个模块中的变量和函数无法在其他模块中访问，要通过**exports**向外部暴露变量；

7. 模块标识

   - 模块标识就是模块的名字，是传递给require( )方法的参数，必须是驼峰命名法的字符串，或者是相对和绝对路径
   - 模块分为两大类：
     - 核心模块：由node引擎提供的模块（直接写名字，一个驼峰字符串）
     - 文件模块：由用户自己创建的模块（相对路径）

8. global

   - 在node中有一个全局对象global，它的作用和网页中window类似

     - 在全局中创建的变量都会作为global的属性保存

     - 在全局中创建的方法都会作为global的方法保存

   - 当Node在执行模块（每个js文件）中的代码时，它会在代码外部自动添加一个function

     ![截屏2020-11-16 下午4.41.00](https://gitee.com/baolk/typora_images/raw/master/img/Node_%E6%A8%A1%E5%9D%97%E5%A4%96%E7%9A%84function.png)

   - 实际上模块中的代码都是包装在一个函数中执行的，并且在函数执行时，同时传递了5个实参

     - exports：对象，用来暴露变量或函数

     - require：引入外部的模块

     - module：对象，当前模块自身，exports是module的属性

       ```javascript
       module.exports === exports
       ```

     - _filename：当前模块的绝对路径

     - _dirname：当前模块所在文件夹的绝对路径

9. exports和module.exports的区别

   - exports和module.exports本质上是一个对象
     - exports只能通过. 的方式来暴露内部变量
     - module.exports既可以.的方式，也可以直接赋值

10. 包 package

    - CommonJS的包规范由包结构和包描述文件两个部分组成
      - 包结构：用于组织包中的各种文件
      - 包描述文件：描述包的相关信息

11. Buffer（缓冲区）

    - Buffer的结构和数组很像，操作的方法也和数组类似

    - JS中数组性能较差，且原生JS的数组不能存储二进制文件（mp3、视频等）

    - 在buffer中不需要引入模块，直接使用就可以

      ```javascript
      var str = "Hello Atguigu";
      //保存到buffer
      var buf = Buffer.from(str);
      ```

    - Buffer的最小单位是一个字节，8位

    - 创建一个固定大小的Buffer

      ```javascript
      //可以通过索引来操作buf中的元素
      //创建并清空数据为0
      //一旦确定大小，无法再增加
      var buf = Buffer.alloc(10)
      
      //可能含有敏感数据，创建但不清空数据
      var buf1 = Buffer.allocUnsafe(10)
      ```

    - buf.toString( ) 可以将缓冲区中的数据转换成字符串

12. 文件系统（File System）

    - 通过Node中的fs模块来和文件系统进行交互
    - fs模块中所有的操作都有两种形式：
      - 同步：阻塞程序
      - 异步：不会阻塞，通过回调函数返回结果

13. 文件的读写

    - 同步文件的写入

      ```javascript
      var fs = require("fs");
      
      //1.打开文件
      //该方法会返回一个文件的描述符作为结果，我们可以通过描述符对文件进行各种操作
      var fd = fs.openSync("hello.txt",w) ;//r是只读的，w是可写的
      
      //2.写入内容
      fs.writeSync(fd,"今天天气真不错"); //fd是文件描述符，需要传递要写入的文件的描述符
      
      //3.保存并关闭文件
      fs.close(fd) ;
      ```

    - 异步文件的写入

      ```javascript
      var fs = require('fs');
      
      //1.打开文件，多一个回调函数
      //异步调用的方法，结果都是通过回调函数的参数返回
      //有两个参数：（1）err 错误对象，没有错误就是null；（2）fd 文件的描述符；
      fs.open('hello.txt',w,function(err,fd){
        if(!err){
          //2.若没有出错，则进行写入操作
          fs.write(fd,"今天天气真不错",function(err){
            if(!err){
               console.log("写入成功！")；
            }
            //3.关闭并保存文件
            fs.close(fd,function(err){
              if(!err){
                console.log("文件已关闭～")；
              }
            })；
          })；
        }else{
          console.log(err);
        }
      })
      ```

    - 简单文件的写入（日常开发常用）

      ```javascript
      //异步只是比同步多一个回调函数
      //这种方法不需要打开和关闭文件
      var fs = require('fs');
      
      fs.writeFile("hello.txt","今天天气真不错",function(err){
        if(!err){
          console.log("写入成功～")；
        }else{
          console.log(err)
        }
      })
      ```

    - 文件的打开状态

      ![截屏2020-11-16 下午8.22.28](https://gitee.com/baolk/typora_images/raw/master/img/Node_%E6%96%87%E4%BB%B6%E7%9A%84%E6%89%93%E5%BC%80%E7%8A%B6%E6%80%81.png)

    - 流式文件写入

      - 同步、异步、简单文件写入都不适合大文件的写入，性能较差，容易导致内存溢出

        ```javascript
        var fs = require("rs");
        
        //1.流式写入
        //创建一个可写流
        var ws = fs.createWriteStream("hello3.txt");
        
        //2.通过文件描述符多次向文件中输入内容
        ws.write('通过可写流写入文件内容1');
        ws.write('通过可写流写入文件内容2');
        ws.write('通过可写流写入文件内容3');
        ws.write('通过可写流写入文件内容4');
        
        //3.关闭可写流
        //ws.close()会产生文件还没写完就被关闭可写流的情况
        ws.end();
        ```

    - 流失文件的读取

      - 适用于一些大文件

        ```javascript
        var fs = require("rs");
        
        //创建一个可读流
        var rs = fs.createReadStream("an.jpg");
        
        //读取可读流的数据，需要为可读流绑定一个data事件，data事件绑定完毕会自动开始读取数据
        rs.on("data",function(data){
          console.log(data);
        })
        ```

      - 将可读流直接写到可写流

        ```javascript
        var ws = fs.createWriteStream("hello1.txt");
        var rs = fs.createReadStream("hello2.txt");
        
        rs.pipe(ws);
        ```



# <a id="id2">二、Node入门</a>

实现了Node的一个小demo [NodeDemo](https://github.com/baolk/Node/tree/main/NodeDemo)
参考[Node入门](https://www.nodebeginner.org/index-zh-cn.html#a-word-of-warning)
简单的一个应用网页，实现的功能：

- 浏览器能够访问到应用（需要搭建一个HTTP服务器）
- 文件上传
- 显示上传的文件

实现的各个模块：

- **HTTP服务器**提供Web页面
- **路由**根据不同请求进行响应
- **请求处理程序**进行请求的处理
- **视图显示**表单
- **上传功能**处理上传的文件

Node几个概念，基于Node 构建网页是基于以下原则的：

- 基于事件驱动的回调
- 非阻塞IO模型
