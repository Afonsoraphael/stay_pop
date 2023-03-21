const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin');
const AdminProductsController = require('../../../src/controllers/admin/ProductsController')

router.use(isAdmin);
router.get('/admin/produtos', AdminProductsController.List)
router.get('/admin/products/create', AdminProductsController.ShowCreate)
router.post('/admin/produtos', AdminProductsController.Create)
router.get('/admin/produtos/update', AdminProductsController.ShowUpdate)
router.put('/admin/produtos/:id', AdminProductsController.Update)
router.delete('/admin/produtos/:id', AdminProductsController.Delete)
router.get('/admin/produtos/:id', AdminProductsController.Get)

module.exports = router;