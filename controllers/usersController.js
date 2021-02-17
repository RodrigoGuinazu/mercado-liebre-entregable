const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const User = require('../database/models/User');
let {validationResult} = require('express-validator');

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
        }else {
			db.User.create({
				email: req.body.email,
                password: req.body.password
			})
            .then(
                res.redirect('index')
            )
			.catch(function(error){
				console.log(error);
			})
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
        
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;