const { Product } = require('../models')

const ProductController = {
  List: async (req, res) => {
    const { category } = req.query;
    let products;
    
    if(category) {
      products = await Product.findAll({
        where: {
          category
        }
      })
    } else {
      products = await Product.findAll();
    }

    return res.status(200).json(products)
  },

  Get: async (req, res) => {
    const { id } = req.params

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Product not found'})

    return res.json(product)
  }
}

module.exports = ProductController