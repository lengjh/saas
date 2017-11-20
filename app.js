var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webutils = require('webutils');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var Store = require('express-session').Store;

var app = express();


/**
 * 连接数据库 Start ----------
 */
try {

  var MongooseStore = require('mongoose-express-session')(Store);
  var db = mongoose.connect('mongodb://127.0.0.1/kingwell', {
    useMongoClient: true
  }, function(err) {
    if (err) {
      webutils.error(err);
    }
  });
  db.on('error', function(err) {
    //webutils.error(err);
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
  webutils.error(ev);
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

/** *Page页面 */
var pageRoutes = {
  index: require('./routes/index'),
  product: require('./routes/pages/product'),
  news: require('./routes/pages/news'),
  contact: require('./routes/pages/contact'),
  login: require('./routes/pages/login'),
  register: require('./routes/pages/register'),
  admin: require('./routes/pages/admin/index'),
  //扩展
};

/** * 通用 */
app.use('/', pageRoutes.index);
app.use('/product', pageRoutes.product);
app.use('/news', pageRoutes.news);
app.use('/contact', pageRoutes.contact);

app.use('/admin', pageRoutes.admin);

/** * API接口 */
var apiRoutes = {
  template: require('./routes/api/template'),
  file: require('./routes/api/file'),
  news: require('./routes/api/admin/news'),
  product: require('./routes/api/admin/product'),

  //扩展
};
app.use('/api/template', apiRoutes.template);
app.use('/api/file', apiRoutes.file);
app.use('/api/product', apiRoutes.product);
app.use('/api/news', apiRoutes.news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
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