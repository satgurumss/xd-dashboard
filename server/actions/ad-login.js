//Active Directory Login Module
var loginModule = function(){
 
	function login(req, res){
		console.log("login");
		res.sendStatus(200);
	}

	return{
		login: login
	}
};


module.exports = loginModule();