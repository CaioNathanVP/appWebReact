var express = require('express');
var router = express.Router();
const User = require('../models/user');

// POST /login
router.post('/', async (req, res) => {  
  const { email, senha } = req.body;

  try {
    // Busca o usuário com o email fornecido
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    // Verifica se a senha fornecida é igual à senha armazenada no banco
    if (user.senha !== senha) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    // Retorna o email do usuário autenticado
    res.status(200).json({ email: user.email });

  } catch (err) {
    return res.status(500).json({
      erro: 'Erro no servidor',
      detalhe: err.message
    });
  }
});

module.exports = router;
