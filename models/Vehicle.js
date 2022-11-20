const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({

    license_place:{
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
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
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
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model('Vehicle', VehicleSchema);