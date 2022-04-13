const express = require('express');
const createError = require('http-errors');
const path= require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//configure env file
dotenv.config({path: './config/config.env'});
//importing routes
const passengerRouter = require('./routes/passenger_route');
const flightRouter = require('./routes/flight_route');
const reservationRouter = require('./routes/reservation_route');
const airportRouter = require('./routes/airport_route');

//express app
const app = express();

//databse connection 
const DB_URI = process.env.MONGODB_URI;
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(results=>{
    console.log('Database connected');
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});

//using middlewares
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

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