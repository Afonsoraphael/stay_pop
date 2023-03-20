const express = require('express')

const router = express.Router();
const ProductController = require('../controllers/ProductController')
const isAdmin = require('../middlewares/isAdmin')

router.post('/admin/products', isAdmin, ProductController.create)
router.get('/products', ProductController.list)
router.get('/products/:id', ProductController.getOne)

module.exports = router