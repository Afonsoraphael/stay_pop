const { Product } = require('../models')

const ProductController = {
  create: async (req, res) => {
    const {
      name,
      price, 
      description,
      category,
      img,
    } = req.body
    
    if (!name || !price || !description || !category) {
      return res.status(404).json({error: 'Name, Price, Description and Category cannot be empty!'})
    }

    const productCreated = await Product.create({
      name,
      price, 
      description,
      category,
      img
    })

    return res.status(201).json(productCreated)
  },

  list: async (req, res) => {
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

  getOne: async (req, res) => {
    const { id } = req.params

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Product not found'})

    return res.json(product)
  }
}

module.exports = ProductController