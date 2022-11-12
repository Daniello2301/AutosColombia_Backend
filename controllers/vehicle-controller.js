const Vehicle = require("../models/Vehicle");

const getAll = async (req, res) => {
    try {
        console.log("GET/vehicles");
        const response = await Vehicle.find().populate([
            {
                path: "tiket",
                select: "cell employee value date",
            },
            {
                path: "fare",
                select: "fare_type",
            },
        ]);
        res.status(201).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const getById = async (req, res) => {
    try {
        console.log("GET/tiketId");
        const { id } = req.params;

        const response = await Vehicle.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const createVehicle = async (req, res) => {
    try {
        console.log("POST/tiket");

        const vehicletFound = await Vehicle.findOne({
            lisence_place: req.body.lisence_place,
        });
        if (vehicletFound) {
            return res.status(400).json({ msj: "The vehicle is already exist" });
        }

        let vehicle = new Vehicle();

        DateIn = new Date();
        HourIn = DateIn.getHours() + " : " + DateIn.getMinutes();

        vehicle.lisence_place = req.body.lisence_place;
        vehicle.vehicle_type = req.body.vehicle_type;
        vehicle.user = req.body.user;
        vehicle.tiket = req.body.tiket._id;
        vehicle.fare = req.body.fare._id;
        vehicle.date = Date.now();
        vehicle.hour_in = HourIn;
        vehicle.hour_out = "00:00";


        vehicle = await vehicle.save();

        res.status(200).send(vehicle);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const updateVehicle = async (req, res) => {
    try {
        console.log("PUT/tiket/", req.params.id);

        const { id } = req.params;

        let vehicleFound = await Vehicle.findById({ _id: id });
        if (!vehicleFound) {
            return res.status(404).json({ mjs: "Not found vehicle" });
        }

        const { lisence_place, user, tiket } = req.body;

        let vehicleExists = await Vehicle.findOne({
            lisence_place: lisence_place,
            _id: { $ne: id },
        });
        if (vehicleExists) {
            return res.status(404).json({ mjs: "Vehicle is already exist" });
        }

        DateOut = new Date();
        HourOut = DateOut.getHours() + " : " + DateOut.getMinutes();

        vehicleFound.lisence_place = vehicleFound.lisence_place;
        vehicleFound.vehicle_type = vehicleFound.vehicle_type;
        vehicleFound.user = user;
        vehicleFound.tiket = tiket._id;
        vehicleFound.fare = vehicleFound.fare;
        vehicleFound.date = vehicleFound.date;
        vehicleFound.hour_in = vehicleFound.hour_in;
        vehicleFound.hour_out = HourOut;

        vehicleFound = await vehicleFound.save();

        res.status(202).send(vehicleFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteVehicle = async (req, res) => {
    try {
        console.log("DELETE/tiket", req.params.id);
        const { id } = req.params;

        const vehicleExists = await Vehicle.findById({ _id: id });
        if (!vehicleExists) {
            return res.status(404).json({ mjs: "Vehicle not exist" });
        }

        const response = await vehicleExists.remove();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

module.exports = {
    getAll,
    getById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};
