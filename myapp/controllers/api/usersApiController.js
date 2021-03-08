const { User } = require('../../database/models');

const usersApiController = {
	async list(req, res) {
		try {
			const users = await User.findAll({
				attributes: ['id', 'name', 'email'],
			});

			// meta
			res.json({
				meta: {
					status: 200,
					count: users.length,
					url: '/api/users',
				},
				data: {
					users,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'User not found',
			});
		}
	},
	async findUser(req, res) {
		const { id } = req.params;
		try {
			const user = await User.findByPk(id, {
				attributes: ['id', 'name', 'email', 'avatar', 'phone', 'address'],
			});

			// meta
			res.json({
				meta: {
					status: 200,
					status: 'success',
				},
				data: {
					user,
				},
			});
		} catch (error) {
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'User not found',
			});
		}
	},
	async findEmail(req, res) {
		const { email } = req.params;
		try {
			const user = await User.findOne({
				where: { email },
			});
			if (user) {
				// meta
				res.json({
					meta: {
						status: 'success',
						status: 200,
					},
					data: {
						user,
					},
				});
			} else {
				res.json({
					meta: {
						status: 400,
					},
					error: 'Email user not found',
				});
			}
		} catch (error) {
			console.log(error, 'error encontrado');
			res.status(500).json({
				meta: {
					status: 'error',
				},
				error: 'User not found',
			});
		}
	},
};

module.exports = usersApiController;
