adminController = {
	adminPortal: (req, res) => {
		res.locals.title = 'Product Cart';
		res.render('Admin/adminPortal');
	},
	usersAdmin: (req, res) => {
		res.locals.title = 'Product Cart';
		res.render('Admin/usersAdmin');
	},
};

module.exports = adminController;
