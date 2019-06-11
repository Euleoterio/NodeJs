const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', (req, res) => {
    User.find({}, (err,data) => {
        if (err) return res.send({ error: 'Erro na consulta de usuários' });
        return res.send(data);
    })

    return res.send({message: 'Tudo ok com o método GET dos usuários'});
});

//no root não estou usando 
// router.post('/', (req, res) => {
//     return res.send({message: 'Tudo ok com o método POST dos usuários'});
// });

router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send( {error: 'Dados insuficientes'});

    User.findOne({email}, (err,data) => {
        if (err) return res.send({ erro:'Erro ao buscar usuário!' });
        if (date) return res.send({ erro: 'Usuário já registrado.'});
    });

    User.create(req.body, (err, data) => {
        if (err) return res.send({ erro: 'Erro ao criar usuário.' });
        return res.send(data);
    });
});

module.exports = router;