const { Product } = require('../../models')

const AdminProductsController = {
  ShowCreate: async (req, res) => {
    return res.render("TelaDeCriacaoDeProduto.ejs")
  },
  Create: async (req, res) => {
    const {
      name,
      price, 
      description,
      category,
      img,
    } = req.body
    
    if (!name || !price || !description || !category) {
      // return res.status(404).redirect('/admin/produtos');
      return res.json({error: 'Invalid fields!'})
    }

    const productCreated = await Product.create({
      name,
      price, 
      description,
      category,
      img
    })

    // return res.status(404).redirect('/admin/produtos');
    return res.json(productCreated);
  },

  ShowUpdate: async (req, res) => {
    const { id } = req.params

    const product = await Product.findByPk(id)

    return res.render("telaDeAtualizacaoDeProduto.ejs", {product})
  },
  Update: async (req, res) => {
    const {name, price, description, category, img} = req.body;
    
    const {id} = req.params
    
    const productUpdated = await Product.updated({name, price, description, category, img}, {
      where: { id }
    })

    // return res.redirect('/admin/produtos')
    return res.json(productUpdated);
  },

  Delete: async (req, res) => {
    const { id } = req.params

    const verifyIfExists = await Product.findByPk(id)
    
    if(!verifyIfExists) {
      return res.status(404).json({error: 'Product not found'})
      // return res.redirect("/admin/produtos")
    }

    await Product.delete({
      where: { id: id }
    })

    // return res.redirect("/admin/produtos")
    return res.status(200).json()
  },

  Get: async (req, res) => {
    const {id} = req.params

    const product = await Product.findByPk(id)

    if(!product) return res.status(404).json()

    // return res.render("detalhesDoProduto.ejs", {product})
    return res.status(200).json(product)
  },

  List: async (req, res) => {
    const {category, name, min, max} = req.query
    
    const categoryFilter = category || "";
    const nameFilter = name || "";
    const minPriceFilter = min || 0;
    const maxPriceFilter = max || 1000;

    const operator = !max ? {[Op.gte]: minPriceFilter} : {[Op.between]: [minPriceFilter, maxPriceFilter]}
    
    const products = await Product.findAll({
      where: {
        category: categoryFilter,
        name: nameFilter,
        price: operator
      }
    });

    // return res.render("listaDeProdutosAdmin", {products})
    return res.json(products)
  }
}

module.exports = AdminProductsController