const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_KEY, (err,decodedToken)=>{
            if(err) res.status(400).json(err.message);
            else{
                console.log(decodedToken);
                req.passengerId = decodedToken.id;
                next()
            }
        })
    }else{
        res.json({
            message: 'token not provided, first login'
        })
    }
}
module.exports = {requireAuth};