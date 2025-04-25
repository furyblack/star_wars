var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var planetsRouter = require('./routes/planets');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//мидлвары
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET || 'default-secret'));
app.use(express.static(path.join(__dirname, 'public')));

//маршруты
app.use('/', planetsRouter);

app.use(function (req, res, next) {
    next(createError(404, 'Страница не найдена'));
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {error: err});
});

module.exports = app;