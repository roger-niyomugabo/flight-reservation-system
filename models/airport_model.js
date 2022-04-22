import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const airportSchema= new Schema(
    {
        airport_name : {type : String, required: true},
        country :{type: String, required: true},
        city: {type:String, required:true},
        IATA_code : {type: String, required: true, unique: true}
    }
);

const Airport = mongoose.model('Airport', airportSchema);
export default Airport;