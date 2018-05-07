var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var loadRoutes = require('load-routes');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webutils = require('webutils');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var Store = require('express-session').Store;

var app = express();
var config = require('./config');
//webutils.log(config);

/**
 * 连接数据库 Start ----------
 */
try {

  var MongooseStore = require('mongoose-express-session')(Store);
  var db = mongoose.connect(config.mongodb.url, {
    useMongoClient: true
  }, function(err) {
    if (err) {
      webutils.error(err);
    }
  });
  db.on('open', function() {
    webutils.success('数据库链接成功');
  });
  db.on('error', function(err) {
    webutils.error('数据库链接失败');
  });

  app.use(require('express-session')({
    secret: 'kingwell.leng',
    resave: false,
    rolling: false,
    cookie: {
      maxAge: 10000000000
    },
    saveUninitialized: true,
    store: new MongooseStore({
      connection: mongoose /* configuration */
    })
  }));
} catch (ev) {
  webutils.error('数据库链接错误：' + ev);
}
/**
 * ---------- 连接数据库 End 
 */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** * 中间件使用 */
app.use(require('./lib/middleware/res'));


function getFiles(p) {
  var list = [];

  function get(p) {
    fs.readdirSync(p).forEach(function(item, index) {
      var _p = path.join(p, item);
      if (fs.statSync(_p).isFile()) {
        list.push(_p);
      } else if (fs.statSync(_p).isDirectory()) {
        get(_p);
      }
    });
  }
  get(p);
  return list;
}
// Auto Ddd Routes
var adminReg = /^\/admin\/index/ig;
var apiAdminReg = /^\/api\/admin\/index/ig;
var indexReg = /^\/index/ig;

loadRoutes({
  app: app,
  //showLog: false,
  path: path.join(__dirname, '/routes'),
  callback: function(str) {
    str = str.replace(adminReg, '/admin');
    str = str.replace(apiAdminReg, '/api/admin');
    str = str.replace(indexReg, '/');
    return str;
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var spawn = require('child_process').spawn;

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      layout: false,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;