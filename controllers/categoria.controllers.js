const Categoria = require('../models/Categoria.js');
const bcryptjs = require('bcryptjs')

const getCategorias = async (req, res) => {
    const { hasta, desde } = req.query;
    const query = { estado: true };

    try {
        const { total, categorias } = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).populate('usuarios', ['nombre', 'email'])
            .skip(Number(desde))
            .limit(Number(hasta))

        ]);

        res.json({
            total,
            categorias,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías.' });
    }
};


const postCategoria = async(req, res ) => {


    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}


const deleteCategorias = async(req,res)=>{
    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false})
    res.json(categoria)

}


const putCategorias = async(req,res)=>{
    const {id} = req.params;

    const {_id,password,googleSingIn, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password
    }
}

module.exports = {
    postCategoria,
    getCategorias,
    deleteCategorias,
    putCategorias
}