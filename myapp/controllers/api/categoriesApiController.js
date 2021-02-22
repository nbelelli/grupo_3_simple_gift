const { Category } = require('../../database/models');
const { Product } = require('../../database/models');

const catController = {
	list: async (req, res) => {
		try {
			const categories = await Category.findAll();
			res.json({
				meta: {
					status: 200,
					count: categories.length,
					url: '/api/categories',
				},
				data: {
					categories,
				},
			});
		} catch (error) {
			error: 'server error';
		}
	},
};

module.exports = catController;
