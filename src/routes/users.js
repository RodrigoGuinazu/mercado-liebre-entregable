// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let multerUsers = require('../middlewares/multerUsers');
let { check, validationResult, body } = require('express-validator');
const createUserValidator = require('../middlewares/createUserValidator');
let userMiddleware = require('../middlewares/userMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/*** CREATE USER ***/ 
router.get('/register', userMiddleware.guest, usersController.create); 
router.post('/register', createUserValidator, usersController.store); 


/*** LOGIN ***/ 
router.get('/login', userMiddleware.guest, usersController.login);
router.post('/login', usersController.processLogin); 

/*** Perfil ***/ 
router.get('/profile', userMiddleware.registered, usersController.profile); 

/*** Avatar ***/ 
router.get('/avatar/upload', userMiddleware.registered, usersController.avatar); 
router.post('/profile', multerUsers.any(), usersController.avatarUpload); 

/*** Logout ***/ 
router.get('/logout', userMiddleware.registered,  usersController.destroy); 


module.exports = router;