const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

// obtener todas las categorias - publico 
router.get('/', obtenerCategorias);

// obtener una categorias por id - publico 
router.get('/:id', [
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// crear categoria - privado - persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// actualizar categoria - privado - persona con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,actualizarCategoria );

// borrar categoria - privado - solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,borrarCategoria);


module.exports = router;