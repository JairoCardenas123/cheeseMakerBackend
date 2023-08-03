const Cheese = require('../models/Cheese.js')
const bcryptjs = require('bcryptjs')

const getCheese = async(req,res)=>{
    const {hasta,desde} = req.query;
    const query = {estado:true}
    try {
        const {total,cheese} = await Promise.all([
            Cheese.countDocuments(query),
            Cheese.find(query).populate('usuarios',['nombre','email'])
            .skip(Number(desde))
            .limit(Number(hasta))
        ]);
        res.json({
            total,
            cheese,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Error al obtener los Cheese'})
    }
}


const postCheese = async(req,res)=>{
    const nombre = req.body.nombre.toUpperCase();
    const cheeseDB = await Cheese.findOne({nombre});

    if(cheeseDB){
        return res.status(400).json({
            msg:`el Cheese ${cheeseDB.nombre},ya existe`
        })
    }

    const data = {
        nombre,
        usuario:req.usuario._id
    }

    const cheese = new Cheese(data);

    await cheese.save();

    res.status(201).json(cheese)
}

const deleteCheese = async(req,res)=>{
    const {id} = req.params

    const cheese = await Cheese.findByIdAndUpdate(id,{estado:false})
    res.json(cheese)
}


const putCheese = async(req,res)=>{
    const {id} = req.params;
    const {_id,password,googleSingIn, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const cheese = await Cheese.findByIdAndUpdate(id,resto,{new:true});
    
    res.json({
        msg:"Usuario Actualizado",
        usuario: cheese
    })
}

const patchCheese = (req,res)=>{
    res.json({
        "message":"patch api"
    })
}

module.exports = {
    getCheese,
    postCheese,
    deleteCheese,
    putCheese,
    patchCheese
}
