const router = require('express').Router();

const tiketcontroller = require('../controllers/tiket-controller');

router.route('/ticket')
    .get(tiketcontroller.getAll)
    .post(tiketcontroller.createTicket)

router.route('/ticket-code')
    .get(tiketcontroller.getByCodeTicket)


router.route('/ticket/:id')
    .get(tiketcontroller.getById)
    .put(tiketcontroller.updateTicket)
    .patch(tiketcontroller.updateTicket)
    .delete(tiketcontroller.deleteTicket)

module.exports = router;