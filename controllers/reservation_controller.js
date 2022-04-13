const async = require('async');
const Flight = require('../models/flight_model');
const Passenger = require('../models/passenger_model');
const Reservation = require('../models/reservation_model');
const {Reservation_Schema} = require('../validations/Schema_validations');

exports.reservation_list = (req, res, next)=>{
    const passenger_id = req.passengerId;
    Reservation.find({passenger: passenger_id}).populate('flight').exec((err, reservations)=>{
        if(err) return next(err);
        res.status(200).json({
            message : 'Here are your reservations',
            reservations : reservations
        })
    })
}

exports.flight_reservations_list = (req, res, next)=>{
    const flight_id = req.params.flight_id;
    Reservation.find({flight: flight_id}, (err, reservations)=>{
        if(err) return next(err);
        res.status(200).json({
            message: 'Here are all reservations made for this flight',
            reservations
        });
    });
}

exports.reservation_create_post = async (req, res, next)=>{
    const validation = Reservation_Schema.validate(req.body, {abortEarly:false});
    const {value, error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message : 'validation errors',
            message
        })
    }else{
        const passenger_id = req.passengerId;
        const {flight_id} = req.params;

       const flight = await Flight.findById(flight_id);
       if(!flight){
           res.status(401).json({message: 'this flight does not exist'})
       }
       const passenger = await Passenger.findById(passenger_id);
       if(String(passenger._id) !== String(passenger_id)){
           res.status(401).json({message: 'unauthorized reservation'})
       }

        const results= await Reservation.findOne({flight: flight_id});
        if(results == null || results.reserve_seat != req.body.reserve_seat){
            Reservation.create({
                flight: flight_id,
                passenger: passenger_id,
                reserve_seat: req.body.reserve_seat,
                reservation_date: Date.now()
            }, async (err, reservation)=>{
                if(err) return next(err);
                else{
                    const populatedReservation = await Reservation.findById(reservation._id).populate('flight').populate('passenger')
                    res.status(200).json({
                        message: 'flight reserved',
                        reservation : populatedReservation
                    });
                }
            });
        }else if( results.reserve_seat == req.body.reserve_seat){
            res.status(401).json({message: 'flight seat already reserved'});
        }
    }    
}

exports.reservation_delete = (req, res, next)=>{
    const reservation_id = req.params.reservation_id;
    Reservation.findByIdAndDelete(reservation_id).exec((err, reservation)=>{
        if(err) return next(err);
        res.status(200).json({
            message: 'flight reservation canceled',
            canceled_reservation : reservation
        })
    })
}