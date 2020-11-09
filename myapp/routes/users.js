const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. Esta estaba por express Generator, evaluar si quitar o dejar*/
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});/*

* GET login page. */

router.get('/login', usersController.login);

/* POST register page. */

router.get('/register', usersController.register);


module.exports = router;

