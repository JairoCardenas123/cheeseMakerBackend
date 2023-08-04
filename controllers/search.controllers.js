const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
//7.impoetamos los 3 modulos
const  Usuario  = require('../models/Usuario.js');
const  Categoria  = require('../models/Categoria.js');
const  Cheese  = require('../models/Cheese.js');

//6.paso colecciones disponibles
const allowedCollections = [
    'usuarios',
    'categorias',
    'cheeses',
    'roles'
]
                            
const searchUsers = async( criterio = '', res = response ) => {
    //si es un mongo id valido donde, sale de ObjectId de mongoose
    const isMongoID = ObjectId.isValid( criterio ); // TRUE 

    if ( isMongoID ) {
        const usuario = await Usuario.findById(criterio);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( criterio, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { email: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const searchCategorias = async( criterio = '', res = response ) => {

    const isMongoID = ObjectId.isValid( criterio ); // TRUE 

    if ( isMongoID ) {
        const categoria = await Categoria.findById(criterio);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( criterio, 'i' );
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });

}

const searchCheeses = async( criterio = '', res = response ) => {



}
//5.paso
const search = ( req, res = response ) => {
        //destructurando
    const { coleccion, criterio  } = req.params;
        //si esta coleccion no esta permitira da error, si no esta incluida en esa coleccion da el msg, 
    if (!allowedCollections.includes(coleccion)){
        return res.status(400).json({
            msg: `El buscador solo permite las colecciones: ${allowedCollections}`
        })
    }

    //si llega estar le pasamos la llave coleccion, en caso de ser usuarios, se pasa el searchUsers 

    switch (coleccion) {
        case 'usuarios':
            searchUsers(criterio, res);
        break;
        case 'categorias':
            searchCategorias(criterio, res);
        break;
        case 'cheeses':
            searchCheeses(criterio, res);
        break;

        default:
            res.status(500).json({
                msg: 'This search doesnt exists'
            })
    }

  

}



module.exports = {
    search
}