const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    primeiro_nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    tarefas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Tarefa'  // Relaciona a mensagem ao modelo `Message`
    }]
});

module.exports = mongoose.model('User', schema);