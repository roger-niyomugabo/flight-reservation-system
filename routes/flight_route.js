import express from 'express';
const router = express.Router();
import {requireAdminAuth} from '../middlewares/auth.js';
import validation from '../middlewares/validations.js';
import flight_controller from '../controllers/flight_controller.js';

// GET request for list of all flights.
router.get('/', flight_controller.flight_list);

// POST request for creating flight.
router.post('/create', requireAdminAuth, validation.flight, flight_controller.flight_create_post);

// GET request to delete flight.
router.get('/:flight_id/delete', requireAdminAuth, flight_controller.flight_delete);

// POST request to update flight.
router.post('/:flight_id/update', requireAdminAuth, validation.flight, flight_controller.flight_update_post);

export default router;