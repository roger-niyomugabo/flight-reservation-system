import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Passenger from '../models/passenger_model.js';
dotenv.config({path: './config/config.env'});

//middleware function for creating token
const maxAge = 3*24*60*60;
const createToken = (id, role)=>{
    return jwt.sign({id, role}, process.env.TOKEN_KEY, {expiresIn: maxAge * 1000});
}

const passenger_list = async (req, res, next) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).json({
            message: 'All passengers and users',
            passengers
        });
    } catch (error) {
        return next(error);
    }
}

const passenger_create_post = async (req, res, next) => {
    try {
        const passenger = await Passenger.findOne({userName: req.body.userName});
        const roles = await Passenger.findOne({role: req.body.role});
        if (roles) {
            res.status(401).json({
                message: 'Only one Admin is allowed', 
            });
        } else if (passenger) {
            res.status(401).json({
                message: 'User name already used', 
            });
        } else {
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
            const passenger = await Passenger.create(newPassenger);
            if (passenger) {
                const token = createToken(passenger._id, passenger.role);
                res.status(200).json({
                    message: 'successfully logged in',
                    passenger : passenger,
                    token: token
                });
            }
        }
    } catch (error) {
        return next(error);
    }
}

const passenger_login = async (req, res, next) => {
    try {
        const {userName, password} = req.body
        if (!userName || !password) {
            res.json({message: 'all fields are required'});
        } else {
            const passenger = await Passenger.findOne({userName:req.body.userName});
            if (!passenger) {
                res.json({message: 'you have to first register'});
            } else {
                const isMatch = await bcrypt.compare(req.body.password, passenger.password);
                if (!isMatch) {
                    res.json({message: 'incorrect password provided'});
                } else {
                    const token = createToken(passenger._id, passenger.role);
                    res.status(200).json({
                        message: 'sucessfully logged in',
                        passenger: passenger,
                        token: token
                    })
                }
            }
        }
    } catch (error) {
        return next(error);
    }
}

const passenger_logout = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.status(200).json({message:'loged out successfully'});
}

export default {
    passenger_list,
    passenger_create_post,
    passenger_login,
    passenger_logout   
}