const productsController = {
	/* Navigates to the products list page */
	products: (req, res) => {
		res.render('Products/productsList');
	},

	/* Navigates to the Create product page */
	create: (req, res) => {
		res.render('Products/productCreate');
	},
};

module.exports = productsController;
