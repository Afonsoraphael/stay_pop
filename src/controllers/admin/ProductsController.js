const AdminProductsController = {
  Create: async (req, res) => {
    const {
      name,
      price, 
      description,
      category,
      img,
    } = req.body
    
    if (!name || !price || !description || !category) {
      return res.json({error: 'Invalid fields!'})
      // return res.status(404).redirect('/admin/produtos');
    }

    const productCreated = await Product.create({
      name,
      price, 
      description,
      category,
      img
    })

    return res.json(productCreated);
    // return res.status(404).redirect('/admin/produtos');
  },

  Update: async (req, res) => {
    
  }
}