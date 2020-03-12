var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DAL = require('./dataAccessLayer');
const ObjectId = require('mongodb').ObjectId;
DAL.Connect();
require('dotenv').config();
var app = express();
var cors = require('cors');
const port = 5001;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/api/items', cors(), async function(req, res) {
  const result = await DAL.Find();
  res.send(result);
});

app.get('/api/items/:id', cors(), async function(req, res) {
  const id = req.params.id;
  const item = {
    _id: ObjectId(id)
  };
  const result = await DAL.Find(item);
  if (result) {
    res.send(result);
  }
  else {
    res.send('No to do items with ID: ' + id + ' found!');
  }
});

app.post('/api/items', cors(), async function(req, res) {
  const item = req.body;
  if (item.name) {
    const result = await DAL.Insert(item);
    res.send('successfully created a to do list item');
  }
  else {
    res.send('failed to create a to do list item');
  }
});

app.put('/api/items/:id', cors(), async function(req, res) {
  const id = req.params.id;
  const item = {
    _id: ObjectId(id)
  };
  const newItem = req.body;
  const updatedItem = { $set: newItem};
  const result = await DAL.Update(item, updatedItem);
    res.send(result);
});

app.delete('/api/items/:id', cors(), async function(req, res) {
  const id = req.params.id;
  const item = {
    _id: ObjectId(id)
  };
  const result = await DAL.Remove(item);
  res.send(result);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

//   console.log(`MONGODB_CONNECTION_STRING: ${process.env.MONGODB_CONNECTION_STRING}`);
// });

// app.listen(port, () => {
//   console.log('Server is running on port:', port);
// });

module.exports = app;