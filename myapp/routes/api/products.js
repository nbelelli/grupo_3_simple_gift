const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

router.get('/', productsApiController.list);
router.get('/lastProduct', productsApiController.lastProduct);
router.get('/:id', productsApiController.find);
router.get('/category/:cat', productsApiController.category);
router.get('/keyword/:keyword', productsApiController.search);

/* router.post('/', productsApiController.store); */

module.exports = router;
