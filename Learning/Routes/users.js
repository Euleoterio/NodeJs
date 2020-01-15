const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//function aux
const createUserToken = (userId) => {
    return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.jwt_expire_in});
}

//with async, await and status code
router.get('/', async (req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users)
    }
    catch (err) {
        return res.status(500).send({error: 'Erro na consulta dos usuários!'});
    }
});

// //with async and await - para algo escalável
// router.get('/', async (req, res) => {
//     try{
//         const users = await Users.find({});
//         return res.send(users)
//     }
//     catch (err) {
//         return res.send({error: 'Erro na consulta dos usuários!'});
//     }
// });

// router.get('/', (req, res) => {
//     Users.find({}, (err,data) => {
//         if (err) return res.send({ error: 'Erro na consulta de usuários' });
//         return res.send(data);
//     })
// });

//no root não estou usando 
// router.post('/', (req, res) => {
//     return res.send({message: 'Tudo ok com o método POST dos usuários'});
// });

//with async, await and status code
router.post('/create', async(req,res) => {
    const{ email,password } = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'});

    try{
        if(await Users.findOne({ email})) return res.status(400).send({error: 'Usuário já cadastrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        
        return res.status(201).send({user, token: createUserToken(user.id)});         
    }
    catch (err){
        return res.status(500).send({error: 'Erro ao buscar usuário!'});
    }
});

// //with async and await
// router.post('/create', async(req,res) => {
//     const{ email,password } = req.body;

//     if(!email || !password) return res.send({error: 'Dados insuficientes'});

//     try{
//         if(await Users.findOne({ email})) return res.send({error: 'Usuário já cadastrado!'});

//         const user = await Users.create(req.body);
//         user.password = undefined;
        
//         return res.send({user, token: createUserToken(user.id)});
//         //return res.send(user);         
//     }
//     catch (err){
//         return res.send({error: 'Erro ao buscar usuário!'})
//     }
// });

// router.post('/create', (req, res) => {
//     const { email, password } = req.body;

//     if(!email || !password) return res.send( {error: 'Dados insuficientes'});

//     Users.findOne({email}, (err,data) => {
//         if (err) return res.send({ erro:'Erro ao buscar usuário!' });
//         if (data) return res.send({ erro: 'Usuário já registrado.'});
//     });

//     Users.create(req.body, (err, data) => {
//         if (err) return res.send({ erro: 'Erro ao criar usuário.' });

//         //Ocultar password
//         data.password = undefined;

//         return res.send(data);
//     });
// });

//with async, await and status code
router.post('/auth', async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'});

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({error: 'Usuário não registrado'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({error: 'Erro ao autenticar o usuário!'});

        user.password = undefined;
        
        return res.send({user, token: createUserToken(user.id)});
    }
    catch (err){
        return res.status(500).send({error: 'Erro ao buscar usuário!'});
    }
});

// //with async and await
// router.post('/auth', async(req,res) => {
//     const {email,password} = req.body;

//     if(!email || !password) return res.send({error: 'Dados insuficientes'});

//     try{
//         const user = await Users.findOne({email}).select('+password');
//         if(!user) return res.send({error: 'Usuário não registrado'});

//         const pass_ok = await bcrypt.compare(password, user.password);

//         if(!pass_ok) return res.send({error: 'Erro ao autenticar o usuário!'});

//         user.password = undefined;
        
//         return res.send({user, token: createUserToken(user.id)});
//         //return res.send(user); 
//     }
//     catch (err){
//         return res.send({error: 'Erro ao buscar usuário!'});
//     }
// });

// router.post('/auth', (req, res) => {
//     const { email, password} = req.body;

//     if(!email || !password) return res.send( {error: 'Dados insuficientes'});

//     Users.findOne({email}, (err,data) => {
//         if (err) return res.send({ error: 'Erro ao buscar usuário! '});
//         if (!data) return res.send({ error: 'Usuário não registrado!'});
        
//         bcrypt.compare(password, data.password, (err,same) => {
//             if(!same) return res.send({ error: 'Erro ao autenticar usuário'});
            
//             data.password = undefined;

//             return res.send(data);
//         });
//     }).select('+password');
// });


module.exports = router;

/*
    Status codes 

    200 - OK
    201 - Created
    202 - Accepted

    400 - Bad request
    401 - Unauthorized -- Autenticação, tem caráter temporário 
    403 - Forbidden -- Autorização, tem caráter permanente
    404 - Not found

    500 - Internal server error
    501 - Not implemented - a API não suporta essa funcionalidade
    503 - Service unvailable - a API executa, mas no momento esta indisponível
*/