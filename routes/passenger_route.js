import express from 'express';
const router = express.Router();
import {requireAdminAuth} from'../middlewares/auth.js';
import validation from '../middlewares/validations.js';
import passenger_controller from '../controllers/passenger_controller.js';

// GET request for list of all passengers.
router.get('/', requireAdminAuth, passenger_controller.passenger_list);

// POST request for creating passenger.
router.post('/create', validation.passenger, passenger_controller.passenger_create_post);

//passenger login
router.post('/login', passenger_controller.passenger_login);

//passenger logout
router.get('/logout', passenger_controller.passenger_logout);

export default router;