const Flight = require('../models/flight_model');
const Airport = require('../models/airport_model');
const {Flight_Schema} = require('../validations/Schema_validations');

exports.flight_create_get = (req, res, next)=>{
    Airport.find({},'airport_name')
    .exec(function(err, airports){
        if(err) console.log(err.message);
        res.json(airports);
    })
}

exports.flight_create_post = (req, res, next)=>{
    const validation = Flight_Schema.validate(req.body, {abortEarly: false});
    const {value, error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.json(message);
    }else{
        Flight.findOne({flight_code: req.body.flight_code}, function(err, results){
            if(err) throw error('failed to find flight');
            if(results){
                res.json('No duplicate flight code');
            }else{
                const newFlight = new Flight({
                    flight_code : req.body.flight_code,
                    airline_name : req.body.airline_name,
                    capacity : req.body.capacity,
                    source : req.body.source,
                    destination : req.body.destination,
                    distance : req.body.distance,
                    depart_date : req.body.depart_date,
                    arrival_date : req.body.arrival_date,
                    depart_time : req.body.depart_time,
                    price : req.body.price
                });
                Airport.findOne({airport_name: req.body.destination, airport_name: req.body.source })
                .exec(function(err, airports){
                    if(err) throw error('destination not valid in airport');
                    if(airports == null){
                        const err = new Error('provided airport names not valid in airports');
                        err.status=404;
                        return next(err); 
                    }
                    if(airports.airport_name != req.body.source && airports.airport_name != req.body.destination){
                        res.json('source or destination mismatch');
                    }else{
                        newFlight.save(function(err){
                            if(err) console.log(err.message);
                            res.json('flight successfully saved');
                        })
                    }
                })
            }
        })
    }
}

exports.flight_delete_get = (req, res, next)=>{}

exports.flight_delete_post = (req, res, next)=>{}

exports.flight_update_get = (req, res, next)=>{}

exports.flight_update_post = (req, res, next)=>{}

exports.flight_detail = (req, res, next)=>{}

exports.flight_list = (req, res, next)=>{
    res.send('All Flights');
}