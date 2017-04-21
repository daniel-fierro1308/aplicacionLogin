var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');

// connection to database
mongoose.connect(config.database);

// en conexion
mongoose.connection.on('connected', () => {
	console.log('connected to database' + config.database);
});

// error en conexion
mongoose.connection.on('error', (err) => {
	console.log('database error' + err);
});

var app = express();

var users = require('./routes/users');

// Puerto utilizado
var puerto = 3000;


// cors
app.use(cors());

// colocar carpeta estatica
app.use(express.static(path.join(__dirname,'public')));

// Body parser
app.use(bodyParser.json());

//passports 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.get('*', (req, res) =>{
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciar el servidor
app.listen(puerto,() =>{
console.log("Esperando respuesta en el puerto " + puerto);
});