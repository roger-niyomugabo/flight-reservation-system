const router = require('express').Router();
const {requireAdminAuth} = require('../middlewares/auth');
const flight_controller = require('../controllers/flight_controller')

// GET request for list of all flights.
router.get('/', flight_controller.flight_list);

// POST request for creating flight.
router.post('/create', requireAdminAuth, flight_controller.flight_create_post);

// GET request to delete flight.
router.get('/:flight_id/delete', requireAdminAuth, flight_controller.flight_delete);

// POST request to update flight.
router.post('/:flight_id/update', requireAdminAuth, flight_controller.flight_update_post);

module.exports = router;