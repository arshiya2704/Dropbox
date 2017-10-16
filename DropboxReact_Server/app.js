var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var mysql = require('mysql');
//var session = require('express-session');
//var MemcachedStore = require('connect-memcached')(session);

app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(session({
    secret  : 'some-private-key',
    key     : 'test',
    proxy   : 'true',
    store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211'], //this should be where your Memcached server is running
        secret: 'memcached-secret-key' // Optionally use transparent encryption for memcache session data
    })
}));*/





app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var index = require('./routes/index');
var users = require('./routes/users');
var files = require('./routes/files');



app.use('/', index);
app.use('/files', files);
app.use('/users',users);
app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
