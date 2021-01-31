const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const prodController = require('../controllers/productsController');
const authAdmin = require('../middlewares/authAdmin');

const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');

router.get('/', authAdmin, controller.adminPortal);

router.get('/users', authAdmin, controller.usersAdmin);
router.get('/products', authAdmin, prodController.productsAdmin);

module.exports = router;
