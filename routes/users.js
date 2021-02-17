// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let multerUsers = require('../middlewares/multerUsers');
let { check, validationResult, body } = require('express-validator');
const createUserValidator = require('../middlewares/createUserValidator');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/*** CREATE USER ***/ 
router.get('/register', usersController.create); 
router.post('/register', createUserValidator, usersController.store); 


/*** LOGIN ***/ 
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin); 

/*** Perfil ***/ 
router.get('/profile', usersController.profile); 

/*** Avatar ***/ 
//router.get('/avatar/upload', usersController.); 
//router.post('/avatar/upload', multerUsers.any(), usersController.); 


/*** DELETE USER ***/ 
//router.delete('/:id', usersController.destroy); 


module.exports = router;