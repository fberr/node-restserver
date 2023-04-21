const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { correo, password } = req.body; 

    try {

        // verificar si el mail existe

        const usuario = await Usuario.findOne({ correo });
        if ( !usuario) {
            return res.status(400).json({
                msg: 'usuario / password no son correctos - correo'
            });
        }


        // si el usuario esta activo 
        if ( !usuario.estado) {
            return res.status(400).json({
                msg: 'usuario / password no son correctos - estado: false'
            });
        }

        // verificar conytaseña
        const validPass = bcryptjs.compareSync( password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'usuario / password no son correctos - password'
            });

        }


        // generar el jwt
        const token = await generarJWT( usuario.id );



        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })
        
    }

}


const googleSignIn = async( req, res = response) => {

    const { id_token } = req.body;

    try {
         const { nombre, img, correo } = await googleVerify( id_token );
         
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                rol: 'USER_ROL', 
                password: ';)',
                img,
                google: true

            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario es false en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'

            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );



        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: ' El token no se pudo verificar'

        })
        
    }

    


}

module.exports = {
    login,
    googleSignIn
}