const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.static('public'));


const userRoute = require('./Routes/user'); //Appel des routes utilisateurs
const messageRoute = require('./Routes/message'); //Appel des routes messages


app.use((req, res, next) => { // configuration des CORS, pour permettre à différentes adresse localhost de communiquer entre elles
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});


app.use(bodyParser.json());//body parser pour convertir les objets JSON des requêtes POST
app.use(express.json());


app.use('/api/', userRoute);
app.use('/api/', messageRoute);



module.exports = app;