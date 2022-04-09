const Flight = require('../models/flight_model');
const Passenger = require('../models/passenger_model');
const Reservation = require('../models/reservation_model');
const {Reservation_Schema} = require('../validations/Schema_validations');

exports.reservation_create_get = (req, res, next)=>{
    res.send('GET to create reservation');
}

exports.reservation_list = async (req, res, next)=>{
    const passenger_id = req.passengerId;
    Reservation.find({passenger: passenger_id}).populate('flight').exec(function(err, reservations){
        if(err) console.log(err)
        res.status(200).json({
            message : 'Here are your reservations',
            reservations : reservations
        })
    })
}


exports.reservation_create_post = async (req, res, next)=>{
    const validation = Reservation_Schema.validate(req.body, {abortEarly:false});
    const {error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(400).json({
            status: 'error',
            message : message
        })
    }else{
        const passenger_id = req.passengerId;
        const {flight_id} = req.params;
        console.log('passenger_id', passenger_id)
        console.log('flight_id', flight_id)

       const flight = await Flight.findById(flight_id);
       if(!flight){
           res.status(401).json({message: 'this flight does not exist'})
       }
       const passenger = await Passenger.findById(passenger_id);
       if(String(passenger._id) !== String(passenger_id)){
           res.status(401).json({message: 'unauthorized reservation'})
       }
        Reservation.create({
            flight: flight_id,
            passenger: passenger_id,
            reserve_seat: req.body.reserve_seat,
            reservation_date: Date.now()
        }, async (err, reservation)=>{
            if(err) console.log(err);
            else{
                const populatedReservation = await Reservation.findById(reservation._id).populate('flight').populate('passenger')
                res.status(200).json({
                    message: 'flight reserved',
                    reservation : populatedReservation
                });
            }
        });
    }    
}

exports.reservation_delete = (req, res, next)=>{
    const reservation_id = req.params.reservation_id;
    Reservation.findByIdAndDelete(reservation_id).exec(function(err, reservation){
        if(err) console.log(err);
        res.status(200).json({
            message: 'flight reservation canceled',
            canceled_reservation : reservation
        })
    })
}


exports.reservation_delete_get = (req, res, next)=>{}

exports.reservation_delete_post = (req, res, next)=>{}

exports.reservation_update_get = (req, res, next)=>{}

exports.reservation_update_post = (req, res, next)=>{}

exports.reservation_detail = (req, res, next)=>{}
