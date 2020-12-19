const { check, validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const usersController = require('../controllers/usersController');

const usersPath = path.join(__dirname, '../data/usersDataBase.json');

function getAllUsers() {
	return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
}

module.exports = {
	login: [
		body('email')
			.notEmpty()
			.withMessage('Por favor, ingrese su Email')
			.bail()
			.custom((value) => {
				return getAllUsers().find((user) => {
					return user.email == value;
				});
			})
			.withMessage('El usuario ingresado no existe')
			.bail()
			.custom((value, { req }) => {
				const theUser = getAllUsers().find((user) => {
					return user.email == value;
				});

				return bcrypt.compareSync(req.body.password, theUser.password);
			})
			.withMessage('La contraseña es incorrecta'),
	],
};
