const router = require('express').Router();
const {requireAdminAuth} = require('../middlewares/auth');

const airport_controller = require('../controllers/airport_controller')

// GET request for list of all airports.
router.get('/', airport_controller.airport_list);

// GET request for creating airport.
router.get('/create', requireAdminAuth,airport_controller.airport_create_get);

// POST request for creating airport.
router.post('/create', requireAdminAuth, airport_controller.airport_create_post);

// GET request to delete airport.
router.get('/:airport_id/delete', requireAdminAuth,airport_controller.airport_delete_get);



// POST request to delete airport.
router.post('/:id/delete', airport_controller.airport_delete_post);
// GET request for one airport.
router.get('/:id', airport_controller.airport_detail);



module.exports = router;