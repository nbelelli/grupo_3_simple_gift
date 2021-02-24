const db = require('../database/models');

adminController = {
	adminPortal: (req, res) => {
		res.locals.title = 'Admin Portal';
		const rol = req.session.user.rol;
		return res.render('Admin/adminPortal', { rol });
	},
};

module.exports = adminController;
