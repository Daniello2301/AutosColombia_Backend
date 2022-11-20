const {Schema, model} = require('mongoose');

// Create mongoose schema 
const TicketSchema = Schema({
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
        type: Schema.Types.ObjectId,
        ref:'Employee',
        required:true
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

module.exports = model('Ticket', TicketSchema)