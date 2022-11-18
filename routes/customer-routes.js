const router = require('express').Router();

const customercontroller = require('../controllers/customer-controller');

router.route('/customer')
    .get(customercontroller.getAll)
    .post(customercontroller.createCustomer)

router.route('/customer/:id')
    .get(customercontroller.getById)
    .put(customercontroller.updateCustomer)
    .patch(customercontroller.updateCustomer)
    .delete(customercontroller.deleteCustomer)

module.exports = router;