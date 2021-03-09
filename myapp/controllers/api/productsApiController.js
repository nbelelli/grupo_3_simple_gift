const { Product } = require('../../database/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const productsApiController = {
	list: async (req, res) => {
		try {
			const products = await Product.findAll({
				include: [
					{
						association: 'Images',
					},
					{
						association: 'Category',
					},
				],
			});

			const countArray = await Product.sequelize.query(
				'SELECT categories.id, categories.name, COUNT(products.category_id) AS count FROM products  RIGHT JOIN categories ON category_id = categories.id GROUP BY categories.name ORDER BY categories.id',
				{ type: sequelize.QueryTypes.SELECT }
			);

			let countByCategory = {};

			for (category of countArray) {
				countByCategory[category.name] = category.count;
			}

			res.json({
				meta: {
					status: 200,
					count: products.length,
					url: '/api/products',
					countByCategory: countByCategory,
				},
				data: {
					products,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'Server Error',
			});
		}
	},

	find: async (req, res) => {
		try {
			const theProduct = await Product.findOne({
				where: {
					id: req.params.id,
				},
				include: [
					{
						association: 'Images',
					},
				],
			});
			res.json({
				meta: {
					status: 200,
				},
				data: {
					theProduct,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'Server error',
			});
		}
	},

	category: async (req, res) => {
		try {
			const products = await Product.findAll({
				where: {
					category_id: req.params.cat,
				},
				include: [
					{
						association: 'Images',
					},
				],
			});
			res.json({
				meta: {
					status: 200,
					count: products.length,
					url: '/api/products',
				},
				data: {
					products,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'No products found',
			});
		}
	},

	/* 	search: async (req, res) => {
		try {
			const products = await Product.findAll({
				where: { name: { [Op.like]: '%' + req.params.keyword + '%' } })
		} catch (error) {
			
		}, */

	search: async (req, res) => {
		try {
			const products = await Product.findAll({
				where: { name: { [Op.like]: '%' + req.params.keyword + '%' } },
				include: [
					{
						association: 'Images',
					},
					{
						association: 'Category',
					},
				],
			});
			res.json({
				meta: {
					status: 200,
					count: products.length,
				},
				data: {
					products,
				},
			});
		} catch (error) {}
	},

	lastProduct: async (req, res) => {
		try {
			const product = await Product.findAll({
				limit: 1,
				order: [['id', 'DESC']],

				include: [
					{
						association: 'Images',
					},
				],
			});

			res.json({
				meta: {
					status: 200,
					url: '/api/products/lastProduct',
				},
				data: {
					product,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'No products found AAAAA',
			});
		}
	},
};

module.exports = productsApiController;
