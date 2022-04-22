import express from 'express';
const router = express.Router();
import {requireBasicAuth, requireAdminAuth} from '../middlewares/auth.js';
import validation from '../middlewares/validations.js';
import reservation_controller from '../controllers/reservation_controller.js';

// GET request for list of all reservations. for a particular passenger
router.get('/reservations', requireBasicAuth, reservation_controller.reservation_list);

//GET finding reservations for a particular flight
router.get('/flight/:flight_id/reservations', requireAdminAuth, reservation_controller.flight_reservations_list)

// POST request for creating reservation.|| reserve when  you  are authenticated
router.post('/flights/:flight_id/reserve', requireBasicAuth, validation.reservation, reservation_controller.reservation_create_post);//done

//Cancel reservation
router.get('/reservations/:reservation_id/cancel',requireBasicAuth, reservation_controller.reservation_delete);

export default router;