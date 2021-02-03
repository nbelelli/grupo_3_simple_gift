const db = require('../database/models');

adminController = {
	adminPortal: (req, res) => {
		res.locals.title = 'Admin Portal';
		res.render('Admin/adminPortal');
	},
};

module.exports = adminController;
