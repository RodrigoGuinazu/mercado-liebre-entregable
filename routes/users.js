// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let multerUsers = require('../middlewares/multerUsers');
let { check, validationResult, body } = require('express-validator');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/*** CREATE USER ***/ 
router.get('/create', usersController.create); 
router.post('/', multerProducts.any(), createProductValidator, usersController.store); 


/*** LOGIN ***/ 
router.get('/:id', usersController.detail); 

/*** EDIT USER ***/ 
router.get('/:id/edit', usersController.edit); 
router.patch('/:id', multerProducts.any(), createProductValidator, usersController.update); 


/*** DELETE USER ***/ 
router.delete('/:id', usersController.destroy); 


module.exports = router;