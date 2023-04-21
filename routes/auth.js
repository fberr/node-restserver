const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/google',[
    check('id_token', 'el id token es necesario').not().isEmpty(),
   validarCampos


], googleSignIn);



module.exports = router;