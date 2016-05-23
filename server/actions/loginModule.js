//Active Directory Login Module
var loginModule = function() {
	var userModel = require("../db-definitions").userModel,
			utils = require("./utils");

	function login(req, res) {
		var loginEmail = req.body.email,
			loginPwd = req.body.password,
			isFound = false;

		/*dummyLogins.forEach(function(user, index, array) {
			if (user.email === loginEmail && user.password === loginPwd) {
				req.session.email = loginEmail
				isFound = true;
			}
		});*/

		userModel.find({
			where: {
				user_email: loginEmail,
				user_password: loginPwd
			},
			attributes : ["user_name","id", "user_email","userRole"]
		}).then(function(data) {
				if(utils.isNotNullOrEmpty(data)){
					console.log("data found");
					req.session.user = {};
					req.session.user.id = data.id;
					req.session.user.username = data.user_name;
					req.session.user.email = data.user_email;
					req.session.user.userRole = data.userRole;
					res.send(data);
				} else {
					console.log("data not found");
					res.sendStatus(500);
				}
			},
			function(err) {
				console.log(err);
				res.sendStatus(500)
			});

	}

	function loginAd(req, res) {
		res.redirect('/#/landing');
	}

	function logOut(req, res) {
		req.session.destroy(function() {
			req.logout();
			res.redirect('/');
		});
	}

	function isUserLoggedIn(req, res) {
    console.log("isUserLoggedIn");
    console.log(req.session)
    var userData = {
      user: {},
      isLoggedIn : false
    };

    if (req.session.passport != undefined) {
      if (req.session.passport.user != null || req.session.passport.user != ""){
        userData.user = req.session.passport.user
        userData.isLoggedIn = true;
      }
    } else if (req.session.user != undefined) {
      if (req.session.user.email != null || req.session.user.email != ""){
        userData.user = req.session.user
        userData.isLoggedIn = true;
      }
    }

    res.send(userData);
  }

	function fetchCurrentUser(req, res){
		res.send(req.session.user)
	}

	return {
		login: login,
		loginAd: loginAd,
		logOut: logOut,
		isUserLoggedIn: isUserLoggedIn,
		fetchCurrentUser: fetchCurrentUser
	}
};


module.exports = loginModule();