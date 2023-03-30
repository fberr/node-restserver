const { response } = require('express');

const usuariosGet =  (req, res = response ) => {

    const { q, nombre, page = 10} = req.query;

    res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        page
    });
}

const usuariosPost =  (req, res = response ) => {


    const { nombre, edad } = req.body;

    res.json({
        msg: 'post api - controlador',
        nombre, 
        edad
    });
}

const usuariosPut =  (req, res = response ) => {

    const id = req.params.id;

    res.json({
        msg: 'put api - controlador',
        id
    });
}
const usuariosPatch =  (req, res = response ) => {
    res.json({
        msg: 'patch api - controlador'
    });
}

const usuariosDelete =  (req, res = response ) => {
    res.json({
        msg: 'delete api - controlador'
    });
}


module.exports = {

    usuariosGet,
    usuariosPost, 
    usuariosPatch, 
    usuariosDelete, 
    usuariosPut
}