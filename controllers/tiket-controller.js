const Ticket = require("../models/Ticket");
const session = ('express-session');

const getAll = async ( req, res ) => {
    try {
        console.log("GET/Tickets");
        const response = await Ticket.find();
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
        console.log("GET/TicketId");

        const { id } = req.params;

        const response = await Ticket.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};



const getByCodeTicket = async (req, res) => {
    try {
        console.log("GET/Tickets by code");

        const ticketFound = await Ticket.findOne({ code: req.body.code });

        res.status(200).send(ticketFound);

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const createTicket = async (req, res) => {
    try {
        console.log("POST/Ticket");

        const ticketFound = await Ticket.findOne({ code: req.body.code });
        if (ticketFound) {
            return res.status(400).json({ msj: "The Ticket is already exist" });
        }

        let ticket = new Ticket();

        ticket.code = req.body.code;
        ticket.cell = req.body.cell;
        ticket.employee = session.id;
        ticket.value = req.body.value;
        ticket.date = Date.now();

        ticket = await ticket.save();

        res.status(200).send(ticket);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const updateTicket = async (req, res) => {
    try {
        console.log("PUT/Ticket/", req.params.id);

        const { id } = req.params;

        let ticketFound = await Ticket.findById({ _id: id });
        if (!ticketFound) {
            return res.status(404).json({ mjs: "Not found fare" });
        }

        const { code, cell, employee, value, date } = req.body;

        let ticketExists = await Ticket.findOne({ code: code, _id: { $ne: id } });
        if (ticketExists) {
            return res.status(404).json({ mjs: "Fare is already exist" });
        }

        ticketFound.code = code;
        ticketFound.cell = cell;
        ticketFound.employee = employee;
        ticketFound.value = value;
        ticketFound.date = date;

        ticketFound = await ticketFound.save();

        res.status(202).send(ticketFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteTicket = async (req, res) => {
    try {
        console.log("DELETE/Ticket", req.params.id);
        const { id } = req.params;

        const ticketExist = await Ticket.findById({ _id: id });
        if (!ticketExist) {
            return res.status(404).json({ mjs: "Ticket not exist" });
        }

        const response = await TicketExist.remove();

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
    getByCodeTicket,
    createTicket,
    updateTicket,
    deleteTicket,
};
