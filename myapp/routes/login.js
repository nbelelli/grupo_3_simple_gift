const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


/* GET login page. */

router.get('/login', loginController.login);

module.exports = router;

