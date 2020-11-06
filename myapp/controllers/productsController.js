const productsController = {
	products: (req, res) => {
		res.render('./Products/productsList');
	},
	Detail: (req, res) => {
		res.render('./Products/productDetail');
	},
};

module.exports = productsController;





;