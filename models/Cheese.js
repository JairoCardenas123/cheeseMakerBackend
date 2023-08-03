const {Schema,model} = require('mongoose')

const CheeseSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true    
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'usuarios',
        required:true
    }
})


module.exports = model('Cheese',CheeseSchema)