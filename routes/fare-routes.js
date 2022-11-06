const router = require('express').Router();

const farecontroller = require('../controllers/fare-conttoller');

router.route('/fare')
    .get(farecontroller.getAll)
    .post(farecontroller.create);

router.route('fare/:id')
    .get(farecontroller.getById)
    .put(farecontroller.update)
    .patch(farecontroller.update);

module.exports = router;