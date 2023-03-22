const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/users', validateUser, UserController.Create);
router.put('/users/:id', validateUser, isLoggedIn, UserController.Update);
router.post('/users/:id', isLoggedIn, UserController.Delete);

module.exports = router;