const express = require("express");
const router = express.Router();
const Tarefa = require("../models/tarefa");
const User = require("../models/user");

// Rota para listar todas as tarefas de um usuário (utilizando o e-mail)
router.get("/:email", async function (req, res, next) {
  try {
    const email = req.params.email;

    // Buscar o usuário pelo e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const tarefaFindTodas = await Tarefa.find({ user: user._id });
    res.status(200).json({
      myTaskSuccess: "Tarefas recuperadas com sucesso",
      objTaskRecovered: tarefaFindTodas,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Erro no servidor",
      myError: err.message,
    });
  }
});

// GET: Buscar uma tarefa por ID
router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findById(id).populate("user", "email");

    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    res.status(200).json({
      mensagem: "Tarefa encontrada com sucesso",
      tarefa: {
        _id: tarefa._id,
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dataInicio: tarefa.dataInicio,
        dataPrevisao: tarefa.dataPrevisao,
        dataConclusao: tarefa.dataConclusao,
        status: tarefa.status,
        email: tarefa.user?.email || "não encontrado",
      },
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro ao buscar tarefa",
      erro: err.message,
    });
  }
});



// POST: Criar nova tarefa associada a um usuário por e-mail
router.post("/:email", async (req, res) => {

  console.log("Criando nova tarefa para o usuário com e-mail:", req.params.email);
  try {
    const email = req.params.email;
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({ mensagem: "Campo obrigatório: título." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const novaTarefa = new Tarefa({
      titulo,
      user: user._id,
    });

    const tarefaSalva = await novaTarefa.save();

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso",
      tarefa: tarefaSalva,
    });

  } catch (err) {
    return res.status(500).json({
      mensagem: "Erro ao salvar tarefa",
      erro: err.message,
    });
  }
});

// PUT: Atualizar uma tarefa por ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descricao,
      dataInicio,
      dataPrevisao,
      dataConclusao,
      status
    } = req.body;

    // Função que converte uma string yyyy-MM-dd para data local sem aplicar UTC
    const ajustarDataLocal = (dataStr) => {
      if (!dataStr) return null;
      const [ano, mes, dia] = dataStr.split('-').map(Number);
      return new Date(ano, mes - 1, dia); // mês começa em 0
    };

    const camposAtualizados = {
      ...(titulo && { titulo }),
      ...(descricao && { descricao }),
      ...(dataInicio && { dataInicio: ajustarDataLocal(dataInicio) }),
      ...(dataPrevisao && { dataPrevisao: ajustarDataLocal(dataPrevisao) }),
      ...(dataConclusao && { dataConclusao: ajustarDataLocal(dataConclusao) }),
      ...(status !== undefined && status !== null && { status }),
    };

    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, camposAtualizados, { new: true });

    if (!tarefaAtualizada) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    res.status(200).json({
      mensagem: "Tarefa atualizada com sucesso",
      tarefa: tarefaAtualizada,
    });
  } catch (err) {
    res.status(500).json({
      mensagem: "Erro ao atualizar tarefa",
      erro: err.message,
    });
  }
});



// DELETE: Deletar uma tarefa por ID
router.delete("/:id", async (req, res) => {
  console.log("deletando tarefa");
  try {
    const { id } = req.params;

    const tarefaDeletada = await Tarefa.findByIdAndDelete(id);
    console.log("Tarefa deletada:", tarefaDeletada);
    if (!tarefaDeletada) {
      return res.status(404).json({
        mensagem: "Tarefa não encontrada",
        erro: "ID inválido ou inexistente.",
      });
    }

    res.status(200).json({
      mensagem: "Tarefa deletada com sucesso",
      tarefa: tarefaDeletada,
    });
  } catch (err) {
    return res.status(500).json({
      mensagem: "Erro ao deletar tarefa",
      erro: err.message,
    });
  }
});

module.exports = router;

