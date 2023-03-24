const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/usuarios', validateUser, UserController.Create);
router.put('/usuarios/:id', validateUser, isLoggedIn, UserController.Update);
router.post('/usuarios/:id', isLoggedIn, UserController.Delete);
router.get('/usuarios/:id', isLoggedIn, UserController.Get);

module.exports = router;