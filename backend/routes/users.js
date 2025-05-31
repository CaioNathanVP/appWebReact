var express = require('express');
var router = express.Router();

const User = require('../models/user');

// Rota para cadastro de usuário
router.post('/', async function(req, res, next) {
  const { email, senha, primeiro_nome, sobrenome } = req.body;
  console.log('📥 Dados recebidos no backend:', req.body);
  // Normalizando dados
  const emailNormalized = email?.trim().toLowerCase();
  const senhaNormalized = senha?.trim();

  // Verifica se todos os campos necessários foram fornecidos
  if (!email || !senha || !primeiro_nome || !sobrenome) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  // Verificando se o email já está registrado
  const existingUser = await User.findOne({ email: emailNormalized });
  if (existingUser) {
    return res.status(400).json({ erro: 'Email já está em uso' });
  }

  // Criação do novo usuário
  const userObject = new User({
    email: emailNormalized,
    senha: senhaNormalized,
    primeiro_nome: primeiro_nome,
    sobrenome: sobrenome
  });

  try {
    const userSave = await userObject.save();
    console.log('Usuário salvo:', userSave);

    res.status(201).json({
      myUserSucesso: "Usuário salvo com sucesso",
      objUserSave: userSave
    });
  } catch (err) {
    console.error('Erro ao salvar usuário:', err);
    return res.status(500).json({
      myErrorTitle: "Erro no servidor",
      myError: err.message || err
    });
  }
});

module.exports = router;
