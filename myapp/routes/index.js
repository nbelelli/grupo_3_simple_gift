const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');

/* GET home page. */
/* router.get('/', function (req, res) {
	res.render('index');
}); */

router.get('/', controller.home);

module.exports = router;
