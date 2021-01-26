adminController = {
	adminPortal: (req, res) => {
		res.locals.title = 'Product Cart';
		res.render('Admin/adminPortal');
	},
};

module.exports = adminController;
