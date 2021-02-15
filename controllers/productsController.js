const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../db/models');
const Product = require('../db/models/Product');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll()
            .then(products => {
                res.render('index', {products: products});
            })
            .catch(function(error){
                console.log(error);
            })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('detail');
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form');
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