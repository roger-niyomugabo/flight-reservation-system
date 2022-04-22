import Flight from '../models/flight_model.js';
import Passenger from '../models/passenger_model.js';
import Reservation from '../models/reservation_model.js';

const reservation_list = async (req, res, next) => {
    try{
        const passenger_id = req.passengerId;
        const reservations = await Reservation.find({passenger: passenger_id})
        .populate('flight', 'airline_name');
        res.status(200).json({
            message : 'Here are your reservations',
            reservations 
        });
    } catch (error) {
        return next(error);
    }
}

const flight_reservations_list = async (req, res, next) => {
    try {
        const flight_id = req.params.flight_id;
        const reservations = await Reservation.find({flight: flight_id});
        res.status(200).json({
            message: 'Here are all reservations made for this flight',
            reservations
        });
    } catch (error) {
        return next(error);
    }
}

const reservation_create_post = async (req, res, next) => {
    try {
        const passenger_id = req.passengerId;
        const {flight_id} = req.params;

       const flight = await Flight.findById(flight_id);
       if (!flight) {
           res.status(401).json({message: 'this flight does not exist'})
       }
       const passenger = await Passenger.findById(passenger_id);
       if (String(passenger._id) !== String(passenger_id)) {
           res.status(401).json({message: 'unauthorized reservation'})
       }

        const results = await Reservation.findOne({flight: flight_id});
        if (results == null || results.reserve_seat != req.body.reserve_seat) {
            const reservation = await Reservation.create({
                flight: flight_id,
                passenger: passenger_id,
                reserve_seat: req.body.reserve_seat,
                reservation_date: Date.now()
            });
            const populatedReservation = await Reservation.findById(reservation._id)
            .populate('flight', 'airline_name').populate('passenger', 'fullName');
            res.status(200).json({
                message: 'flight reserved',
                reservation : populatedReservation
            });
        } else if ( results.reserve_seat == req.body.reserve_seat) {
            res.status(401).json({message: 'flight seat already reserved'});
        }
    } catch (error) {
        return next(error);
    }
}

const reservation_delete = async (req, res, next) => {
    try {
        const reservation_id = req.params.reservation_id;
        await Reservation.findByIdAndDelete(reservation_id);
        res.status(200).json({
            message: 'flight reservation canceled',
        })
    } catch (error) {
        return next(error);
    }
}

export default {
    reservation_list,
    flight_reservations_list,
    reservation_create_post,
    reservation_delete
}