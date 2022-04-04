const Joi = require('joi');

const Schemas = {
    Airport_Schema : Joi.object({
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
    }),

    Flight_Schema : Joi.object({
        flight_code : Joi.string().trim().pattern(new RegExp(/^[0-9]{3}$/)).required().messages({
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
    }),
    //other schemas
}

module.exports = Schemas;