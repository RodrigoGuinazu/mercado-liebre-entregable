const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const Product = require('../database/models/Product');
const Brand = require('../database/models/Brand');
let {validationResult} = require('express-validator');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll()
            .then(products => {
                res.render('products', {products: products});
            })
            .catch(function(error){
                console.log(error);
            })
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {
		db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('detail', {productDetail: productDetail});
			})
			.catch(function(error){
				console.log(error);
			})
	},

	// Create - Form to create
	create: (req, res) => {
		db.Brand.findAll()
		.then(brands => {
			res.render('product-create-form', {brands: brands});
		})
		.catch(function(error){
			console.log(error);
		})
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('product-create-form', {errors: errors.errors});
        } else {
			db.Product.create({
				title: req.body.title,
				price: req.body.price,
				photo: req.body.photo,
				brand_id: req.body.brand,
				category_id: req.body.category,
				stock: req.body.stock,
				description: req.body.description
			})
			.catch(function(error){
				console.log(error);
			})
			res.redirect('products');
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		db.Product.findByPk(req.params.id)
        .then( productToEdit => {
            res.render('product-edit-form', {productToEdit: productToEdit})
        })
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