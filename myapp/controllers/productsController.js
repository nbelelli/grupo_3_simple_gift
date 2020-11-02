const productsController = {
	products: (req, res) => {
		res.render('./Products/productsList');
	},
};

module.exports = productsController;
