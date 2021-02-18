// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let multerProducts = require('../middlewares/multerProducts');
let { check, validationResult, body } = require('express-validator');
const createProductValidator = require('../middlewares/createProductValidator');
let userMiddleware = require('../middlewares/userMiddleware');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', userMiddleware.registered, productsController.create); 
router.post('/', multerProducts.any(), createProductValidator, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', userMiddleware.registered, productsController.edit); 
router.patch('/:id', multerProducts.any(), createProductValidator, productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', userMiddleware.registered, productsController.destroy); 


module.exports = router;