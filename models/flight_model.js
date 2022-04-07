const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema(
    {
        flight_code : {type: String, required: true, unique: true},
        airline_name : {type: String, required: true},
        capacity : {type: String, required : true},
        source: {type: Schema.Types.ObjectId, ref: 'Airport', required: true},
        destination: {type: Schema.Types.ObjectId, ref: 'Airport', required: true},
        distance : {type: Number, required: true},
        depart_date: {type : Date, required: true},
        arrival_date :{type: Date, required: true},
        depart_time :{type: String, required: true},
        price: {type: Number, required: true},
        // available_seats : {type: Number, required : true} // to be calculated capacity-1 something to be done
        // duration : {type: Date, required: true} // to be calculated arr-dep times 
    }
);
//virtual
flightSchema.virtual('url').get(function(){
    return '/flights' + this._id;
})

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;