const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        // reservation_code: {type: String, required: true},
        flight : {
            type: Schema.Types.ObjectId, 
            ref: 'Flight', 
            required: true
        },
        passenger : {
            type: Schema.Types.ObjectId, 
            ref: 'Passenger', 
            required: true
        },
        reserve_seat : {type: Number, required: true, unique: true},
        reservation_date : {type: Date}
    }
);
//virtual
reservationSchema.virtual('url').get(function(){
    return '/reservations' + this._id;
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;