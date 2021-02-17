const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Create - Form to create user
	create: (req, res, next) => {
		res.render('register');
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