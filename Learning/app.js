//instanciando
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//string de conexão
//mongodb+srv://euleoterio:<password>@clusterapi-tbfhq.mongodb.net/test?retryWrites=true&w=majority
const url = 'mongodb+srv://euleoterio:euleoteriovini10@clusterapi-tbfhq.mongodb.net/test?retryWrites=true';
//Connectio curse
//const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500,  poolSize: 5, useNewUrlParser: true };
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex',true);

mongoose.connection.on('error', (err) =>{
        console.log('Erro na conexão com banco de dados: ' + err);
    }
)

mongoose.connection.on('disconnect', () => {
        console.log('Aplicação desconectada do banco de dados!');
    }
)

mongoose.connection.on('connected', () => {
        console.log('Aplicação conectada ao banco de dados!');
    }
)

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

// Primeira AULA
// '/'é local host
// app.get('/', (req, res)  => {
//     let obj = req.query;

//     return res.send({message: `Tudo ok com o método GET! Você enviou o nome ${obj.nome} com idade de ${obj.idade} anos!`});
// });

// app.post('/', (req, res) => {
//     return res.send({message:'Tudo ok com o método POST'});
// });

app.listen(3000);

module.exports = app;