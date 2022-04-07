const async = require('async');
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

    }    
}


exports.reservation_delete_get = (req, res, next)=>{}

exports.reservation_delete_post = (req, res, next)=>{}

exports.reservation_update_get = (req, res, next)=>{}

exports.reservation_update_post = (req, res, next)=>{}

exports.reservation_detail = (req, res, next)=>{}

exports.reservation_list = (req, res, next)=>{}