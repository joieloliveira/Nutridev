const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Alimentos');
const Alimento = mongoose.model('Alimento');

require('./models/CardCads');
const CardCad = mongoose.model('CardCad');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/nutridev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o BD MongoDB realizado com sucesso!");
}).catch((err) => {
    console.log("Erro: Conexão com o BD MongoDB não realizado com sucesso: " + err);
});
//Carregar alimentos===========================================
app.get('/alimentos', async (req, res) => {
    // return res.json({alimentos:[{
    //     _id:1,
    //     nome:'Test',
    //     gramas:10,
    //     valor:20
    // },{
    //     _id:2,
    //     nome:'Test 2',
    //     gramas:10,
    //     valor:20
    // },{
    //     _id:3,
    //     nome:'Test 3',
    //     gramas:10,
    //     valor:20 }]});
    ///////////////////////////////////////////////
    await Alimento.find({}).then((alimentos) => {
        return res.json({
            error: false,
            alimentos
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum resgistro encontrado!"
        });
        
    });
});
//Carregar cards===========================================
app.get('/cardcads', async (req, res) => {
    await CardCad.find({}).then((cardcads) => {
        return res.json({
            error: false,
            cardcads
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum resgistro encontrado!"
        });
        
    });
});
//cadastrar alimento===========================================
app.post('/alimentos', async (req, res) => {

    await sleep(1000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    await Alimento.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Alimento não cadastrada com sucesso!"
        });
    });

    return res.json({
        error: false,
        message: "Alimento cadastrada com sucesso!"
    });
});
//cadastrar card===========================================
app.post('/cardcads', async (req, res) => {

    await sleep(1000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    await CardCad.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Card não cadastrada com sucesso!"
        });
    });

    return res.json({
        error: false,
        message: "Card cadastrada com sucesso!"
    });
});
//Inicia servidos============================================
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});