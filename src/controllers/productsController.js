const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');
const Product = require('../../database/models/Product');
const Brand = require('../../database/models/Brand');
const Category = require('../../database/models/Category');
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
		db.Category.findAll()
        .then( categories => {
			db.Brand.findAll()
			.then(brands => {
			res.render('product-create-form', {brands: brands, categories: categories});
			})
			.catch(function(error){
			console.log(error);
			})
		.catch(function(error){
			console.log(error);
		})
        })
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
			db.Category.findAll()
			.then( categories => {
				db.Brand.findAll()
				.then(brands => {
				res.render('product-create-form', {brands: brands, categories: categories, errors: errors.errors});
				})
				.catch(function(error){
				console.log(error);
				})
			.catch(function(error){
				console.log(error);
			})
			})
        } else {
			db.Product.create({
				title: req.body.title,
				description: req.body.description,
				photo: '/images/products/' + req.files[0].filename,
				price: req.body.price,
				stock: 1,
				brand_id: req.body.brand,
				category_id: req.body.category
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
			db.Brand.findAll()
			.then(brands => {
				db.Category.findAll()
        		.then( categories => {
					res.render('product-edit-form', {brands: brands, categories: categories, productToEdit: productToEdit});
				})
				.catch(function(error){
					console.log(error);
				})
			})
			.catch(function(error){
			console.log(error);
			})
        })
		.catch(function(error){
			console.log(error);
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
			db.Category.findAll()
			.then( categories => {
				db.Brand.findAll()
				.then(brands => {
					db.Product.findAll()
					.then(productToEdit => {
						res.render('product-edit-form', {brands: brands, categories: categories, errors: errors.errors, productToEdit: productToEdit});
					})
				})
				.catch(function(error){
				console.log(error);
				})
			.catch(function(error){
				console.log(error);
			})
			})
        } else {
			db.Product.update({
				title: req.body.title,
				description: req.body.description,
				photo: '/images/products/' + req.files[0].filename,
				price: req.body.price,
				stock: req.body.stock,
				brand_id: req.body.brand,
				category_id: req.body.category
			},{
				where: ({
					id: req.params.id
				})
			})
			.then(
				res.redirect(req.params.id)
			)
			.catch(function(error){
				console.log(error);
			})
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res, next) => {
		db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(
            res.redirect('/products')
        )
		.catch(function(error){
			console.log(error);
		})
	}
};

module.exports = controller;