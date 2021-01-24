const { renderFile } = require('ejs');
const { get } = require('http');
const db = require('../database/models');
const Product = require('../database/models/Product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { check, validationResult, body } = require('express-validator');

const productsController = {
	/* Navigates to the products list page */
	products: async (req, res) => {
		res.locals.title = 'Products';
		const products = await db.Product.findAll({
			include: [
				{
					association: 'Images',
				},
			],
		});

		if (req.params.cat) {
			const catProducts = await db.Product.findAll({
				where: {
					category_id: req.params.cat,
				},
				include: [
					{
						association: 'Images',
					},
				],
			});
			return res.render('Products/productsList', { products: catProducts });
		}

		if (req.query.search) {
			const foundProducts = await db.Product.findAll({
				where: { name: { [Op.like]: '%' + req.query.search + '%' } },
				include: [
					{
						association: 'Images',
					},
				],
			});
			return res.render('Products/productsList', { products: foundProducts });
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.title = 'Create';
			const categories = await db.Category.findAll();
			return res.render('Products/productCreate', {
				errors: errors.errors,
				categories: categories,
			});
		}

		const productCreated = await db.Product.create({
			category_id: req.body.category,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			stock: req.body.stock,
			best_seller: req.body.bestSeller ? 1 : 0,
			description: req.body.description,
		});
		const images = req.files;
		const imagesArray = images.map((image) => {
			const newImage = {
				file_name: image.filename,
				product_id: productCreated.id,
			};
			return newImage;
		});
		await db.Image.bulkCreate(imagesArray);
		return res.redirect('/');
	},

	detail: async (req, res) => {
		const theProduct = await db.Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					association: 'Images',
				},
			],
		});
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
		await db.Image.destroy({
			where: {
				product_id: req.params.id,
			},
		});

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
		const productToEdit = await db.Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					association: 'Images',
				},
			],
		});
		res.render('Products/productEdit', {
			productToEdit: productToEdit,
			categories: categories,
		});
	},
	update: async (req, res) => {
		const productToEdit = await db.Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					association: 'Images',
				},
			],
		});

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.title = 'Edit';
			const categories = await db.Category.findAll();
			return res.render('Products/productEdit', {
				errors: errors.errors,
				categories: categories,
				productToEdit: productToEdit,
			});
		}

		await db.Product.update(
			{
				category_id: req.body.category,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				stock: req.body.stock,
				best_seller: req.body.bestSeller ? 1 : 0,
				description: req.body.description,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		if (req.files[0]) {
			await db.Image.destroy({
				where: {
					product_id: req.params.id,
				},
			});
			const images = req.files;
			const imagesArray = images.map((image) => {
				const newImage = {
					file_name: image.filename,
					product_id: req.params.id,
				};
				return newImage;
			});
			await db.Image.bulkCreate(imagesArray);
		}
		res.redirect('/products/' + req.params.id);
	},
};

module.exports = productsController;
