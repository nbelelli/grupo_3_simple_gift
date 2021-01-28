const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/', controller.adminPortal);
router.get('/users', controller.usersAdmin);

module.exports = router;
