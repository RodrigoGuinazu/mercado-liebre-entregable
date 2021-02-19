const {check} = require('express-validator');

module.exports = [
    check('title').isLength({min:3, max: 100}).withMessage('El titulo debe tener como minimo 3 caracteres y como maximo 100 caracteres.'),
    check('price').isFloat({gt: 0}).withMessage('El precio debe ser mayor a 0.'),
    check('brand').isInt().withMessage('Elegi la marca del producto.'),
    check('category').isInt().withMessage('Elegi la categoria del producto.'),
    check('description').isLength({max: 1000}).withMessage('La descripcion no puede tener mas de 1000 caracteres.'),
]