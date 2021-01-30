const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');

router.get('/', authAdmin, controller.adminPortal);

router.get('/users', authAdmin, controller.usersAdmin);
router.get('/products', authAdmin, controller.productsAdmin);

module.exports = router;
