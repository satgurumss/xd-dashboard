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
  gzip = zlib.createGzip(),
  adConfig = require('./ad-config'),
  passport = require("passport"),
  azureAuthStrategy = require("passport-azure-ad-oauth2"),
  
  authContext = require("./node_modules/adal-node/lib/adal").AuthenticationContext,
  adalParams = {
    tenant: 'xdensityad.onmicrosoft.com',
    authorityHostUrl: 'https://login.microsoftonline.com',
    clientId: 'd33c5908-2401-4f5a-a3dd-8514023a914e',
    clientSecret: "7euoO1GgH7/IhJMgtatvoNH36HWqcd2YK9PwEE07X9c=",
    username: '',
    password: ''
  },
  authorityUrl = adalParams.authorityHostUrl + '/' + adalParams.tenant,
  resource = "http://50.112.117.188:9000/";

app.use(compression());

//this is used to serve the dist folder using the node server
app.use(express.static(_appPath));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser({
  limit: '50mb'
}));
app.use(router);

app.set('view engine', 'ejs');

passport.use(new azureAuthStrategy({
  clientID : adConfig.creds.clientID,
  clientSecret : adConfig.creds.clientSecret,
  callbackURL : adConfig.creds.returnURL,
  resource : resource,
  tenant : adConfig.creds.realm
}, function (accessToken, refresh_token, params, profile, done) {
  var waadProfile = profile;
}))

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

/*app.post("/login", function(req, res) {

  var username = req.body.userName,
    password = req.body.password, 
    context = new authContext(authorityUrl);

  context.acquireTokenWithUsernamePassword(resource, username, password, adalParams.clientId, function(err, tokenResponse) {
    if (err) {
      console.log('well that didn\'t work: ' + err.stack);
      res.sendStatus(400);
    } else {
      console.log(tokenResponse);
      res.sendStatus(200);
    }
  });
})*/

app.get("/login", passport.authenticate('azure_ad_oauth2'));

app.get("/login/return", passport.authenticate('azure-_ad_oauth2',{failureRedirect: '/signin'}) , function(req,res){
  res.sendStatus(200);
});

//using wild cards

var webappRoutes = [
  '^\/landing',
  '^\/financial-dashboard',
  '^\/customers-dashboard',
  '^\/people-dashboard',
  '^\/signin',
  '^\/my-profile',
  '^\/team-performance'
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