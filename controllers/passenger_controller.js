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
const createToken = (id, role)=>{
    return jwt.sign({id, role}, process.env.TOKEN_KEY,{expiresIn: maxAge});
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
            // if(passenger === "Admin"){
            //     res.status(401).json({
            //         message: 'Admin already exists',
            //     })
            // }
            if(passenger){
                res.status(401).json({
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
                    street : req.body.street,
                    role : req.body.role
                });
                Passenger.create(newPassenger,  (err, passenger)=>{
                    if(err) throw err;
                    if(passenger) {
                        const token= createToken(passenger._id, passenger.role);
                        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
                        res.status(200).json({
                            status: 'success',
                            message: 'passenger successfully loged in',
                            passenger : passenger,
                            token: token
                        });
                    }
                });
            }
        });
    }
}

exports.passenger_delete_get = (req, res, next)=>{}

exports.passenger_delete_post = (req, res, next)=>{}

exports.passenger_update_get = (req, res, next)=>{}

exports.passenger_update_post = (req, res, next)=>{}

exports.passenger_detail = (req, res, next)=>{}

exports.passenger_list = (req, res, next)=>{}

exports.passenger_login = async (req, res, next)=>{
    if(req.body.userName == null || req.body.password == null){
        res.json('all fields are required');
    }else{
        const passenger = await Passenger.findOne({userName:req.body.userName});
        if(!passenger){
            res.json('you have to first register');
        }else{
            bcrypt.compare(req.body.password, passenger.password, (err, isMatch)=>{
                if(err) console.log(err.message);
                if(!isMatch){
                    res.json('incorrect password provided')
                }else{
                    const token = createToken(passenger._id, passenger.role);
                    res.cookie('jwt', token, {httpOnly: true, maxAge : maxAge * 1000});
                    res.status(200).json({
                        message: 'logged in sucessfully',
                        passenger: passenger,
                        token: token
                    })
                }
            })
        }
    }
}

exports.passenger_logout = (req, res, next)=>{
    res.cookie('jwt', '', {maxAge : 1});
    res.status(200).json({message:'loged out successfully'});
}