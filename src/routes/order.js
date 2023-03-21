const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.get('/usuario/carrinho', OrderController.ShowCart);
router.get('/usuario/carrinho/add', OrderController.AddToCart)
router.get('/usuario/pedidos', OrderController.Orders);