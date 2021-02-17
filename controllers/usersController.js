const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const User = require('../database/models/User');
let {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const controller = {
	// Create - Form to create user
	create: (req, res, next) => {
		res.render('register');
	},
	
	// Create -  Method to store user
	store: (req, res) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('register', {errors: errors.errors});
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
        res.render('login');
	},

	// Login - Logica
	update: (req, res, next) => {
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;