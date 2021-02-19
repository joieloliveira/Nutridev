const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardcad = new Schema({
    refeicao: [{
        type: String
    }],
    alimentos: [{
        type: String
    }],
    gramas: [{
        type: String
    }],
    carbo: [{
        type: String
    }],
    proteina: [{
        type: String
    }],
    gordura: [{
        type: String
    }],
    kcal: [{
        type: String
    }],
    valor: [{
        type: String
    }],
    total: [{
        type: String
    }],
},{
    timestamps: true
});

mongoose.model('CardCad', cardcad);