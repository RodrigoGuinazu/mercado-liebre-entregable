const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');
const Product = require('../../database/models/Product');

const controller = {
	index: (req, res) => {
		db.Product.findAll()
			.then(products => {
				res.render('index', {products: products});
			})
			.catch(function(error){
				console.log(error);
			})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
