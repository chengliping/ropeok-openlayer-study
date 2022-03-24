const createError = require('http-errors');
const express = require('express');
const path = require('path');
const url = require('url');
const proxy = require('http-proxy-middleware');
var cors = require('cors');
var compression = require('compression');
var config = require('../config/config');
const app = express();
app.use(compression());

app.use(cors());
// 静态资源文件夹
app.use(express.static(path.join(__dirname, '../api')));
app.use(express.static(path.join(__dirname, '../demo')));

// 本地json模拟远程服务器api  post请求转get
// 接口名字后面添加请求方式，与本地json一一映射
// 代理本地json模拟远程服务器api
app.use('/local-api/*', function (req, res, next) {
  let baseUrl = req.baseUrl;
  proxy('/local-api', {
    target: 'http://localhost:' + config.api_local_port,
    pathRewrite: function (path) {
      switch (req.method) {
      case 'POST':
        baseUrl += '_post';
        break;
      case 'GET':
        baseUrl += '_get';
        break;
      case 'DELETE':
        baseUrl += '_delete';
        break;
      case 'PUT':
        baseUrl += '_put';
        break;
      case 'PATCH':
        baseUrl += '_patch';
        break;
      }
      req.method = 'GET';
      let obj = url.parse(path);
      let search = obj.search;
      let pathDeletePre = baseUrl.replace(/^\/local-api/, '');
      let pathAddSuffix = pathDeletePre.replace(/$/, '.json');
      return pathAddSuffix + (search || '');
    }
  })(req, res);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  if(req.app.get('env') === 'development'){
    res.locals.error = err;
  }else{
    res.locals.error = {};
  }

  let status = err.status || 500;
  // render the error page
  res.status(err.status || 500);
  res.end(status + '');
});

module.exports = app;
