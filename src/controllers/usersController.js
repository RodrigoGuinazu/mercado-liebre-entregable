const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');
const User = require('../../database/models/User');
let {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const controller = {
	// Create - Form to create user
	create: (req, res, next) => {
		res.render('users/register', {refill:{}});
	},
	
	// Create -  Method to store user
	store: (req, res) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('users/register', {refill:{...req.body}, errors: errors.mapped()});
            console.log(errors)
        }else {
			db.User.create({
				email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
			})
			.then(
				res.redirect('login')
			)
			.catch(function(error){
				console.log(error);
			})
		}
        
	},

	// View Login
	login: (req, res) => {
        res.render('users/login', {refill:{}});
	},

	// Login - Logica
	processLogin: (req, res, next) => {
		let errors = validationResult(req);
        db.User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(user => {
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    req.session.user = user;
                    res.redirect('/');
                } else{
                    res.render('users/login', {refill:{...req.body}, errors: {msg: "Credenciales Incorrectas"}}) // En caso de que el mail exista en la DB, pero que las credenciales sean incorrectas
                }
            } else{
                res.render('users/login', {refill:{...req.body}, errors: {msg: "El email que ingresaste no esta registrado en el sitio"}}) // En caso de que el mail no exista en la DB
            }
        })
        .catch(function(error){
            console.log(error);
        })
	},

    // Vista perfil de usuario
    profile: (req, res) => {
        res.render('users/profile')
    },

    // Vista Avatar
    avatar: (req, res) => {
        res.render('users/avatar')
    },

    // Logout
    destroy: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
};

module.exports = controller;