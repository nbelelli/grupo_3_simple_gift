const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

//Ir al listado de productos
router.get('/', controller.products);
//ir a la pagina de carga de producto
router.get('/create', controller.create);

module.exports = router;
