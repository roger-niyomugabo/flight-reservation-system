const router = require('express').Router();

const airport_controller = require('../controllers/airport_controller')

// GET request for creating airport.
router.get('/create', airport_controller.airport_create_get);

// POST request for creating airport.
router.post('/create', airport_controller.airport_create_post);

// GET request to delete airport.
router.get('/:id/delete', airport_controller.airport_delete_get);

// POST request to delete airport.
router.post('/:id/delete', airport_controller.airport_delete_post);

// GET request for one airport.
router.get('/:id', airport_controller.airport_detail);

// GET request for list of all airports.
router.get('/', airport_controller.airport_list);


module.exports = router;