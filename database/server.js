require('dotenv').config();

const Sequelize= require('sequelize');
const sequelize= new Sequelize(`mysql://root@localhost:3306/alkemy`);

sequelize  
    .authenticate()
    .then(()=> console.log('Connection ok'))
    .catch((err)=> console.error('Unable to connect', err))

module.exports= sequelize;