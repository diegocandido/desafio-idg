
/**
 * Module dependencies.
 */

var express        = require('express');
var load           = require('express-load');
var mongoose 	   = require('mongoose');
var flash    	   = require('express-flash');
var favicon 	   = require('serve-favicon');
var logger 		   = require('morgan');
var methodOverride = require('method-override');
var session 	   = require('express-session');
var bodyParser 	   = require('body-parser');
var multer         = require('multer');
var errorHandler   = require('errorhandler');
var cookie         = require('cookie-parser');

var app = express();

// Conexao MongoDB
mongoose.connect('mongodb://diego:diegocandido@ds011238.mongolab.com:11238/apirest', function(err){
  if (err){
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// Autenticacao
app.use(cookie());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'chave6655' }));
app.use(flash());


app.use(express.static(__dirname+'/public'));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// MVC
load('models').then('controllers').then('routes').into(app);

var port = process.env.PORT || 5000;

// Escuta do servidor
app.listen(port, function(){
  console.log('Servidor rodando na porta: '+port);
});
