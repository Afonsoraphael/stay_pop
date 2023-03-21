const { uuid } = require('uuidv4');
const { Order, Product } = require('../models')

const OrderController = {
  Create: async (req, res) => {
    const orderNumber = uuid();
    const productIds = req.session.cart;
    const userId = req.session.user.id;

    for (const productId of productIds) {
      await Order.create({
        productId,
        userId,
        orderNumber,
      })
    }

    return res.redirect('/usuario/produtos')
  },

  AddToCart: async (req, res) => {
    const { id } = req.params;

    req.session.cart = [...id]

    return res.redirect('/usuario/carrinho')
  },

  ShowCart: async (req, res) => {
    const cart = req.session.cart

    const products = [];

    for (const id of cart) {
      const product = await Product.findByPk(id, { raw: true })
      products.push(product)
    }

    return res.status(200).json(products)
    // return res.render('show-cart.ejs', {products})
  },

  Orders: async (req, res) => {
    const { id } = req.session.user

    const products = await Product.findAll({
      include: {
        association: "user",
        where: {
          userId: id
        },
        required: true,
      }
    })

    return products;
  }
}

module.exports = OrderController