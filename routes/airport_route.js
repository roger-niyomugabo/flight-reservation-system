const router = require('express').Router();
const {requireAdminAuth} = require('../middlewares/auth');
const airport_controller = require('../controllers/airport_controller')

// GET request for list of all airports.
router.get('/', requireAdminAuth, airport_controller.airport_list);

// POST request for creating airport.
router.post('/create', requireAdminAuth, airport_controller.airport_create_post);

// DELETE request to delete airport.
router.get('/:airport_id/delete', requireAdminAuth,airport_controller.airport_delete);

module.exports = router;