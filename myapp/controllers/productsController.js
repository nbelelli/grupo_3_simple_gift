const productsController = {
	/* Navigates to the products list page */
	products: (req, res) => {
		res.locals.title = "Products";  
		res.render('Products/productsList');
	},
	/* Navigates to the Create product page */
	create: (req, res) => {
		res.locals.title = "Create";  
		res.render('Products/productCreate');
	},

	edit: (req, res)=> {
		res.locals.title = "Edit";  
		res.render('Products/productEdit');
	},
	detail: (req, res) => {
		res.render('Products/productDetail');
	},
};

module.exports = productsController;
