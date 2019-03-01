var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy 中间件的选择项
var options = {
    // target: 'http://172.30.3.159:7331', // 目标服务器 host
    target: 'http://10.1.92.19:7331/;',
    changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
    ws: true,                         // 是否代理websockets
    onProxyRes: function(proxyRes, req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    },
    pathRewrite: {
        '^/spua' : '',
    }
};

var options1 = {
    // target: 'http://10.131.101.11:8251/', // 目标服务器 host
    target: 'http://10.1.92.3:8251/;', // 目标服务器 host
    changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
    ws: true,                         // 是否代理websockets
    onProxyRes: function(proxyRes, req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    },
    pathRewrite: {
        '^/zcmsapi' : '',
    }
};

var options2={
    // target: 'http://172.30.3.130:8411',
    target: 'http://172.20.21.3:8411/',
    changeOrigin: true,
    ws: true,
    onProxyRes: function(proxyRes, req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
       // res.header("Content-Type", "application/x-www-form-urlencoded");
    },
    pathRewrite: {
        '^/dmpapi' : '',
    }
}

var options3={
    // target: 'http://172.30.3.172:8762',
    target: 'http://172.20.21.3:8411/',
    changeOrigin: true,
    ws: true,
    onProxyRes: function(proxyRes, req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        // res.header("Content-Type", "application/x-www-form-urlencoded");
    },
    pathRewrite: {
        '^/dmpapi1' : '',
    }
}

// 创建代理
var exampleProxy = proxy(options);
var exampleProxy1 = proxy(options1);
var exampleProxy2 = proxy(options2);
var exampleProxy3 = proxy(options3);

// 使用代理
var app = express();
app.use('/spua', exampleProxy);
app.use('/zcmsapi', exampleProxy1);
app.use('/dmpapi', exampleProxy2);
app.use('/dmpapi1', exampleProxy3);
app.listen(9999);

console.log('Proxy server is listen at port 9999...');