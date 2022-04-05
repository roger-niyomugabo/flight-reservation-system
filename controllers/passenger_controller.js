const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Passenger = require('../models/passenger_model');
const {Passenger_Schema} = require('../validations/Schema_validations');
dotenv.config({path: './config/config.env'});

exports.passenger_create_get = (req, res, next)=>{
    res.send('GET to get to register passenger');
}

//middleware function for creating token
const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_KEY,{expiresIn: maxAge});
}

exports.passenger_create_post = async (req, res, next)=>{
    const validation = Passenger_Schema.validate(req.body, {abortEarly: false});
    const {error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.json(message);
    }else{
        Passenger.findOne({userName: req.body.userName}, async (err, passenger)=>{
            if(err) console.log(err);
            if(passenger){
                res.status(200).json({
                    status : 'success',
                    message: 'passenger with that user name already registered',
                    passenger : passenger
                })
            }else{
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const newPassenger = new Passenger({
                    fullName : req.body.fullName,
                    userName : req.body.userName,
                    password : hashedPassword,
                    occupation : req.body.occupation,
                    email : req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    country : req.body.country,
                    city : req.body.city,
                    postcode : req.body.postcode,
                    street : req.body.street
                });
                Passenger.create(newPassenger,  (err, passenger)=>{
                    if(err) throw err;
                    if(passenger){
                        const token= createToken(passenger._id);
                        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
                        res.status(200).json({
                            status: 'success',
                            message: 'passenger successfully loged in',
                            passenger : passenger._id
                        });
                    }
                })
            }
        })
    }
}

exports.passenger_delete_get = (req, res, next)=>{}

exports.passenger_delete_post = (req, res, next)=>{}

exports.passenger_update_get = (req, res, next)=>{}

exports.passenger_update_post = (req, res, next)=>{}

exports.passenger_detail = (req, res, next)=>{}

exports.passenger_list = (req, res, next)=>{}