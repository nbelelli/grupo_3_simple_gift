cartController = {
	cart: (req, res) => {
		res.locals.title = "Product Cart";  
		res.render('productCart');
	},
};

module.exports = cartController;
