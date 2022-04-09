const router = require('express').Router();
const {requireAuth} = require('../middlewares/auth');

const reservation_controller = require('../controllers/reservation_controller')

// GET request for list of all reservations. for a particular passenger
router.get('/reservations', requireAuth, reservation_controller.reservation_list);

// POST request for creating reservation.|| reserve when  you  are authenticated
router.post('/flights/:flight_id/reserve', requireAuth, reservation_controller.reservation_create_post);//done

//Cancel reservation
router.get('/reservations/:reservation_id/cancel',requireAuth, reservation_controller.reservation_delete);



// GET request for creating reservation.
router.get('/create', reservation_controller.reservation_create_get);
// GET request to delete reservation.
router.get('/:id/delete', reservation_controller.reservation_delete_get);
// POST request to delete reservation.
router.post('/:id/delete', reservation_controller.reservation_delete_post);
// GET request to update reservation.
router.get('/book/:id/update', reservation_controller.reservation_update_get);
// POST request to update reservation.
router.post('/book/:id/update', reservation_controller.reservation_update_post);
// GET request for one reservation.
router.get('/:id', reservation_controller.reservation_detail);


module.exports = router;