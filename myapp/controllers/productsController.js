const { renderFile } = require('ejs');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const db = require('../database/models');
const Product = require('../database/models/Product');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

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
	create: async (req, res) => {
		res.locals.title = 'Create';
		const categories = await db.Category.findAll();
		res.render('Products/productCreate', { categories: categories });
	},
	/*  Store new product  */
	store: async (req, res, next) => {
		await db.Product.create({
			category_id: req.body.category,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			stock: req.body.stock,
			best_seller: req.body.bestSeller ? 1 : 0,
			description: req.body.description,
			image: req.files[0].filename,
		});

		return res.redirect('/');
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
	delete: async (req, res) => {
		await db.Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.redirect('/products');
	},
	edit: async (req, res) => {
		res.locals.title = 'Edit';
		const categories = await db.Category.findAll();
		const productToEdit = await db.Product.findByPk(req.params.id);
		/* 		const productToEdit = products.find((product) => {
			return product.id == req.params.id;
		}); */
		res.render('Products/productEdit', {
			productToEdit: productToEdit,
			categories: categories,
		});
	},
	update: async (req, res) => {
		const productToEdit = await db.Product.findByPk(req.params.id);
		const currentImage = productToEdit.image;
		await db.Product.update(
			{
				category_id: req.body.category,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				stock: req.body.stock,
				best_seller: req.body.bestSeller ? 1 : 0,
				description: req.body.description,
				image: req.files[0] ? req.files[0].filename : currentImage,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.redirect('/products/' + req.params.id);
	},
};

module.exports = productsController;
