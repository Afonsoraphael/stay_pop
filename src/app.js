//Importações
const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const adminProductsRouter = require('./routes/admin/ProductsRouter');
const session = require('express-session')

//Variáveis
const app = express();
const port = 3000


//Configurações / Middlewares
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use(express.json());
app.use(express.static(path.resolve('src', 'public')));
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'stay-pop-secret',
  resave: true,
  saveUninitialized: false
}))

//Rotas
app.use(homeRouter);
app.use(userRouter);
app.use(productRouter);
app.use(adminProductsRouter);

app.listen(port, () => console.log(`Servidor funcionando na porta ${port}`));

//npm run dev -> nodemon | npm start -> node



