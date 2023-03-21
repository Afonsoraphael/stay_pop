const { uuid } = require('uuidv4');

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
  }
}