const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
const userValidations = require('../middlewares/userValidations');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

//Multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/avatar');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage });

/* GET users listing. Esta estaba por express Generator, evaluar si quitar o dejar*/
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});/*

* GET login page. */
router.get('/login', guest, usersController.login);
router.post('/login', userValidations.login, usersController.processLogin);

/* POST register page: User Generator */
router.post(
	'/register',
	upload.any(),
	userValidations.register,

	usersController.storeUser
);

router.get('/register', guest, usersController.register);

/* Log Out */
router.get('/logout', auth, usersController.logout);

/* Profile */
router.get('/profile', auth, usersController.profile);

/* Edit Profile */
router.get('/:id/edit', auth, usersController.edit);

//Editar un usuario
router.put('/:id/edit', upload.any(), usersController.update);

module.exports = router;
