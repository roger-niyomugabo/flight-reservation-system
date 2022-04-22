import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
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
        reserve_seat : {type: Number, required: true},
        reservation_date : {type: Date}
    }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;