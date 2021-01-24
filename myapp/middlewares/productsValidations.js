const db = require('../database/models');
const { check, validationResult, body } = require('express-validator');
const path = require('path');
const bcrypt = require('bcrypt');
const usersController = require('../controllers/usersController');

module.exports = {
	create: [
		body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
		body('price').notEmpty().withMessage('El Precio no puede estar vacio'),
		body('discount')
			.notEmpty()
			.withMessage('Si el producto no esta en oferta, por favor ingresar"0"')
			.bail()
			.isInt({ min: 0, max: 99 })
			.withMessage('El descuento maximo es de 99%'),
		body('image')
			.custom((value, { req }) => {
				return req.files[0];
			})
			.withMessage('El producto debe tener al menos una imagen')
			.bail()
			.custom((value, { req }) => {
				/* const extn = path.extname(req.files[0].originalname); */
				for (image of req.files) {
					let extn = path.extname(image.originalname);
					console.log('extension:', extn);
					console.log(extn == '.jpg' || extn == '.png' || extn == '.jpeg');

					if (!(extn == '.jpg' || extn == '.png' || extn == '.jpeg')) {
						console.log('entre al if');
						return false;
					}
				}
				return true;
			})
			.withMessage('Al menos una de las imagenes tiene un formato incorrecto'),
		body('description')
			.notEmpty()
			.withMessage('La descripcion no puede estar vacia'),
	],
};
