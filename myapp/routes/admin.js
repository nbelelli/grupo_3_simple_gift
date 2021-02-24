const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const prodController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');
const authAdmin = require('../middlewares/authAdmin');
const authSuperAdmin = require('../middlewares/authSuperAdmin');

const multer = require('multer');
const path = require('path');
const userValidations = require('../middlewares/userValidations');

const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/avatar');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage });

router.get('/', authAdmin, controller.adminPortal);
/* Admin Profile */
router.get('/users/create', authSuperAdmin, usersController.createAdmin);
router.get('/users/:id', authAdmin, usersController.adminProfile);

router.get('/users', authSuperAdmin, usersController.usersAdmin);

router.get('/products', authAdmin, prodController.productsAdmin);

router.post(
	'/users/create',
	upload.any(),
	userValidations.register,

	usersController.storeUser
);

module.exports = router;
