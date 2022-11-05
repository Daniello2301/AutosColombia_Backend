const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({

    lisence_place:{
        type:String,
        required:true,
        unique:true
    },
    vehicle_type:{
        type:String,
        required:true,
        enum:['MOTO', 'CARRO']
    },
    user:{
        type:String,
        required:true,
    },
    tiket:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tiket',
        required:true
    },
    fare:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Fare',
        required:true 
    },
    date:{
        type: Date,
        required:true
    },
    hour_in:{
        type:String,
        required:true
    },
    hour_out:{
        type:String,
        required:true
    }

},
{
    timestamp:true,
    versionKey:false
});

module.exports = mongoose.model('Vehicle', VehicleSchema);