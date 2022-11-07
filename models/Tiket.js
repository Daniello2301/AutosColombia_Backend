const {Schema, model} = require('mongoose');

// Create mongoose eschema 
const TiketSchema = Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    cell:{
        type: Number,
        required: true,
    },
    employee:{
        type: String,
        required: true,
    },
    value:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true, 
    }
},
{
    timestamps:true,
    versionKey:false
}) 

module.exports = model('Tiket', TiketSchema)