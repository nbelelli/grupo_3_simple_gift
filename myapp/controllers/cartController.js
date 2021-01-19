cartController = {
	cart: (req, res) => {
		res.locals.title = 'Product Cart';
		res.render('Products/productCart');
	},
};

module.exports = cartController;
