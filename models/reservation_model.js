const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        reservation_Id: {type: String, required: true},
        flight_Id : {type: Schema.Types.ObjectId, ref: 'Flight', required: true},
        passenger_Id : {type: Schema.Types.ObjectId, ref: 'Passenger', required: true},
        reserve_seat : {type: Number, required: true, unique: true},
        reservation_date : {type: Date, default: Date.now} //to be activated at the time of saving to the DB
    }
);
//virtual
reservationSchema.virtual('url').get(function(){
    return '/reservations' + this._id;
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;