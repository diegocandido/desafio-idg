var moment = require('moment');

module.exports = function(app){

	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err, data){
				if (err){
					console.log(err);
				}
				res.render("usuarios/index", {lista: data, moment: moment});
			});
		},

		create: function(req,res){
			res.render("usuarios/create");
		},

		insert: function(req,res){
			var model = new Usuario(req.body);
			model.save(function(err){
				if(err){
					console.log(err);
				}
				req.flash('info','Cadastrado com sucesso!');
				res.redirect('/usuarios');
			});
		},

		edit: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
						res.render('usuarios/edit', {value: data});
				}
			});
		},

		update: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
						var model   = data;
						model.titulo  = req.body.titulo;
						model.slogan = req.body.slogan;
						model.descricao = req.body.descricao;
						model.corpo = req.body.corpo;
						model.autor = req.body.autor;
						model.save(function(err){
							if(err){
								console.log(err);
							}else{
								req.flash('info', 'Atualizado com sucesso!');
							  res.redirect('/usuarios');
							}
						});
				}
			});
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
						res.render('usuarios/show', {value: data});
				}
			});
		},

		remove: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if (err){
					console.log(err);
				}else{
					req.flash('info', 'Excluído com sucesso!');
					res.redirect('/usuarios');
				}
			});
		}
	}

	return UsuarioController;
}
