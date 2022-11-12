const router = require('express').Router();

const employeecontroller = require('../controllers/employee-controller');

router.route('/employee')
    .get(employeecontroller.getAll)
    .post(employeecontroller.createEmployee)

router.route('/employee/:id')
    .get(employeecontroller.getById)
    .put(employeecontroller.updateEmployee)
    .patch(employeecontroller.updateEmployee)
    .delete(employeecontroller.deleteEmployee)

module.exports = router;