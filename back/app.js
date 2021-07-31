var createError = require('http-errors');
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, "..", ".env" )})

const passport = require('passport')

const apiRouter = require('./routes/api')
const { sequelize } = require('./models');
const passportConfig = require('./passport')

var app = express();
sequelize.sync();
passportConfig(passport)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secret',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(express.static("build"))

app.use('/api', apiRouter)

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
