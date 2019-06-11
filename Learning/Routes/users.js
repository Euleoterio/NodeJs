const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método GET dos usuários'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método POST dos usuários'});
});

router.post('/create', (req, res) => {
    return res.send({message: 'Seu usuário foi criado.'});
});

module.exports = router;