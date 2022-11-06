const Fare = require('../models/Fare');

const getAll = async (req, res) =>{
    try {
        
        const response = await Fare.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Fare.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validate the fare not exists
        const FareFound = await Fare.findOne({ fare_type: req.body.fare_type });
        if(FareFound){ return res.status(400).json({ msj: "The Fare is already exist!" }) }

        let fare = new Fare();
        
        fare.fare_type = req.body.fare_type;
        fare.vehicle_type = req.body.vehicle_type;

        fare =  await fare.save();

        res.status(200).send(fare);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let fareFound = await Fare.findById({ _id : id });
        if(!fareFound) { return res.status(404).json({mjs: "Not found fare"}) }

        const {  fare_type, vehicle_type } = req.body;

        let fareExists = await Fare.findOne({ fare_type : fare_type, _id: { $ne : id } });
        if(!fareExists) { return res.status(404).json({mjs: "Fare is aready exist"}) }

        fareFound.fare_type = fare_type;
        fareFound.vehicle_type = vehicle_type;

        fareFound = await Fare.save();

        res.status(202).send(fareFound);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
}