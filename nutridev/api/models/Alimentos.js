const mongoose = require('mongoose');
const { Schema } = mongoose;

const alimento = new Schema({
    nome: {
        type: String
    },
    gramas: {
        type: String
    },
    carbo: {
        type: String
    },
    proteina: {
        type: String
    },
    gordura: {
        type: String
    },
    kcal: {
        type: String
    },
    valor: {
        type: String
    },
},{
    timestamps: true
});

mongoose.model('Alimento', alimento);