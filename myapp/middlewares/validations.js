const db = require('../database/models');
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const bcrypt = require('bcrypt');
const usersController = require('../controllers/usersController');

module.exports = {
	login: [
		body('email')
			.notEmpty()
			.withMessage('Por favor, ingrese su Email')
			.bail()
			.custom(async (value) => {
				let theUser = await db.User.findOne({
					where: {
						email: value,
					},
				});
				if (!theUser) {
					return Promise.reject();
				}
			})
			.withMessage('El usuario ingresado no existe')
			.bail()
			.custom(async (value, { req }) => {
				let theUser = await db.User.findOne({
					where: {
						email: value,
					},
				});
				if (!bcrypt.compareSync(req.body.password, theUser.password)) {
					return Promise.reject();
				}
			})
			.withMessage('La contraseña es incorrecta'),
	],
};
