const express = require('express');
const HomeController = require('../controllers/HomeController');
const router = express.Router();

router.get('/', HomeController.showHomePage);
router.get('/carrinho', HomeController.showCarrinho);
router.get('/pedidos/finalizar', HomeController.showFinalizePedido);
router.get('/pedidos/realizado', HomeController.showPedidoRealizado);
router.get('/login', HomeController.showLogin);
router.post('/login', HomeController.processLogin);
router.get('/produtos', HomeController.showProductPage);
router.get('/produtos/:id', HomeController.showProductPage);

module.exports = router;
