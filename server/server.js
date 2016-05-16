'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var util = require('util');
var bunyan = require('bunyan');
var config = require('./ad-config');
var _appPath = '../dist';
var db_xdensity = require('./db-definitions.js');

// Start QuickStart here

var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

var log = bunyan.createLogger({
    name: 'Microsoft OIDC Example Web Application'
});


// Passport session setup. (Section 2)

//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  findByEmail(id, function (err, user) {
    done(err, user);
  });
});

// array to hold logged in users
var users = [];

var findByEmail = function(email, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    log.info('we are using user: ', user);
    if (user.email === email) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

// Use the OIDCStrategy within Passport. (Section 2) 
// 
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier), and invoke a callback
//   with a user object.
passport.use(new OIDCStrategy({
    callbackURL: config.creds.returnURL,
    realm: config.creds.realm,
    clientID: config.creds.clientID,
    clientSecret: config.creds.clientSecret,
    oidcIssuer: config.creds.issuer,
    identityMetadata: config.creds.identityMetadata,
    responseType: config.creds.responseType,
    responseMode: config.creds.responseMode,
    skipUserProfile: config.creds.skipUserProfile,
    scope: config.creds.scope
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    log.info('Example: Email address we received was: ', profile.email);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          // "Auto-registration"
          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      });
    });
  }
));


// configure Express (Section 2)

var app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended : true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.Router());
app.use(express.static('../dist'));

//Routes (Section 4)

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});


app.get('/loginAd',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
  function(req, res) {
    log.info('Login was called in the Sample');
    res.redirect('/');
});

// Our POST routes (Section 3)


// GET /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/loginAd/return',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/#/signin' }),
  function(req, res) {
    res.redirect('/#/landing');
  });

// POST /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.post('/loginAd/return',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/#/signin' }),
  function(req, res) {
    res.redirect('/#/landing');
  });

// POST /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.post('/loginAd/return',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/#/signin' }),
  function(req, res) {
    console.log(req.session)
    res.redirect('/#/landing');
  });

app.post('/logout', function(req, res){
  console.log(req.session)
  req.logout();
  req.session.destroy();
  console.log(req.session)
  res.redirect('/');
});

app.get("/isLoggedInUser",function(req,res){
  console.log(res.session)
  if(req.session.passport != undefined){
    if(req.session.passport.user != null || req.session.passport.user != "" )
      res.send(true);
    else
      res.send(false);
  }else{
    res.send(false);
  }

})


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

app.listen(9000);


// Simple route middleware to ensure user is authenticated. (Section 4)

//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
