const Customer = require("../models/customer");

const getAll = async (req, res) => {
    try {
        console.log("GET/customer");
        const response = await Customer.find();

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

        const response = await Customer.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const createCustomer = async (req, res) => {
    try {
        console.log("POST/tiket");

        const customerFound = await Customer.findOne({
            document: req.body.document,
        });
        if (customerFound) {
            return res.status(400).json({ msj: "The vehicle is already exist" });
        }

        
        let newCustomer = new Customer();
        newCustomer.document = req.body.document;
        newCustomer.name = req.body.name;
        newCustomer.lastName = req.body.lastName;
        newCustomer.phone = req.body.phone;
        newCustomer.direction = req.body.direction;
        newCustomer.vehicle = req.body.vehicle._id;

        newCustomer = await newCustomer.save();

        res.status(200).send(newCustomer);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const updateCustomer = async (req, res) => {
    try {
        console.log("PUT/tiket/", req.params.id);

        const { id } = req.params;

        let customerFound = await Customer.findById({ _id: id });
        if (!customerFound) {
            return res.status(404).json({ mjs: "Not found vehicle" });
        }

        const {document, name,lastName, phone, direction, vehicle} = req.body;

        let customerExists = await Customer.findOne({
            document:document,
            _id: { $ne: id },
        });
        if (customerExists) {
            return res.status(404).json({ mjs: "Customer is already exist" });
        }

        customerFound.document = document;
        customerFound.name = name;
        customerFound.lastName = lastName;
        customerFound.phone = phone;
        customerFound.direction = direction;
        customerFound.vehicle = vehicle._id;

        customerFound = await customerFound.save();

        res.status(202).send(customerFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteCustomer = async (req, res) => {
    try {
        console.log("DELETE/customer", req.params.id);
        const { id } = req.params;

        const customerExists = await Customer.findById({ _id: id });
        if (!customerExists) {
            return res.status(404).json({ mjs: "Customer not exist" });
        }

        const response = await customerExists.remove();

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
    createCustomer,
    updateCustomer,
    deleteCustomer,
};