module.exports = function(){
  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;

  var usuario = new Schema({
    titulo: String,
    slogan: String,
    descricao: String,
    corpo: String,
    autor: String,
    inserir_data: {type: Date, default: Date.now}
  });

  return mongoose.model('Usuarios', usuario);
}
