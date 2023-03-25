const { Product } = require("../models");

const ProductController = {
  List: async (req, res) => {
    try {
      const { category } = req.query;
      let products;

      if (category) {
        products = await Product.findAll({
          where: {
            category,
          },
        });
      } else {
        products = await Product.findAll();
      }

      return res.render("lista-de-produtos", { products });
    } catch (error) {
      console.log(error);
      return res.status(500).redirect("/");
    }
  },

  Get: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) return res.status(404).json({ error: "Product not found" });

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.redirect('/')
    }
  },
};

module.exports = ProductController;
