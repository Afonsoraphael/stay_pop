const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const isLoggedIn = require('../middlewares//isLoggedIn')

router.get('/usuario/carrinho', OrderController.ShowCart);
router.get('/usuario/carrinho/add/:id', isLoggedIn, OrderController.AddToCart)
router.get('/usuario/pedidos', isLoggedIn, OrderController.Orders);

module.exports = router;