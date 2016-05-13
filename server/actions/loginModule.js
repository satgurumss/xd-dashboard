//Active Directory Login Module
var loginModule = function() {
	var dummyLogins = [{
		email: "test1@xdensity.com",
		password: "123"
	}, {
		email: "test2@xdensity.com",
		password: "123"
	}];

	function login(req, res) {
		var loginEmail = req.body.email,
			loginPwd = req.body.password,
			isFound = false;
		
		dummyLogins.forEach(function(user, index, array) {
			if (user.email === loginEmail && user.password === loginPwd) {
				req.session.email = loginEmail
				isFound = true;
			}
		});

		res.send(isFound)
	}

	function loginAd(req, res) {
		res.redirect('/#/landing');
	}

	function logout(req, res) {
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
		var isLoggedIn = false;

		if (req.session.passport != undefined) {
			if (req.session.passport.user != null || req.session.passport.user != "")
				isLoggedIn = true;
		} else if (req.session.email != undefined) {
			if (req.session.email != null || req.session.email != "")
				isLoggedIn = true;
		}

		res.send(isLoggedIn);
	}

	return {
		login: login,
		loginAd: loginAd,
		logOut: logOut,
		isUserLoggedIn: isUserLoggedIn
	}
};


module.exports = loginModule();