const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const isLoggedIn = require('../middlewares//isLoggedIn')
const validateFinishOrder = require('../middlewares/validateFinishOrder')

router.get('/usuario/carrinho', isLoggedIn, OrderController.ShowCart);
router.get('/usuario/carrinho/add/:id', isLoggedIn, OrderController.AddToCart)
router.get('/usuario/pedidos', isLoggedIn, OrderController.Orders);
router.get('/usuario/carrinho/finalizar', isLoggedIn, validateFinishOrder, OrderController.Create)

module.exports = router;