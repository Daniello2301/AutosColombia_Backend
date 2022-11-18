const {Schema, model} = require('mongoose');

const CustomerSchema = Schema({

    document:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true, 
    },
    direction:{
        type: String,
        required: true,
    },
    vehicle:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vehicle',
        required:true      
    }
   
},
{
    timestamps:true,
    versionkey:false
}) 

module.exports = model('Customer',CustomerSchema)