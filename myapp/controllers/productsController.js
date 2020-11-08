const productsController = {
	products: (req, res) => {
		res.render('Products/productsList');
	},
	create: (req, res) => {
		res.render('Products/productCreate');
	},
};

module.exports = productsController;
