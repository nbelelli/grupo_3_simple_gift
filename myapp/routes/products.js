const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//Ir al listado de productos
router.get('/', productsController.products);
//ir a la pagina de carga de producto
router.get('/create', productsController.create);
//ir a la pagina de Edicion de producto
router.get('/edit', productsController.edit);
//ir a la pagina de Detalle de Producto
router.get('/:id', productsController.detail);
//borrar un producto
router.delete('/:id/delete', productsController.delete);

module.exports = router;
