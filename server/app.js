var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var indexRouter   = require('./routes/index');

var app = express();
//app.set('view engine', 'html');

// Show request logs in console
app.use(logger('dev'));

//  It parses incoming requests with JSON payloads 
//  and is based on body-parser.
app.use(express.json());

//  It parses incoming requests with urlencoded payloads 
//  and is based on body-parser.
app.use(express.urlencoded({ extended: false }));

//  Parse Cookie header and populate req.cookies 
//  with an object keyed by the cookie names
app.use(cookieParser());

//  It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, '/../frontend')));



app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).json({ ok: false, msg: 'Unexpedted error.' });
});

module.exports = app;
