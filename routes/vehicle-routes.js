const router = require('express').Router();

const vehiclecontroller = require('../controllers/vehicle-controller');

router.route('/vehicle')
    .get(vehiclecontroller.getAll)
    .post(vehiclecontroller.createVehicle)
    
    
router.route('/vehi-license')
    .get(vehiclecontroller.getByLicense)
    
router.route('/vehicle/:id')
    .get(vehiclecontroller.getById)
    .put(vehiclecontroller.updateVehicle)
    .patch(vehiclecontroller.updateVehicle)
    .delete(vehiclecontroller.deleteVehicle)

module.exports = router;