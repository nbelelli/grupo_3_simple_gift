const { renderFile } = require('ejs');
const db = require('../database/models');
const Product = require('../database/models/Product');

indexController = {
	home: async (req, res) => {
		res.locals.title = 'Home';
		const elegidos = await db.Product.findAll({
			where: {
				best_seller: 1,
			},
		});
		res.render('index', { elegidos: elegidos });
	},
};

module.exports = indexController;
