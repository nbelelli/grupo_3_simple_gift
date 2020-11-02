/* registerController = {
	home: (req, res) => {
		res.render('login');
	},
}; */

const registerController = {
	register: (req, res) => {
		res.render('register');
	},
};

module.exports = registerController;
