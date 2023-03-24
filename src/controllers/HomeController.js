/* aqui se criam as funções para cada página que será acessada, elas puxam a view .ejs */
 /* o res.render() irá puxar o arquivo .ejs da página requisitada */
const {User} = require('../models')
const bcrypt = require('bcryptjs')

const HomeController = {
    showHomePage: (req, res) => {
        return res.render('index');
    },

    showCarrinho: (req, res) => {
        return res.render('carrinho');
    },

    showFinalizePedido: (req, res) => {
        return res.render('finalize-seu-pedido');
    },

    showLogin: (req, res) => {
        return res.render('login');
    },

    processLogin: async (req, res) => {
        const {email, password} = req.body;

        if(!email || !password) return res.redirect('/login');

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if(!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({error: 'Invalid credentials'});
            // return res.redirect("/login");
        }

        req.session.user = {
            id: user.id,
            name: user.email,
            isAdmin: user.isAdmin,
        }

        return res.status(200).json({success: true});
        // return res.redirect("/")
    },

    showProductPage: (req, res) => {
        return res.render('product');
    },
    
    showPedidoRealizado: (req, res) => {
        return res.render('pedido-realizado');
    },

    showListaDeProdutosPage: (req, res) => {
        return res.render('lista-de-produtos');
    },
}





module.exports = HomeController;
