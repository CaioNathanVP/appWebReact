const tarefasRoutes = require('./routes/tarefas');
const userRoutes = require('./routes/users');
const appRoutes = require('./routes/app');
const loginRoutes = require('./routes/login');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var path = require('path');

//var appRoutes = require('./routes/app');



// NOVO
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MyMongoDB')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });
// NOVO

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
// Configuração do CORS (corrigida)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/tarefas', tarefasRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
 