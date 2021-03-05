const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController')

router.get('/:id', usersApiController.findUser)
router.get('/', usersApiController.list)
router.get('/UserEmail/:email', usersApiController.findEmail)
//router.put('/:id', usersApiController.update)
//router.post('/', usersApiController.create)


module.exports = router;