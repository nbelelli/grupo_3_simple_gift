const express = require('express');
const router = express.Router();
const catController = require('../../controllers/api/categoriesApiController');

router.get('/', catController.list);

module.exports = router;
