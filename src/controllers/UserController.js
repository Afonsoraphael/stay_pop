const bcrypt = require('bcryptjs')
const { User } = require('../models')

const UserController = {
  createUser: async (req, res) => {
    const {name, email, password, isAdmin} = req.body;
    if(!name.trim() || !email.trim() || !password.trim()) {
      return res.json({error: 'Todos os campos devem ser preenchidos!'})
    }

    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin
    }
    try {
      const userCreated = await User.create(newUser, {raw: true})
      
      const userCreatedWithoutPassword = new User({
        id: userCreated.id,  
        name: userCreated.name,
        email: userCreated.email,
        isAdmin: userCreated.isAdmin
      })
      
      return res.json(userCreatedWithoutPassword)
    } catch (err) {
      return res.json(err.message)
    }
  }
}

module.exports = UserController;