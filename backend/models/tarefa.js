const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: { type: String, required: true }, // <-- Adicionado o campo título
    descricao: { type: String }, // opcional, será preenchido depois
    dataInicio: { type: Date },
    dataPrevisao: { type: Date },
    dataConclusao: { type: Date },  // Só preenchida quando a tarefa for finalizada
    status: {
        type: String,
        enum: ['finalizado', 'pendente'],
        default: 'pendente'
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Tarefa', schema);

