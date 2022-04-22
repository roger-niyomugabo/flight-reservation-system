import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: './config/config.env'});

const requireBasicAuth = async (req, res, next) => {
    const bearerHeader = req.header('authorization');
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        const decodedToken = await jwt.verify(bearerToken, process.env.TOKEN_KEY);
            if (decodedToken.role !== "Basic") {
                res.status(401).json({message: 'Not authorized'})
            } else {
                req.passengerId = decodedToken.id;
                next();
            }
    } else {
        res.status(401).json({
            message: 'Bearer not provided'
        });
    }
}

const requireAdminAuth = async (req, res, next) => {
    const bearerHeader = req.header('authorization');
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        const decodedToken = await jwt.verify(bearerToken, process.env.TOKEN_KEY);
            if (decodedToken.role !== "Admin") {
                res.status(401).json({message: 'Not authorized'})
            } else {
                req.passengerId = decodedToken.id;
                next();
            }
    } else {
        res.status(401).json({
            message: 'Bearer not provided'
        });
    }
}
export {requireBasicAuth, requireAdminAuth};