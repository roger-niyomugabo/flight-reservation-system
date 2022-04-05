const Flight = require('../models/flight_model');
const Passenger = require('../models/passenger_model');
const Reservation = require('../models/reservation_model');
const {Reservation_Schema} = require('../validations/Schema_validations');

exports.reservation_create_get = (req, res, next)=>{
    res.send('GET to create reservation');
}

exports.reservation_create_post = (req, res, next)=>{
    const validation = Reservation_Schema.validate(req.body, {abortEarly:false});
    const {error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(400).json({
            status: 'error',
            message : message
        })
    }else{
        Reservation.findOne({reserve_seat: req.body.reserve_seat}, (err, seat)=>{
            if(err) console.log(err);
            if(seat){
                res.json({message: 'seat already reserved', seat: seat})
            }else{
                const newReservation = new Reservation({
                    reservation_code: req.body.reservation_code,
                    flight_code : req.body.flight_code,
                    userName : req.body.userName,
                    reserve_seat : req.body.reserve_seat,
                    reservation_date : Date.now()
                });
                newReservation.save(function(err){
                    if(err) console.log(err)
                    res.status(200).json({
                        status : 'success',
                        message :  'successfully saved'
                    })
                })
            }
        })
    }
}

exports.reservation_delete_get = (req, res, next)=>{}

exports.reservation_delete_post = (req, res, next)=>{}

exports.reservation_update_get = (req, res, next)=>{}

exports.reservation_update_post = (req, res, next)=>{}

exports.reservation_detail = (req, res, next)=>{}

exports.reservation_list = (req, res, next)=>{}