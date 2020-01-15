 const env = process.env.NODE_ENV || 'dev';

 const config = () => {
     switch(env){
         
        case 'dev':
             return{
                bd_string: 'mongodb+srv://euleoterio:euleoteriovini10@clusterapi-tbfhq.mongodb.net/test?retryWrites=true',
                jwt_pass: 'passwordDEV',
                jwt_expire_in: '7d'
             }
         
        case 'hml':
            return{
                bd_string: 'mongodb+srv://euleoterio:euleoteriovini10@clusterapi-tbfhq.mongodb.net/test?retryWrites=true',
                jwt_pass: 'passwordHML',
                jwt_expire_in: '5d'
            } 
             
        case 'prd':
            return{
                bd_string: 'mongodb+srv://euleoterio:euleoteriovini10@clusterapi-tbfhq.mongodb.net/test?retryWrites=true',
                jwt_pass: 'passwordPRD',
                jwt_expire_in: '1d'
            }    
     }
 }

 console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

 module.exports = config();

 