const router = require('express').Router();
const {requireBasicAuth,requireAdminAuth} = require('../middlewares/auth');
const passenger_controller = require('../controllers/passenger_controller');

// GET request for creating passenger.
router.get('/create', passenger_controller.passenger_create_get);

// POST request for creating passenger.
router.post('/create', passenger_controller.passenger_create_post);

// GET request to delete passenger.
router.get('/:id/delete', passenger_controller.passenger_delete_get);

// POST request to delete passenger.
router.post('/:id/delete', passenger_controller.passenger_delete_post);

// GET request to update passenger.
router.get('/book/:id/update', passenger_controller.passenger_update_get);

// POST request to update passenger.
router.post('/book/:id/update', passenger_controller.passenger_update_post);

// GET request for one passenger.
router.get('/:id', passenger_controller.passenger_detail);

// GET request for list of all passengers.
router.get('/', passenger_controller.passenger_list);

//passenger login
router.post('/login', passenger_controller.passenger_login);

//passenger logout
router.get('/logout', passenger_controller.passenger_logout);

module.exports = router;