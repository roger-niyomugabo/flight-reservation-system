const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
    {
        passenger_Id : {type: Number, required: true, unique: true},
        fullName : {type: String, required: true},
        occupation : {type: String},
        email : {type: String, required: true},
        phoneNumber : {type: String, required: true},
        country : {type: String, required: true},
        city : {type: String, required: true},
        postcode : {type: String},
        street : {type: String}
    }
);
//virtual
passengerSchema.virtual('url').get(function(){
    return '/passengers' + this._id;
});

const Passenger = mongoose.model('Passenger', passengerSchema);
module.exports = Passenger;