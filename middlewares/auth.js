const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

const requireBasicAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_KEY, (err,decodedToken)=>{
            if(err) res.status(400).json(err.message);
            if(decodedToken.role !== "Basic"){
                res.status(401).json({message: 'Not authorized'})
            }else{
                console.log(decodedToken);
                req.passengerId = decodedToken.id;
                next();
            }
        })
    }else{
        res.json({
            message: 'token not provided, first login'
        })
    }
}

const requireAdminAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_KEY, (err,decodedToken)=>{
            if(err) res.status(400).json(err.message);
            if(decodedToken.role !== "Admin"){
                res.status(401).json({message: 'Not authorized'})
            }else{
                console.log(decodedToken);
                req.passengerId = decodedToken.id;
                next();
            }
        })
    }else{
        res.json({
            message: 'token not provided, first login'
        })
    }
}
module.exports = {requireBasicAuth, requireAdminAuth};