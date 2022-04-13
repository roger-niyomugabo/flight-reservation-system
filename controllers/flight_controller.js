const Flight = require('../models/flight_model');
const Airport = require('../models/airport_model');
const Reservation = require('../models/reservation_model');
const {Flight_Schema} = require('../validations/Schema_validations');

exports.flight_list = (req, res, next)=>{
    Flight.find().populate('source').populate('destination')
    .exec((err, flights)=>{
        if(err) return next(err);
        res.status(200).json({message: 'Available flights', flights});
    });
}

exports.flight_create_post = (req, res, next)=>{
    const validation = Flight_Schema.validate(req.body, {abortEarly: false});
    const {value, error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({message: 'validation errors', message});
    }else{
        Flight.findOne({flight_code: req.body.flight_code}, (err, flight)=>{
            if(err) return next(err);
            if(flight){
                res.status(401).json({message:'No duplicate flight code'});
            }else{
                Airport.find({}, (err, airports)=>{
                    if(err) return next(err); 
                    const airportId = airports._id;
                    const newFlight = new Flight(req.body, {source:airportId, destination:airportId});
                    Flight.create(newFlight, async (err, flight)=>{
                        if(err) return next(err); 
                        const populatedFlight = await Flight.findById(flight._id).populate('source').populate('destination')
                        res.json({message: 'flight added', populatedFlight});
                    })
                })
            }
        })
    }
}

exports.flight_delete = async (req, res, next)=>{
    const flight_id = req.params.flight_id;
    const reservation = await Reservation.find({'flight': flight_id});
    if(reservation.length > 0){
        res.status(401).json({
            message: 'can not delete flight that still has been reserved',
            reservation
        });
    }else{
        Flight.findByIdAndDelete(flight_id, (err, flight)=>{
            if(err) return next(err);
            res.status(200).json({
                message: 'flight deleted',
                deletedFlight: flight
            })
        })
    }
}

exports.flight_update_post = (req, res, next)=>{
    const validation = Flight_Schema.validate(req.body, {abortEarly: false});
    const {value, error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({message: 'validation errors', message});
    }else{
        const flight_id = req.params.flight_id;
        Airport.find({}, (err, airports)=>{
            if(err) return next(err); 
            const airportId = airports._id;
            const newFlight = new Flight(req.body,
                {source:airportId, 
                destination:airportId,
                _id: flight_id
            });
            Flight.findByIdAndUpdate(flight_id, newFlight, async (err, flight)=>{
                if(err) return next(err); 
                const updatedFlight = await Flight.findById(flight._id).populate('source').populate('destination')
                res.json({message: 'flight updated', updatedFlight});
            })
        })
    }
}