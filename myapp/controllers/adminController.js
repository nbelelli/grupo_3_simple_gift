const db = require('../database/models');

adminController = {
	adminPortal: (req, res) => {
		res.locals.title = 'Admin Portal';
		res.render('Admin/adminPortal');
	},
	usersAdmin: (req, res) => {
		res.locals.title = 'Users Admin';
		res.render('Admin/usersAdmin');
	},
	productsAdmin: async (req, res) => {
		res.locals.title = 'Products Admin';

		const products = await db.Product.findAll({
			include: [
				{
					association: 'Images',
				},
			],
		});

		res.render('Admin/productsAdmin', { products: products });
	},
};

module.exports = adminController;
