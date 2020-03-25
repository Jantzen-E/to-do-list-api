var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DAL = require('./dataAccessLayer');
const ObjectId = require('mongodb').ObjectId;
var cors = require('cors');
const tasksRouter = require('./routes/api/v1/tasks');
const listsRouter = require('./routes/api/v1/lists');
require('dotenv').config(); 
var app = express();
DAL.Connect(app.locals);
// const port = 5001;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use("/api/v1/tasks", tasksRouter);
app.use('/api/v1/lists', listsRouter);

// app.get('/api/tasks', cors(), async function(req, res) {
//   const result = await DAL.Find(null, 'tasks');
//   res.send(result);
// });

// app.get('/api/lists', cors(), async function(req, res) {
//   const result = await DAL.Find(null, app.locals.listsCollection);
//   res.send(result);
// });

// app.get('/api/tasks', cors(), async function(req, res) {
//   const result = await DAL.Find(null, app.locals.tasksCollection);
//   res.send(result);
// });

// app.get('/api/lists/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const list = {
//     _id: ObjectId(id)
//   };
//   const result = await DAL.Find(null, 'lists');
//   if (result) {
//     res.send(result);
//   }
//   else {
//     res.send('No list with ID: ' + id + ' found!');
//   }
// });

// app.get('/api/tasks/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const list = {
//     _id: ObjectId(id)
//   };
//   const result = await DAL.Find(null, 'tasks');
//   if (result) {
//     res.send(result);
//   }
//   else {
//     res.send('No tasks with ID: ' + id + ' found!');
//   }
// });

// app.post('/api/lists', cors(), async function(req, res) {
//   const list = req.body;
//   if (list.name && list.description && list.due) {
//     const result = await DAL.Insert(list, 'lists');
//     res.send('successfully created a to do list');
//   }
//   else {
//     res.send('failed to create a to do list');
//   }
// });

// app.put('/api/tasks/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const task = {
//     _id: ObjectId(id)
//   };
//   const newTask = req.body;
//   const updatedTask = { $set: newTask};
//   const result = await DAL.Update('tasks', updatedTask);
//     res.send(result);
// });

// app.put('/api/lists/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const list = {
//     _id: ObjectId(id)
//   };
//   const newList = req.body;
//   const updatedList = { $set: newList};
//   const result = await DAL.Update('lists', updatedList);
//     res.send(result);
// });

// app.delete('/api/tasks/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const task = {
//     _id: ObjectId(id)
//   };
//   const result = await DAL.Remove(null, 'tasks');
//   res.send(result);
// });

// app.delete('/api/lists/:id', cors(), async function(req, res) {
//   const id = req.params.id;
//   const list = {
//     _id: ObjectId(id)
//   };
//   const result = await DAL.Remove(null, 'lists');
//   res.send(result);
// });

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

// app.listen(port, () => {
//   console.log('Server started on port ' + port);
// });

module.exports = app;