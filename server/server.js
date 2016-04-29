var express = require("express"),
  fs = require('fs'),
  compression = require('compression'),
  app = express(),
  http = require("http"),
  https = require("https"),
  _appPath = '../dist',
  bodyParser = require('body-parser'),
  router = express.Router(),
  zlib = require('zlib'),
  gzip = zlib.createGzip();
  app.use(compression());

console.log('node');
console.log(__dirname);
//this is used to serve the dist folder using the node server
app.use(express.static(_appPath));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser({
  limit: '50mb'
}));
app.use(router);

app.set('view engine', 'ejs');
// app.locals.pageTitle="Awesome Website";

//adding permissions to allow the express app to accept the requests form other domains
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  req.headers['X-Forwarded-For', {
    'accept-encoding': 'gzip,deflate'
  }]
  req.headers['X-Forwarded-For', {
    'content-encoding': 'gzip,deflate'
  }]
  next();
});

//using wild cards

var webappRoutes = [
  '^\/landing',
  '^\/financial-dashboard',
  '^\/customers-dashboard',
  '^\/people-dashboard',
  '^\/signin',
];

app.get(new RegExp(webappRoutes.join('|')), function(req, res) {
  res.sendFile(_appPath + '/index.html', {
    root: _appPath
  });
});

// app.get('/', function(req, res) {
//   res.sendFile('../dist/index.html');
// });

http.createServer(app).listen(9000, function() {
  console.log('running on local host port 9000');
});