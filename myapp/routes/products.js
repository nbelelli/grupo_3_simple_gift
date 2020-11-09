const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
const controller = require('../controllers/productsController');

//Ir al listado de productos
router.get('/', controller.products);
//ir a la pagina de carga de producto
router.get('/create', controller.create);
//ir a la pagina de Edicion de producto
router.get('/edit', productsController.edit);


module.exports = router;
