const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Passenger = require('../models/passenger_model');
const {Passenger_Schema} = require('../validations/Schema_validations');
dotenv.config({path: './config/config.env'});

//middleware function for creating token
const maxAge = 3*24*60*60;
const createToken = (id, role)=>{
    return jwt.sign({id, role}, process.env.TOKEN_KEY,{expiresIn: maxAge});
}

exports.passenger_list = (req, res, next)=>{
    Passenger.find({}, (err, passengers)=>{
        if(err) return next(err);
        res.status(200).json({
            message: 'All passengers and users',
            passengers
        })
    });
}

exports.passenger_create_post = async (req, res, next)=>{
    const validation = Passenger_Schema.validate(req.body, {abortEarly: false});
    const {error} = validation;
    if(error){
        const message = error.details.map(currentError => currentError.message);
        res.status(401).json({
            message: 'validation errors',
            message
        })
    }else{
        const passenger = await Passenger.findOne({userName: req.body.userName});
        const roles = await Passenger.findOne({role: req.body.role});
        if(roles){
            res.status(401).json({
                message: 'Only one Admin is allowed', 
            });
        }else if(passenger){
            res.status(401).json({
                message: 'User name already used', 
            });
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
                if(err) return next(err);
                if(passenger) {
                    const token= createToken(passenger._id, passenger.role);
                    res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
                    res.status(200).json({
                        message: 'successfully logged in',
                        passenger : passenger,
                        token: token
                    });
                }
            });
        }
    }
}

exports.passenger_login = async (req, res, next)=>{
    if(req.body.userName == null || req.body.password == null){
        res.json({message: 'all fields are required'});
    }else{
        const passenger = await Passenger.findOne({userName:req.body.userName});
        if(!passenger){
            res.json({message: 'you have to first register'});
        }else{
            bcrypt.compare(req.body.password, passenger.password, (err, isMatch)=>{
                if(err) return next(err);
                if(!isMatch){
                    res.json({message: 'incorrect password provided'});
                }else{
                    const token = createToken(passenger._id, passenger.role);
                    res.cookie('jwt', token, {httpOnly: true, maxAge : maxAge * 1000});
                    res.status(200).json({
                        message: 'sucessfully logged in',
                        passenger: passenger,
                        token: token
                    })
                }
            })
        }
    }
}

exports.passenger_logout = (req, res)=>{
    res.cookie('jwt', '', {maxAge : 1});
    res.status(200).json({message:'loged out successfully'});
}