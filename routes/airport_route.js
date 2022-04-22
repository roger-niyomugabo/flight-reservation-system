import express from 'express';
const router = express.Router();
import {requireAdminAuth} from '../middlewares/auth.js';
import airport_controller from '../controllers/airport_controller.js';
import validation from '../middlewares/validations.js';

// GET request for list of all airports.
router.get('/', requireAdminAuth, airport_controller.airport_list);

// POST request for creating airport.
router.post('/create', requireAdminAuth, validation.airport, airport_controller.airport_create_post);

// DELETE request to delete airport.
router.get('/:airport_id/delete', requireAdminAuth, airport_controller.airport_delete);

export default router;