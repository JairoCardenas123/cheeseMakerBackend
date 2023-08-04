const { response, request } = require('express');
//23.1 middleware validacion token en otras rutas (borrar usuario)
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');


const validateJWT = async(  req = request, res = response, next) => { //Esta función acepta tres parámetros: req, res y next. req representa el objeto de solicitud, res representa el objeto de respuesta y next es una función que se debe llamar para pasar la solicitud al siguiente middleware o controlador en la cadena de manejo

    //leer token jwt desde los headers de la request
    const token = req.header('x-api-token-jwt'); //: En esta línea, se lee el valor del token JWT del encabezado de la solicitud. El token JWT se espera que esté presente en el encabezado de la solicitud con el nombre x-api-token-jwt. Es común que el token JWT se envíe en el encabezado de autorización de una solicitud HTTP.

    /* console.log(token); */

    
    if ( !token ) { //: En esta línea, se lee el valor del token JWT del encabezado de la solicitud. El token JWT se espera que esté presente en el encabezado de la solicitud con el nombre x-api-token-jwt. Es común que el token JWT se envíe en el encabezado de autorización de una solicitud HTTP.
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        /* const payload = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        console.log(payload); */

        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );//destructure el id del token

       /*  req.uid= uid; */
        //paso las 2 validaciones
        //esta en la base de datos y esta activo
        // leer el usuario que corresponde al uid
         const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        } 

        // Verificar si el uid tiene estado true
         if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        } 
        
        
        req.usuario = usuario;  //le estanos pasando todo el detalle del usuario
        console.log("req usuario en validate",req.usuario);
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}


module.exports = {
    validateJWT
}