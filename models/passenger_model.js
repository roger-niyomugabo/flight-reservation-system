import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
    {
        fullName : {type: String, required: true},
        userName : {type: String, required: true, unique: true},
        password : {type : String, required: true},
        occupation : {type: String},
        email : {type: String, required: true},
        phoneNumber : {type: String, required: true},
        country : {type: String, required: true},
        city : {type: String, required: true},
        postcode : {type: String},
        street : {type: String},
        role : {type : String, enum: ['Admin', 'Basic'], default: "Basic" ,required: true}
    }
);

const Passenger = mongoose.model('Passenger', passengerSchema);
export default Passenger;