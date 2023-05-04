const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

// obtener todos las productos - publico 
router.get('/', obtenerProductos);

// obtener un producto por id - publico 
router.get('/:id', [
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// crear producto - privado - persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

// actualizar producto - privado - persona con token valido
router.put('/:id', [
    validarJWT,
 //   check('categoria', 'No es un id de mongo').isMongoId(),
   check('id').custom( existeProductoPorId ),
    validarCampos
] ,actualizarProducto );

// borrar producto - privado - solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
] ,borrarProducto);


module.exports = router;