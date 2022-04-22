import Flight from '../models/flight_model.js';
import Airport from '../models/airport_model.js';
import Reservation from '../models/reservation_model.js';

const flight_list = async (req, res, next) => {
    try {
        const flights = await Flight.find().populate('source', 'airport_name').populate('destination', 'airport_name');
        res.status(200).json({message: 'Available flights', flights});
    } catch (error) {
        return next(error);
    }
}

const flight_create_post = async (req, res, next) => {
    try {
        const flight = await Flight.findOne({flight_code: req.body.flight_code});
        if (flight) {
            res.status(401).json({message:'No duplicate flight code'});
        } else {
            const airports = await Airport.find();
            const airportId = airports._id;
            const newFlight = new Flight(req.body, {source:airportId, destination:airportId});
            const flight = await Flight.create(newFlight);
            const populatedFlight = await Flight.findById(flight._id).
                populate('source', 'airport_name').
                populate('destination', 'airport_name')
                res.json({message: 'flight added', populatedFlight});
        }
    } catch (error) {
        return next(error);
    }
}

const flight_delete = async (req, res, next) => {
    try {
        const flight_id = req.params.flight_id;
        const reservation = await Reservation.find({'flight': flight_id});
        if (reservation.length > 0) {
            res.status(401).json({
                message: 'can not delete flight that still has been reserved',
                reservation
            });
        } else {
            await Flight.findByIdAndDelete(flight_id);
            res.status(200).json({message: 'flight deleted'});
        }
    } catch (error) {
        return next(error);
    }
}

const flight_update_post = async (req, res, next) => {
    try {
        const flight_id = req.params.flight_id;
        const airports = await Airport.find(); 
        const airportId = airports._id;
        const newFlight = new Flight(req.body,
            {source:airportId, 
            destination:airportId,
            _id: flight_id
        });
        const flight = await Flight.findByIdAndUpdate(flight_id, newFlight);
        const updatedFlight = await Flight.findById(flight._id)
        .populate('source', 'airport_name').populate('destination', 'airport_name');
        res.json({message: 'flight updated', updatedFlight});
    } catch (error) {
        return next(error);
    }
}

export default {
    flight_list,
    flight_create_post,
    flight_delete,
    flight_update_post
}