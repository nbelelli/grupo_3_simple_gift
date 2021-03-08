const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const { products } = require('../controllers/productsController');
const productsValidations = require('../middlewares/productsValidations');
const authAdmin = require('../middlewares/authAdmin');
const auth = require('../middlewares/auth');

//Multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/products');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage });

//Ir al listado de productos
router.get('/', productsController.products);

//ir a la pagina de carga de producto
router.get('/create', authAdmin, productsController.create);
//ir a la pagina de Edicion de producto
router.get('/:id/edit', authAdmin, productsController.edit);
//Editar un producto(put)
router.put(
	'/:id/edit',
	upload.any(),
	productsValidations.edit,
	productsController.update
);
//ir a la pagina de Detalle de Producto
router.get('/:id', productsController.detail);
//borrar un producto
router.delete('/:id/delete', productsController.delete);

//Acción de creación (a donde se envía el formulario)
router.post(
	'/create',
	upload.any(),
	productsValidations.create,
	productsController.store
);

module.exports = router;
