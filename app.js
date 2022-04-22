import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './database/connection.js';

//configure env file
dotenv.config({path: './config/config.env'});
//importing routes
import passengerRouter from './routes/passenger_route.js';
import flightRouter from './routes/flight_route.js';
import reservationRouter from './routes/reservation_route.js';
import airportRouter from './routes/airport_route.js';

//express app
const app = express();

//databse connection 
connectDB();

app.listen(3000);

//using middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.use('/passengers', passengerRouter);
app.use('/flights', flightRouter);
app.use('/airports', airportRouter);
app.use(reservationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send('An Error occured');
})