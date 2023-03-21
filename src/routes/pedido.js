const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.get('/pedidos/finalizar', OrderController.showFinalizePedido);
router.get('/pedidos/realizado', OrderController.showPedidoRealizado);