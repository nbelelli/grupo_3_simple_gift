const fs = require('fs');
const path = require('path');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

function getAllProducts() {
	//Devuelve la DB en un array de objetos literales
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function writeProducts(productsToSave) {
	//Recibe un Array de objetos literales.
	//Lo convierte en un JSON
	//Reemplaza TODO el json de DB con este neuvo JSON
	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
	return fs.writeFileSync(productsFilePath, productsToStringify);
}

function generateNewId() {
	const products = getAllProducts();
	return products.pop().id + 1;
}

const productsController = {
	/* Navigates to the products list page */
	products: (req, res) => {
		res.locals.title = 'Products';
		res.render('Products/productsList');
		console.log(generateNewId());
	},
	/* Navigates to the Create product page */
	create: (req, res) => {
		res.locals.title = 'Create';
		res.render('Products/productCreate');
	},

	edit: (req, res) => {
		res.locals.title = 'Edit';
		res.render('Products/productEdit');
	},
	detail: (req, res) => {
		const products = getAllProducts();
		const theProduct = products.find((prod) => {
			return prod.id == req.params.id;
		});
		console.log(theProduct);
		if (theProduct == undefined) {
			res.send('Producto no encontrado');
		} else {
			res.render('Products/productDetail', { theProduct: theProduct });
		}
	},
};

module.exports = productsController;
