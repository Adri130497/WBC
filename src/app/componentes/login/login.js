const mysql =require('mysql');
const express = require('express');
var session = require('express-session');
const bodyparser = require('body-parser');
var path = require('path');

//Conexion Base de Datos Mysql
var mysqlConnection = mysql.createConnection({
  host:'localhost',
  user : 'root',
  password : 'admin',
  database : 'wbc_final',
});

mysqlConnection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.component.html'));
});


app.post('/login', function(request, response) {
	var username = request.body.email;
	var password = request.body.password;
	if (username && password) {
		mysqlConnection.query('SELECT * FROM usuarios WHERE email = ? AND contrasena = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				//response.redirect('/home');
        console.log('ok')
			} else {
				//response.send('Incorrect Username and/or Password!');
        console.log('No')
			}
			response.end();
		});
	} else {
    console.log('enter username and password')
		//response.send('Please enter Username and Password!');
		response.end();
	}
});



app.listen(3000);
