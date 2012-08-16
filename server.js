//   http://www.danielbaulig.de/socket-ioexpress/#comment-8479
//   http://socket.io/

var express = require('express');
var app = express();
var io = require('socket.io');
var server = require('http').createServer(app);

server.listen(9999);
io = io.listen(server);

app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.set('view options', {pretty: true})
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
  app.use(app.router);
});


io.sockets.on('connection', function (socket) {
  console.log('got a socket io connection from a client!');
  // at this point you could notify other listeners that a new client
  // has connected, etc...
  // we will just simply say hello new client from the server...
  socket.emit('welcome', { hello: 'hello client from socket.io!!!' });
});

// redirect from the root to the addproduct listing...
app.get('/', function(req, res){
  res.render('addProduct');
});

// ui for new product
app.get('/addProduct', function(req, res){
  res.render('addProduct');
});

// ui for new product
app.get('/addProduct', function(req, res){
  res.render('addProduct');
});

// ui for product listing
app.get('/productListing', function(req, res){
  res.render('productListing');
});

// insert a new product
app.post('/product', function(req, res){
  var product = {};
  // not gonna get too fancy here for demo purposes, just grab
  // the product name that was entered and broadcast it...
  product.name = req.body.productName;
  // broadcast it to listeners...
  io.sockets.emit('product.added', product);
  // return it to ajax poster
  res.json(product);
});

