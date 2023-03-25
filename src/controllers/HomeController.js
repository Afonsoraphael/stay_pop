/* aqui se criam as funções para cada página que será acessada, elas puxam a view .ejs */
/* o res.render() irá puxar o arquivo .ejs da página requisitada */
const { User, Product } = require("../models");
const bcrypt = require("bcryptjs");

const HomeController = {
  showHomePage: async (req, res) => {
    try {
      const categoriesInDb = await Product.findAll({
        group: "category",
      });

      const products = await Product.findAll();

      const categories = categoriesInDb.map((product) => {
        return product.category;
      });

      const productsOrderBy = {};

      categories.forEach((category) => {
        productsOrderBy[category] = new Array();
        const productsInCategory = products.find(
          (product) => product.category === category
        );
        productsOrderBy[category].push(productsInCategory);
      });

      return res.render("index", { productsOrderBy, categories, products });
    } catch (error) {
      console.log(error);
      return res.redirect("/login");
    }
  },

  showLogin: (req, res) => {
    return res.render("login");
  },

  processLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.redirect("/login");

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.email,
      isAdmin: user.isAdmin,
    };

    return res.redirect("/");
  },
};

module.exports = HomeController;
