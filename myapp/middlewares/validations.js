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
	register: [
		body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
		body('lastname').notEmpty().withMessage('El apellido no puede estar vacio'),

		body('email')
			.notEmpty()
			.withMessage('El email no puede estar vacio')
			.isEmail()
			.withMessage('Email inválido')
			.custom(async (value) => {
				const exists = await db.User.findOne({
					where: {
						email: value,
					},
				});
				if (exists) {
					return Promise.reject();
				}
			})
			.withMessage('El usuario ya existe'),
		body('password')
			.notEmpty()
			.withMessage('La contraseña no puede estar vacia')
			.isLength({ min: 6 })
			.withMessage('La contraseña debe tener al menos 6 caracteres'),
		body('retype')
			.notEmpty()
			.withMessage('Por favor repita su contraseña')
			.custom((value, { req }) => {
				return value == req.body.password;
			})
			.withMessage('Las contraseñas deben coincidir'),
	],
};
