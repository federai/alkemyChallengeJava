const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const jwt= require('jsonwebtoken');
const jwtPass = 'password';
const sequelize = ("./database/server.js");
const md5= require('md5');

const userRoute= require('./routers/users');
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoute);

app.listen(3000, ()=> {
    console.log('Server is up on port '+ 3000);
});
