/// <reference path = "./_reference.ts"/>
"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// add mongoose
var mongoose = require('mongoose');
var session = require('express-session');
// flash messages
var flash = require('connect-flash');
// import objects namespace
var objects = require('./objects/customerror');
var CustomError = objects.CustomError;
var myerror = new CustomError();
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Initialize Session
app.use(session({
    secret: 'someSecret',
    saveUninitialized: false,
    resave: true
}));
// Initialize Flash Messages
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));
// Route Definitions
app.use('/', routes);
app.use('/users', users);
// connect to mongodb with mongoose
var DB = require('./config/db');
mongoose.connect(DB.url);
// check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function (callback) {
    console.log('Connected to mongoLab');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var error = new CustomError('Not Found');
    error.status = 404;
    next(error);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error.status || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
});
module.exports = app;

//# sourceMappingURL=app.js.map
