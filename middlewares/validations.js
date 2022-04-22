import Joi from 'joi';

const strongPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const airport = (req, res, next) =>{
    //Airport validations
    const schema = Joi.object({
        airport_name : Joi.string().required().messages({
            'string.empty': 'Airport Name required'}),
        country : Joi.string().trim().min(3).required().messages({
            'string.empty' : 'Country required',
            'string.min' : 'Country constists of atleast 3 letters'}),
        city : Joi.string().trim().min(3).required().messages({
            'string.empty' : 'city required',
            'string.min' : 'city constists of atleast 3 letters'}),
        IATA_code : Joi.string().trim().pattern(new RegExp(/^[A-Z]{3}$/)).required().messages({
            'string.empty' : 'IATA code highly required',
            'string.pattern.base' : 'IATA code should be 3 uppercase letters'
        })  
    });
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error) {
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message: 'validation errors',
            message
        })
    } else {
        next();
    }
}

const flight = (req, res, next) => {
//Flight validations
const schema = Joi.object({
    flight_code : Joi.string().trim().pattern(new RegExp(/^[0-9]{3,4}$/)).required().messages({
        'string.empty' : 'Flight code required',
        'string.pattern.base' : 'Flight code contains of 3 numbers only'}),
    airline_name : Joi.string().trim().min(3).messages({'string.empty' : 'Airline required'}),
    capacity : Joi.string().pattern(new RegExp(/^[0-9]{2,4}$/)).required().messages({
        'string.empty' : 'capacity required',
        'string.pattern.base' : 'invalid capacity number'}),
    source : Joi.string().required(), //reference to airport
    destination : Joi.string().required(), //reference to airport
    distance : Joi.number().positive().required().messages({
        'number.empty' : 'Distance required',
        'number.positive' : 'Distance must be positive'}),
    depart_date : Joi.date().required(),
    arrival_date : Joi.date().required(),
    depart_time : Joi.string().pattern(new RegExp(/^([0-9]{2})\:([0-9]{2})$/)).required().messages({
        'string.empty' : 'Departure time is required',
        'string.pattern.base' : 'Invalid time format'
    }),
    price : Joi.number().positive().precision(2).required().messages({
        'number.empty' : 'Price is required',
        'number.positive' : 'Price must be positive value',
        'number.precision' : 'Price must have only {#limit} decimal places',
    })
    });
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error) {
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message: 'validation errors',
            message
        })
    } else {
        next();
    }
}
//Passenger validations
const passenger = (req, res, next) => {
const schema = Joi.object({
    fullName : Joi.string().trim().pattern(new RegExp(/^[a-zA-Z][a-zA-Z\ ]{5,}[a-zA-Z]+$/i)).required().messages({
        'string.empty' : 'Full naame required',
        'string.pattern.base' : 'provide your names with only letters'}),
    userName : Joi.string().trim().pattern(new RegExp(/^[A-Za-z0-9]{5,10}$/i)).required().messages({
        'string.empty' : 'User name required',
        'string.pattern.base': 'User name consists of letters and numbers and atleast between 5 and 10 chars long'}),
    password : Joi.string().pattern(new RegExp(strongPassword)).required().messages({
        'string.empty' : 'password required',
        'string.pattern.base' : 'provide password with uppercase lowercase and include a digit'}),
    occupation : Joi.string().trim().allow(null, ''),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow :['com','rw', 'uk', 'fr']}}).trim().lowercase().messages({
        'string.email': 'Invalid, email must include .com or .net',
        'string.empty' : 'Email is required'
    }),
    phoneNumber : Joi.string().trim().pattern(new RegExp(/^[0-9]{10,}$/)).required().messages({
        'string.empty' : 'Phone number required',
        'string.pattern.base' : 'provide valid phone number'}),
    country : Joi.string().required(),
    city : Joi.string().required(),
    postcode : Joi.string().pattern(new RegExp(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/)).allow(null, '').messages({
        'string.pattern.base' : 'invalid for postal code'}),
    street : Joi.string().allow(null, ''),
    role: Joi.string()
    });
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error) {
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message: 'validation errors',
            message
        })
    } else {
        next();
    }
}

//Reservation validations
const reservation = (req, res, next) => {
const schema = Joi.object({
    reserve_seat : Joi.number().positive().required().messages({
        'number.empty' : 'reserve_seat required',
        'number.positive' : 'reserve_seat must be positive'}),
    });
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error) {
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message: 'validation errors',
            message
        })
    } else {
        next();
    }
}
export default {
    airport,
    flight,
    passenger,
    reservation
} 