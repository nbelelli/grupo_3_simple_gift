const { Product } = require('../../database/models');

const productsApiController = {
	list: async (req, res) => {
		try {
			const products = await Product.findAll({
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

	store: async (req, res) => {
		try {
			const productCreated = await Product.create({
				category_id: req.body.category,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				stock: req.body.stock,
				best_seller: req.body.bestSeller ? 1 : 0,
				description: req.body.description,
			});
			console.log('the product', productCreated);
			/* 			const images = req.files;
			const imagesArray = images.map((image) => {
				const newImage = {
					file_name: image.filename,
					product_id: productCreated.id,
				};
				return newImage;
			});
			await db.Image.bulkCreate(imagesArray); */
			res.json({
				meta: {
					status: 200,
				},
				data: {
					productCreated,
				},
			});
		} catch (error) {
			console.log(error);
			res.status(404).json({
				meta: {
					status: 'error',
				},
				error: 'Product could not be created',
			});
		}
	},
};

module.exports = productsApiController;
