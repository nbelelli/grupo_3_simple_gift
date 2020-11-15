const usersController = {
	register: (req, res) => {
		res.locals.title = "Register";  
		res.render('register');
	},
	login: (req, res) => {
		res.locals.title = "Login";  
		res.render('login');
	},
};


module.exports = usersController;
