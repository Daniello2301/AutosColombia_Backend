const router = require('express').Router();

const tiketcontroller = require('../controllers/tiket-controller');

router.route('/tiket')
    .get(tiketcontroller.getAll)
    .post(tiketcontroller.createTiket)

router.route('/tiket-code')
    .get(tiketcontroller.getByCodeTiket)


router.route('/tiket/:id')
    .get(tiketcontroller.getById)
    .put(tiketcontroller.updateTiket)
    .patch(tiketcontroller.updateTiket)
    .delete(tiketcontroller.deleteTiket)

module.exports = router;