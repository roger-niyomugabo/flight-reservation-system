const router = require('express').Router();
const {requireAdminAuth} = require('../middlewares/auth');
const passenger_controller = require('../controllers/passenger_controller');

// GET request for list of all passengers.
router.get('/', requireAdminAuth, passenger_controller.passenger_list);

// POST request for creating passenger.
router.post('/create', passenger_controller.passenger_create_post);

//passenger login
router.post('/login', passenger_controller.passenger_login);

//passenger logout
router.get('/logout', passenger_controller.passenger_logout);

module.exports = router;