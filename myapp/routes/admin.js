const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const prodController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');
const authAdmin = require('../middlewares/authAdmin');

const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');

router.get('/', authAdmin, controller.adminPortal);
/* Admin Profile */
router.get('/users/:id', authAdmin, usersController.adminProfile);
router.get('/users', authAdmin, usersController.usersAdmin);

router.get('/products', authAdmin, prodController.productsAdmin);

module.exports = router;
