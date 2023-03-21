const express = require('express')
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.get('/produtos', ProductController.List)
router.get('/produtos/:id', ProductController.Get)

module.exports = router