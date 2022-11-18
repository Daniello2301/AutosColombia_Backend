const Tiket = require("../models/Tiket");

const getAll = async (req, res) => {
    try {
        console.log("GET/tikets");
        const response = await Tiket.find();
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

        const response = await Tiket.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};



const getByCodeTiket = async (req, res) => {
    try {
        console.log("GET/tikets by code");

        const tiketFound = await Tiket.findOne({ code: req.body.code });

        res.status(200).send(tiketFound);

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const createTiket = async (req, res) => {
    try {
        console.log("POST/tiket");

        const TiketFound = await Tiket.findOne({ code: req.body.code });
        if (TiketFound) {
            return res.status(400).json({ msj: "The tiket is already exist" });
        }

        let tiket = new Tiket();

        tiket.code = req.body.code;
        tiket.cell = req.body.cell;
        tiket.employee = req.body.employee;
        tiket.value = req.body.value;
        tiket.date = Date.now();

        tiket = await tiket.save();

        res.status(200).send(tiket);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const updateTiket = async (req, res) => {
    try {
        console.log("PUT/tiket/", req.params.id);

        const { id } = req.params;

        let tiketFound = await Tiket.findById({ _id: id });
        if (!tiketFound) {
            return res.status(404).json({ mjs: "Not found fare" });
        }

        const { code, cell, employee, value, date } = req.body;

        let tiketExists = await Tiket.findOne({ code: code, _id: { $ne: id } });
        if (tiketExists) {
            return res.status(404).json({ mjs: "Fare is aready exist" });
        }

        tiketFound.code = code;
        tiketFound.cell = cell;
        tiketFound.employee = employee;
        tiketFound.value = value;
        tiketFound.date = date;

        tiketFound = await tiketFound.save();

        res.status(202).send(tiketFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteTiket = async (req, res) => {
    try {
        console.log("DELETE/tiket", req.params.id);
        const { id } = req.params;

        const tiketExiste = await Tiket.findById({ _id: id });
        if (!tiketExiste) {
            return res.status(404).json({ mjs: "Tiket not exist" });
        }

        const response = await tiketExiste.remove();

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
    getByCodeTiket,
    createTiket,
    updateTiket,
    deleteTiket,
};
