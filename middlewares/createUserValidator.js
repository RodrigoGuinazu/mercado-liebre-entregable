const {check} = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('Debes ingresar un E-mail valido.'),
    check('password').isLength({min:6, max: 9}).withMessage('La password debe tener entre 6 y 9 caracateres.'),
]