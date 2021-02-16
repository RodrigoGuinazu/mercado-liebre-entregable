// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let multerProducts = require('../middlewares/multerProducts');
let { check, validationResult, body } = require('express-validator');
const createProductValidator = require('../middlewares/createProductValidator');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', [multerProducts.any(), createProductValidator], productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.patch('/:id', productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;