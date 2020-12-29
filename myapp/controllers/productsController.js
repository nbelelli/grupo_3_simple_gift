const { renderFile } = require('ejs');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const db = require('../database/models');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

/* function getAllProducts() {
	//Devuelve la DB en un array de objetos literales
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
} */

function writeProducts(productsToSave) {
	//Recibe un Array de objetos literales.
	//Lo convierte en un JSON
	//Reemplaza TODO el json de DB con este nuevo JSON
	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
	return fs.writeFileSync(productsFilePath, productsToStringify);
}

function generateNewId() {
	const products = getAllProducts();
	return products.pop().id + 1;
}

const productsController = {
	/* Navigates to the products list page */
	products: async (req, res) => {
		res.locals.title = 'Products';
		const products = await db.Product.findAll();

		if (req.params.cat) {
			/* const catProducts = products.filter((product) => {
				product.category == req.params.cat;
			}); */
			const catProducts = await db.Product.findAll({
				where: {
					category_id: req.params.cat,
				},
			});

			return res.render('Products/productsList', { products: catProducts });
		}

		return res.render('Products/productsList', { products: products });
	},

	/* Navigates to the Create product page */
	create: (req, res) => {
		res.locals.title = 'Create';
		res.render('Products/productCreate');
	},
	/*  Store new product  */
	store: (req, res, next) => {
		const newProduct = {
			id: generateNewId(),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			//select ver como lo solicito, no tiene name
			stock: req.body.stock,
			bestSeller: req.body.bestSeller,
			description: req.body.description,

			image: req.files[0].filename,
		};

		//return newProduct;
		const products = getAllProducts();
		products.push(newProduct);
		writeProducts(products);
		res.redirect('/');
	},

	detail: async (req, res) => {
		const theProduct = await db.Product.findByPk(req.params.id);
		if (theProduct) {
			res.locals.title = theProduct.name;
		} else {
			res.locals.title = 'not found';
		}

		if (theProduct == undefined) {
			return res.send('Producto no encontrado');
		} else {
			return res.render('Products/productDetail', { theProduct: theProduct });
		}
	},
	delete: (req, res) => {
		const products = getAllProducts();
		const newProducts = [];
		for (product of products) {
			if (product.id != req.params.id) {
				newProducts.push(product);
			}
		}

		writeProducts(newProducts);
		res.redirect('/products');
	},
	edit: (req, res) => {
		res.locals.title = 'Edit';
		const products = getAllProducts();
		const productToEdit = products.find((product) => {
			return product.id == req.params.id;
		});
		res.render('Products/productEdit', { productToEdit: productToEdit });
	},
	update: (req, res) => {
		const products = getAllProducts();
		const id = req.params.id;
		const editedProducts = products.map(function (product) {
			if (product.id == id) {
				product.name = req.body.name;
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				product.description = req.body.description;
				product.stock = req.body.stock;
				product.bestSeller = req.body.bestSeller;
				product.image = req.files[0] ? req.files[0].filename : product.image;
			}
			return product;
		});
		console.log(editedProducts);
		writeProducts(editedProducts);
		res.redirect('/products/' + id + '/edit');
	},
};

module.exports = productsController;
