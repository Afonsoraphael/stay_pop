const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin');

router.use(isAdmin);
router.get('/admin/produtos', AdminProductsController.List)
router.post('/admin/produtos', AdminProductsController.Create)
router.put('/admin/produtos/:id', AdminProductsController.Update)
router.delete('/admin/produtos/:id', AdminProductsController.Delete)
router.get('/admin/produtos/:id', AdminProductsController.Get)

module.exports = router;