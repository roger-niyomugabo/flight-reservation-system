const Airport = require('../models/airport_model');
const {Airport_Schema} = require('../validations/Schema_validations');

exports.airport_create_get = (req, res, next)=>{
    res.send('GET to create airport');
}

exports.airport_create_post = (req, res, next)=>{
    const validation = Airport_Schema.validate(req.body, {abortEarly: false})
    const {value, error} = validation;

    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.json(message);
    }else{
    Airport.findOne({IATA_code: req.body.IATA_code}, function(err, results){
        if(err) console.log('failed to find airport');
        if(results){
            res.json('No duplicate airport IATA allowed');
        }else{
            const airport = new Airport({
                airport_name : req.body.airport_name,
                country : req.body.country,
                city : req.body.city,
                IATA_code : req.body.IATA_code
            });
            airport.save(function(err){
                if(err) console.log('failed to save airport');
                console.log('airport successfully saved');
                res.json('successfully saved');
            })
        }
    })
    }
}

exports.airport_delete_get = (req, res, next)=>{}

exports.airport_delete_post = (req, res, next)=>{}

exports.airport_detail = (req, res, next)=>{}

exports.airport_list = (req, res, next)=>{
    res.send('Here are airports');
}