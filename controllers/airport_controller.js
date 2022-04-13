const async = require('async');
const Airport = require('../models/airport_model');
const Flight = require('../models/flight_model');
const {Airport_Schema} = require('../validations/Schema_validations');

exports.airport_list = (req, res, next)=>{
    Airport.find().exec((err, airports)=>{
        if (err) return next(err);
        res.status(200).json({
            airports
        })
    })
}

exports.airport_create_post = (req, res, next)=>{
    const validation = Airport_Schema.validate(req.body, {abortEarly: false})
    const {value, error} = validation;

    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({message : 'validation errors', message});
    }else{
    Airport.findOne({IATA_code: req.body.IATA_code}, (err, airport)=>{
        if(err) return next(err);
        if(airport){
            res.status(401).json('No duplicate airport IATA allowed');
        }else{
            const newAirport = new Airport(req.body);
            Airport.create(newAirport, (err, airport)=>{
                if(err) return next(err);
                res.status(200).json({
                    message: 'Airport added',
                    airport
                })
            })
        }
    })
    }
}

exports.airport_delete = (req, res, next)=>{
    const airport_id = req.params.airport_id;
    async.parallel({
        sources: callback => {
            Flight.find({source: airport_id}).exec(callback);
        },
        destinations: callback => {
            Flight.find({destination: airport_id}).exec(callback);
        }
    }, (err, results) => {
        if(err) return next(err);
        if(results.sources.length > 0 || results.destinations.length > 0){
            res.status(401).json({
                message: 'Airport can not be deleted, it still has flights associated to it',
                associated_flights: results
            });
        }else{
            Airport.findByIdAndDelete(airport_id, (err, airport)=>{
                if(err) return next(err);
                res.status(200).json({
                    message : 'airport deleted successfully',
                    deleted_Airport : airport
                });
            })
        }
    })
}