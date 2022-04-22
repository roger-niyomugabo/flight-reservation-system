import async from 'async';
import Airport from '../models/airport_model.js';
import Flight from '../models/flight_model.js';

const airport_list = async (req, res, next) => {
    try{
        const airports = await Airport.find();
        res.status(200).json({
            airports
        });
    } catch (error) {
        return next(error);
    }
}

const airport_create_post = async (req, res, next) => {
    try {
        const airport = await Airport.findOne({IATA_code: req.body.IATA_code});
        if (airport) {
            res.status(401).json('No duplicate airport IATA allowed');
        } else {
            const newAirport = new Airport(req.body);
            const airport = await Airport.create(newAirport);
                res.status(200).json({
                    message: 'Airport added',
                    airport
                });
        }
    } catch (error) {
        return next(error);
    }
}

const airport_delete = (req, res, next) => {
    const airport_id = req.params.airport_id;
    async.parallel({
        sources: callback => {
            Flight.find({source: airport_id}).exec(callback);
        },
        destinations: callback => {
            Flight.find({destination: airport_id}).exec(callback);
        }
    }).then ( async results => {
        if (results.sources.length > 0 || results.destinations.length > 0) {
            res.status(401).json({
                message: 'Airport can not be deleted, it still has flights associated to it',
                associated_flights: results
            });
        } else {
            await Airport.findByIdAndDelete(airport_id);
            res.status(200).json({
                message : 'airport deleted successfully',
            });
        }
    }).catch ( error => {
        return next(error);
    });
}

export default {
    airport_list, 
    airport_create_post, 
    airport_delete
}