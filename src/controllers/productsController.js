const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');
const Product = require('../../database/models/Product');
const Brand = require('../../database/models/Brand');
const Category = require('../../database/models/Category');
let {validationResult} = require('express-validator');
const { promiseImpl } = require('ejs');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll()
            .then(products => {
                res.render('products/products', {products: products});
            })
            .catch(function(error){
                console.log(error);
            })
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {
		db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('products/detail', {productDetail: productDetail});
			})
			.catch(function(error){
				console.log(error);
			})
	},

	// Create - Form to create
	create: (req, res) => {
		let brandRequest = db.Brand.findAll();
		let categoryRequest = db.Category.findAll();

		Promise.all([brandRequest, categoryRequest])
		.then(([brands, categories]) => {
			return res.render('products/product-create-form', {brands, categories, refill:{}})
		})
		.catch(function(error){
			console.log(error);
		})
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		const errors = validationResult(req);
        if(!errors.isEmpty()){
			let brandRequest = db.Brand.findAll();
			let categoryRequest = db.Category.findAll();

			Promise.all([brandRequest, categoryRequest])
			.then(([brands, categories]) => {
				return res.render('products/product-create-form', {brands, categories, refill:{...req.body}, errors: errors.errors})
			})
			.catch(function(error){
				console.log(error);
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
			.then(product => {
				res.redirect('/products/' + product.id);
			})
			.catch(function(error){
				console.log(error);
			})
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit = db.Product.findByPk(req.params.id)
		let brandRequest = db.Brand.findAll();
		let categoryRequest = db.Category.findAll();

		Promise.all([productToEdit, brandRequest, categoryRequest])
		.then(([productToEdit, brands, categories]) => {
			return res.render('products/product-edit-form', {refill: productToEdit, brands: brands, categories: categories, productToEdit: productToEdit});
		})	
		.catch(function(error){
			console.log(error);
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const errors = validationResult(req);

        if(!errors.isEmpty()){
			let productToEdit = db.Product.findByPk(req.params.id)
			let brandRequest = db.Brand.findAll();
			let categoryRequest = db.Category.findAll();

			Promise.all([productToEdit, brandRequest, categoryRequest])
			.then(([productToEdit, brands, categories]) => {
				return res.render('products/product-edit-form', {refill:{...req.body, id:productToEdit.id}, brands: brands, categories: categories, productToEdit: productToEdit});
			})	
			.catch(function(error){
				console.log(error);
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