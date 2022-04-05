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
const homeRouter = require('./routes/home');
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


//setting ejs as template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//using middlewares
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use(homeRouter);
app.use('/passengers', passengerRouter);
app.use('/flights', flightRouter);
app.use('/airports', airportRouter);
app.use('/reservations', reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});