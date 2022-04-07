const router = require('express').Router();
const {requireAuth} = require('../middlewares/auth');

const reservation_controller = require('../controllers/reservation_controller')

// GET request for creating reservation.
router.get('/create', reservation_controller.reservation_create_get);

// POST request for creating reservation.|| reserve when  you  are authenticated
router.post('/create', requireAuth, reservation_controller.reservation_create_post);

// GET request to delete reservation.
router.get('/:id/delete', reservation_controller.reservation_delete_get);

// POST request to delete reservation.
router.post('/:id/delete', reservation_controller.reservation_delete_post);

// GET request to update reservation.
router.get('/book/:id/update', reservation_controller.reservation_update_get);

// POST request to update reservation.
router.post('/book/:id/update', reservation_controller.reservation_update_post);

// GET request for one reservation.
router.get('/:id', reservation_controller.reservation_detail);

// GET request for list of all reservations.
router.get('/', reservation_controller.reservation_list);

module.exports = router;