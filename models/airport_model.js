const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema= new Schema(
    {
        airport_name : {type : String, required: true},
        country :{type: String, required: true},
        city: {type:String, required:true},
        IATA_code : {type: String, required: true, unique: true}
    }
);
//virtual
airportSchema.virtual('url').get(function(){
    return '/airports' + this._id;
});

const Airport = mongoose.model('Airport', airportSchema);
module.exports = Airport;