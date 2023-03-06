var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var index = require('./routes/index');
var users = require('./routes/users');

const cdb = {
  host : 'localhost',
  port : '27017',
  db : 'PostsDB'
};

var postController = require('./controllers/postController');

//var socketExt = io.connect('https://localhost:8080');

mongoose.connect("mongodb://"+cdb.host+":"+cdb.port+"/"+cdb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log('Conexión exitosa a la base de datos.');
});

io.on('connection', function(socket) {

	console.log('A client has connected');

  socket.on('hai', function(data) {
        console.log('deleting with SOCKET : '+ data.great);
        socket.emit('message', 'Server Connected');
      });

  socket.on('addPost', function(data) {
        postController.addPostSocket(data, function (post, err) {
          io.emit('postAdded', {data:post,ok:!err,err:err});
        })
      });

  socket.on('deletePost', function(id, idx) {
        postController.deletePostSocket(id, function (err) {
          io.emit('postDeleted', {index:idx,ok:!err,err:err});
        })
      });

  socket.on('getPosts', function() {
        postController.getPostsSocket(function (posts, err) {
          io.emit('postGet', {data:posts,ok:!err,err:err});
        })
      });

  socket.on('updatePost', function(data, idx) {
        postController.updatePostSocket(data,function (post, err) {
          io.emit('postUpdated', {index:idx,post:post,ok:!err,err:err});
        })
      });

  socket.on('disconnect', function(){
          console.log(' has disconnected'); //disconnecting automatically removes the socket from the room.
    });
});
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors({origin:true,credentials: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
  res.status(500).send(err);
});

module.exports = app;
