const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/* GET register page. */

router.get('/register', registerController.register);
  
module.exports = router;