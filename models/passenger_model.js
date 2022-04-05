const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
    {
        fullName : {type: String, required: true},
        userName : {type: String, required: true, unique: true},
        password : {type : String, required: true},
        occupation : {type: String},
        email : {type: String, required: true, unique: true},
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