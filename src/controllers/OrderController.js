const { validationResult } = require("express-validator");
const { uuid } = require("uuidv4");
const {
  Order,
  Product,
  UserHasOrder,
  sequelize,
  Location,
} = require("../models");
const { Op } = require("sequelize");

const OrderController = {
  Create: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json(errors);
    }

    const transaction = await sequelize.transaction();

    const orderNumber = uuid();
    const cart = req.session.cart;
    const userId = req.session.user.id;
    let locationId = req.body.locationId;

    if (!cart) {
      return res.status(404).json({ error: "Cart empty" });
    }

    if (!locationId) {
      const locations = await Location.findAll({
        include: [
          {
            association: "users",
            where: {
              id: req.session.user.id,
            },
            required: true,
          },
        ],
      });
      locationId = locations[0].id;
    }

    const ids = cart.map((product) => product.id);

    const productsInDb = await Product.findAll({
      where: {
        id: [...ids],
      },
    });

    let totalPrice = 0;
    productsInDb.forEach((product) => {
      const productInCart = cart.find(
        (productInCart) => productInCart.id === product.id
      );
      productInCart
        ? (totalPrice += product.price * productInCart.quantity)
        : "";
    });

    let totalProduct = 0;
    cart.forEach((product) => (totalProduct += product.quantity));

    try {
      for (const product of cart) {
        await Order.create(
          {
            productId: product.id,
            orderNumber,
            quantity: product.quantity,
          },
          transaction
        );
      }
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ error: error.message });
    }

    const estimateDate = () => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    };

    try {
      await UserHasOrder.create({
        orderNumber,
        userId,
        totalPrice,
        locationId,
        totalProduct,
        estimateDate: estimateDate(),
      });
      await transaction.commit();
      return res.redirect("/usuario/pedidos");
      // return res.status(201).json({ success: true, message: 'Order created successfully' })
    } catch (error) {
      await transaction.rollback();
      return res.redirect("/");
      // return res.json({ error: error.message })
    }
  },

  AddToCart: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const cart = req.session.cart;

      const productInDb = await Product.findByPk(id);

      if (!productInDb) {
        return res.status(404).redirect("/");
        return res.status(404).json({ error: "Product not found" });
      }

      if (cart) {
        const productInCart = cart.find((product) => product.id === id);

        if (!productInCart) {
          cart.push({ id, quantity: 1 });
        } else {
          const index = cart.indexOf(productInCart);
          cart[index] = { id, quantity: productInCart.quantity + 1 };
        }
        req.session.cart = cart;
      } else {
        req.session.cart = [{ id: id, quantity: 1 }];
      }

      // return res.json({success: `added ${productInDb.name} to cart`});
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Sorry, there was an error in system" });
    }
  },

  ShowCart: async (req, res) => {
    try {
      const cart = req.session.cart;
      const products = [];

      const productsInDb = await Product.findAll();

      if (!cart) {
        // return res.status(404).json({message: 'Cart empty'})
        return res.redirect("/produtos");
      }

      for (const product of cart) {
        const productInDb = await Product.findByPk(product.id, { raw: true });
        products.push({ ...productInDb, quantity: product.quantity });
      }

      // return res.status(200).json(products);
      return res.render("carrinho", { products, productsInDb });
    } catch (error) {
      return res.redirect("/");
    }
  },

  Orders: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const orderNumber = req.query.orderNumber;

      const whereCondition = orderNumber ? { userId, orderNumber } : { userId };

      const userHasOrders = await UserHasOrder.findAll({
        where: whereCondition,
        include: [
          {
            association: "location",
          },
        ],
      });

      const orderNumbers = userHasOrders.map((order) => {
        return order.orderNumber;
      });

      const orders = await Order.findAll(
        {
          where: {
            orderNumber: [...orderNumbers],
          },
          include: [
            {
              association: "product",
              paranoid: false,
            },
          ],
        },
        { paranoid: false }
      );

      const ordersFormatted = userHasOrders.map((userHasOrder) => {
        let orderFiltered = [];
        if (userHasOrder) {
          orders.forEach((order) => {
            if (
              order.product &&
              order.orderNumber === userHasOrder.orderNumber
            ) {
              orderFiltered.push({
                id: order.product ? order.product.id : null,
                quantity: order.quantity,
                name: order.product ? order.product.name : "",
                price: order.product ? order.product.price : "",
                description: order.product ? order.product.description : "",
                category: order.product ? order.product.category : "",
                img: order.product ? order.product.img : "",
              });
            }
          });
        }

        if (orderFiltered !== null) {
          const orderFormatted = {
            ...userHasOrder.toJSON(),
            products: orderFiltered,
            orderNumber: userHasOrder.orderNumber,
            totalPrice: userHasOrder.totalPrice,
            totalProduct: userHasOrder.totalProduct,
            estimateDate: userHasOrder.estimateDate,
          };

          return orderFormatted;
        }
      });

      // return res.render('pedido-realizado', {ordersFormatted} );
      return res.status(200).json(ordersFormatted);
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },
};

module.exports = OrderController;
