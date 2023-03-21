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
    const { cart } = req.session;
    if(cart) {
        const product = cart.find((product) => product.id === id)
        console.log(product)
        if(!product){ 
          cart.push({id, quantity: 1})
        } else {
          const index = cart.indexOf(product)
          cart[index] = {id, quantity: product.quantity + 1};
        }
        req.session.cart = cart;
    } else {
      req.session.cart = [{id: id, quantity: 1}]
    }
    console.log(req.session.cart)
    return res.json({success: `added ${id} to cart`});
    // return res.redirect('/usuario/carrinho')
  },

  ShowCart: async (req, res) => {
    const { cart } = req.session
    const products = [];

    for (const product of cart) {
      const productInDb = await Product.findByPk(product.id, { raw: true });
      products.push({...productInDb, quantity: product.quantity});
    }

    return res.status(200).json(products);
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